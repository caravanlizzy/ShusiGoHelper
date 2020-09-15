function Player(playerNum, text){
    this.tableau = [];
    this.name = "";
    this.infoBoxText = text;
    this.infoContainer = null;
    this.cardDisplay = null;
    this.playerNum = playerNum;
    this.cards = []; 
}

Player.prototype.createBlancoCard = function(){
    let newCard = new Card("none", "red", "");
    return newCard;
}

Player.prototype.init = function(){
    this.createBlancoDeck();
}

Player.prototype.createBlancoDeck = function(){
    for(let i = 0; i < this.manager.getMaxTurns(); i++){
        let newCard = this.createBlancoCard();
        this.cards.push(newCard);
    }    

}

