function Interface(){
    //this.clickState = 0; // 0 = noClick, 1 = element for player 1, 2 = element for player2...
    this.display = 0; // 0 = onsupply, 1 = on player 1 display...
}

Interface.prototype.clickCard = function(card){
    if(this.display == 0){
        let activePlayer = this.manager.getActivePlayer();
        this.display = activePlayer;
        this.manager.addCard(card);
    }
    else if(this.display != 0){
        this.manager.removeCard(this.display)
        this.display = 0;
    }
}

// Interface.prototype.changeClickState = function(state){
//     this.clickState = state;
// }

Interface.prototype.changeDisplay = function(display){
    this.display = display;
}