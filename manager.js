function Manager(){
    this.numberOfPlayers = 4;
    this.players = [];
    this.supplyCards = [];
    this.colors = ["chartreuse", "blueviolet", "cornflowerblue",  "khaki",  "goldenrod", "gold", "crimson", "darkred", "saddlebrown", "darkseagreen", "navajowhite",  "darksalmon"];
    this.info = ["s", "t", "d", "1", "2", "3", "1", "2", "3", "c", "w", "p"];
    this.shorts = ["s", "t", "d", "n1", "n2", "n3", "m1", "m2", "m3", "c", "w", "p"];
    this.playerInfo = ["You", "Player2", "Player3", "Player4"]
    this.boards = [[], [], [], []];
    this.activePlayer = 0;
    this.maxTurns = 8;
    this.populationIndex = 0;
    this.populatePhase = true;
    this.turn = 0;
    this.round = 0;
    this.freePosition = [];

    this.initScripts();

}

Manager.prototype.initScripts = function(){
    this.createPlayers();
    this.graphic = new Graphic();
    this.interface = new Interface();
    this.interface.manager = this;
    this.graphic.manager = this;
    this.graphic.interface = this.interface;
    this.interface.graphic = this.graphic;
    this.initCards();
    this.graphic.init();
}

Manager.prototype.initCards = function(){
    this.createSupplyCards();
}

Manager.prototype.submitSelection = function(){
    this.graphic.resetTableauClick();
}

Manager.prototype.submitTurn = function(){
    this.switchBoard();
    this.graphic.clearTableau();
    this.graphic.drawBoards();
}

Manager.prototype.nextRound = function(){
    if(this.round == maxRounds){
        this.finishGame();
    }
}

Manager.prototype.nextTurn = function(){
    if(this.turn == 8){
        this.startNewRound();
    }
    this.turn += 1;
}

Manager.prototype.createPlayers = function(){
    for(let i = 0; i < this.numberOfPlayers; i++){
        let text = this.playerInfo[i];
        let newPlayer = new Player(i+1, text);
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


Manager.prototype.getActivePlayer = function(){
    return this.activePlayer;
}

Manager.prototype.resetPopulation = function(){
    this.populationIndex = 0;
}

Manager.prototype.increasePopulationIndex = function(){
    this.populationIndex += 1;

    Manager.prototype.decreasePopulationIndex = function(){
        this.populationIndex -= 1;  
    }
}

Manager.prototype.checkFullPopulation = function(){
    if(this.populationIndex == this.maxTurns){
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

Manager.prototype.setActivePlayer = function(playerIndex){
    this.activePlayer = this.players[playerIndex];
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

Manager.prototype.addHolderCard = function(card){
    if(this.checkFullPopulation() == false && this.turn < this.numberOfPlayers){
        let position = this.populationIndex;
        if(this.freePosition.length > 0){
            position = this.freePosition[0];
        }
    let holderDiv = document.querySelectorAll(".tableau")[0].childNodes[0].childNodes[position];
    holderDiv.index = this.populationIndex;
    this.increasePopulationIndex();
    let clickedCard = this.getCardById(card.id);
    this.boards[0].push(clickedCard);
    this.graphic.editCard(clickedCard, holderDiv);
    this.freePosition.splice(0,1);
    }
    else{alert("Alle Karten sind erkannt.")}
}


Manager.prototype.getHolderCount = function(){
    return this.board[0].length;
}

Manager.prototype.getCardById = function(id){
    for(let i = 0; i < this.supplyCards.length; i++){
        if(this.supplyCards[i].short == id.toString()){
            return this.supplyCards[i];
        }
    }
}

Manager.prototype.removeHolderCard = function(divCard){
    this.graphic.resetHolderCard(divCard);
    this.decreasePopulationIndex();
    this.freePosition.push(divCard.index);
    this.boards[0].splice(divCard.index, 1);
}

Manager.prototype.switchBoard = function(){
    let newBoard = [[], [], [], []];
    for(let i = 0; i < newBoard.length; i++){
        newBoard[i] = this.boards[(i+newBoard.length-1)%newBoard.length];
    }
    this.board = newBoard;
}

















// Manager.prototype.