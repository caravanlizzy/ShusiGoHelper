function Manager(){
    this.numberOfPlayers = 4;
    this.players = [];
    this.supplyCards = [];
    this.colors = ["chartreuse", "blueviolet", "cornflowerblue",  "khaki",  "goldenrod", "gold", "crimson", "darkred", "saddlebrown", "darkseagreen", "navajowhite",  "darksalmon"];
    this.info = ["s", "t", "d", "1", "2", "3", "1", "2", "3", "c", "w", "p"];
    this.shorts = ["s", "t", "d", "n1", "n2", "n3", "m1", "m2", "m3", "c", "w", "p"];
    this.playerInfo = ["You", "P2", "P3", "P4"]
    this.boards = [[], [], [], []];
    this.takenCards = [[], [], [], []];
    this.activePlayers = 1;  
    this.maxTurns = 8;
    this.turn = 0;
    this.turnReqs = false;
	this.maxRounds = 3;
    this.round = 0;
    this.populationIndex = 0;
    this.populatePhase = true;
    this.freePosition = [];
    this.initScripts();
}



Manager.prototype.initCards = function(){
    this.createSupplyCards();
}

Manager.prototype.endPopulate = function(){
	this.populatePhase = false;
}

Manager.prototype.startPopulate = function(){
	this.populatePhase = true;
}

Manager.prototype.setActivePlayers = function(){
	this.activePlayers += 1;
}

Manager.prototype.increaseTurn = function(){
	this.turn += 1;
	if(this.turn < this.numberOfPlayers){
		this.startPopulate();	
        this.setActivePlayers();
	}
}

Manager.prototype.newTurn = function(){
    this.graphic.clear();
    this.graphic.resetBaseState();
    this.graphic.resetButton();
	this.increaseTurn();	
    this.swapBoard();
    this.drawBoards();
    this.resetPopulation();
    this.resetReqs();
}

Manager.prototype.resetReqs = function(){
    this.turnReqs = false;
}


Manager.prototype.next = function(){
	if(this.populatePhase == true){
        this.endPopulate();
        this.resetReqs();
        this.graphic.displayTurnInterface();
		return;	
	}
	else{
        if(this.allCardsTaken()){
            this.newTurn();	
        }
	}
}


Manager.prototype.drawBoards = function(){
	for(let i = 0; i < this.activePlayers; i++){
		let board = this.boards[i];
		for(let j = 0; j < board.length; j++){
			let card = board[j];
			let divCard = document.getElementById(i.toString()).childNodes[j];
			this.graphic.editCard(card, divCard);
		}
	}
}


Manager.prototype.nextRound = function(){
	this.round += 1;
    if(this.round == maxRounds){
        this.finishGame();
    }
	else{
		this.turn = 0;
		this.activePlayers = 1;
		this.boards = [[], [], [], []];
	}
}

Manager.prototype.finishGame = function(){
	alert("Game over, refresh for a new game.");	
}


Manager.prototype.createPlayers = function(){
    for(let i = 0; i < this.numberOfPlayers; i++){
        let text = this.playerInfo[i];
        let newPlayer = new Player(i, text);
        newPlayer.manager = this;
        newPlayer.init();
        this.players.push(newPlayer);   
    }
}


Manager.prototype.getPlayerCount = function(){
    return this.numberOfPlayers;
}

Manager.prototype.getPlayer = function(index){
    return this.players[index];
}


Manager.prototype.resetPopulation = function(){
    this.populationIndex = 0;
}

Manager.prototype.increasePopulationIndex = function(){
    this.populationIndex += 1;
}

Manager.prototype.decreasePopulationIndex = function(){
    this.populationIndex -= 1;  
}


Manager.prototype.checkFullPopulation = function(){
    if(this.populationIndex == this.maxTurns - this.turn){
        alert("Auslage ist voll.")
        return true;
    }
    else{
        return false;
    }
}

Manager.prototype.getBoard = function(index){
    return this.boards[index];
}


Manager.prototype.createSupplyCards = function(){
    for(let i = 0; i < this.colors.length; i++){
        let newCard = new Card(this.shorts[i], this.colors[i], this.info[i]);
        this.supplyCards.push(newCard);
    }
}

