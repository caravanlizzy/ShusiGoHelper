function Manager(){
    this.numberOfPlayers = 4;
    this.players = [];
    this.playerInfo = ["You", "Player2", "Player3", "Player4"]
    this.boards = [[], [], [], []];
    this.activePlayer = 0;
    this.maxTurns = 8;
    this.maxRounds = 3;
    this.populate = 0;
    this.turn = 0;
    this.round = 0;

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
    this.graphic.init();
}

Manager.prototype.submitTurn = function(){
    
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
        this.players.push(new Player(i+1, text));
    }
}

Manager.prototype.getPlayerCount = function(){
    return this.numberOfPlayers;
}

Manager.prototype.getPlayer = function(index){
    return this.players[index];
}

Manager.prototype.addCard = function(card, boardIndex){
    let board = this.getBoard(boardIndex);
    board.push(card);
    this.graphic.drawCard(card, )

}

Manager.prototype.getActivePlayer = function(){
    return this.activePlayer;
}

Manager.prototype.setPopulation = function(){
    this.populate = this.maxTurns - this.turn;
}

Manager.prototype.getBoard = function(index){
    return this.boards[index];
}

Manager.prototype.setActivePlayer = function(playerIndex){
    this.activePlayer = this.players[playerIndex];
}











// Manager.prototype.