Manager.prototype.getMaxTurns = function(){
    return this.maxTurns;
}

Manager.prototype.populateHolderCard = function(card){
    if(this.checkFullPopulation() == false && this.turn < this.numberOfPlayers){
        let position = this.populationIndex;
        if(this.freePosition.length > 0){
            position = this.freePosition[0];
        }
		let holderDiv = document.querySelectorAll(".tableau")[0].childNodes[0].childNodes[position];
		this.increasePopulationIndex();
		let clickedCard = this.getSupplyCardById(card.id);
		holderDiv.index = position;
        holderDiv.short = clickedCard.short;
		this.boards[0].push(clickedCard);
		this.graphic.editCard(clickedCard, holderDiv);
        this.freePosition.splice(0,1);
        this.updateInterface();
    }
}

Manager.prototype.updateInterface = function(){
    this.checkStateReqs();
    this.drawStateInterface();
}

Manager.prototype.findCardIndexByShort = function(short, boardNum){
    let board = this.boards[boardNum];
    for(let i = 0; i < board.length; i++){
        if(board[i].short == short){
            return i;
        }
    }
}



Manager.prototype.removeCardFromBoard = function(card){
    let boardNum = card.parentNode.id.toString();
    let cardIndex = this.findCardIndexByShort(card.short, boardNum);
	let takenCard = this.boards[boardNum].splice(cardIndex, 1);
	let supplyCard = this.getSupplyCardByShort(card.short);
    this.graphic.drawPlayerBoxCard(boardNum, supplyCard);
    this.storeTakenCard(boardNum, takenCard);    
}

Manager.prototype.storeTakenCard = function(boardNum, card){
    this.takenCards[boardNum] = card;
}

Manager.prototype.drawStateInterface = function(){
    if(this.turnReqs){
        this.graphic.displayFinalizeButton();
    }
    else{
        if(this.populatePhase){
            this.graphic.resetBaseState();
        }
        else{
            this.graphic.displayTurnInterface();
        }
    }
}


Manager.prototype.getHolderCount = function(){
    return this.board[0].length;
}

Manager.prototype.getSupplyCardByShort = function(short){
    for(let i = 0; i < this.supplyCards.length; i++){
        if(this.supplyCards[i].short == short.toString()){
            return this.supplyCards[i];
        }
    }
}

Manager.prototype.getSupplyCardById = function(id){
    for(let i = 0; i < this.supplyCards.length; i++){
        if(this.supplyCards[i].short == id.toString()){
            return this.supplyCards[i];
        }
    }
}

Manager.prototype.moveCard = function(divCard){
    this.updateInterface();
    if(this.populatePhase){
		this.removePopulateCard(divCard);
    }
	else{
		this.removeCardFromBoard(divCard);
	}
    this.graphic.resetHolderCard(divCard);
    this.updateInterface();
    
}

Manager.prototype.removePopulateCard = function(card){
	this.freePosition.push(card.index);
	this.decreasePopulationIndex();
	this.boards[0].splice(card.index, 1);
}

Manager.prototype.checkStateReqs = function(){
    if(this.populatePhase){
        if(this.boards[0].length == this.maxTurns - this.turn){
            this.turnReqs = true;
        }
    }
    else{
        if(this.allCardsTaken()){
            this.turnReqs = true;
        }
    }
}

Manager.prototype.allCardsTaken = function(){
    console.log(this.takenCards);
    let i = 3
    if(this.turn < 3){
        i = this.turn;
    }
    for(let j = 0; j < i; j++){
        // console.log(this.takenCards[i].length)
        if(this.takenCards[i].length == 0){
            return false;
        }
    }
    return true;
}


Manager.prototype.swapBoard = function(){
    let newBoard = [[], [], [], []];
    for(let i = 0; i < newBoard.length; i++){
        newBoard[i] = this.boards[(i+newBoard.length-1)%newBoard.length];
    }
    this.boards = newBoard;
}


Manager.prototype.initScripts = function(){
    this.createPlayers();
    this.graphic = new Graphic();
    this.graphic.manager = this;
    this.initCards();
    this.graphic.init();
}
















// Manager.prototype.
