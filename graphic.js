function Graphic(){
    this.basicFrame = null;
    this.supplyFrame = null;
    this.infoFrame = null;
    this.tableau = null;
    this.supplyFrame = null;
    // this.self = this;
}

Graphic.prototype.crepandBox = function(className, parent){
    let div = document.createElement('div');
    div.classList.add(className);
    parent.appendChild(div); 
    return div;   
}

Graphic.prototype.createDiv = function(className){
    let newDiv = document.createElement('div');
    newDiv.className = className;
    return newDiv;
}

// Graphics



Graphic.prototype.init = function(){
    this.basicFrame = this.crepandBox('basicFrame', document.querySelector("body"));
    this.infoFrame = this.crepandBox('infoFrame', this.basicFrame);
    this.tableau = this.crepandBox('tableau', this.basicFrame);
    this.supplyFrame = this.crepandBox('supplyFrame', this.basicFrame);
    let playerNum = this.manager.getPlayerCount();
    for(let i = 0; i < playerNum ; i++){
        let player = this.manager.getPlayer(i);
        player.infoContainer = this.drawInfoBox(player.infoBoxText, this.infoFrame)
        player.cardDisplay = this.drawPlayerFrame(this.tableau);
        this.drawPlayerCards(player);
    }
    this.drawSupplyCards(this.manager.supplyCards);
}


// Graphic.prototype.createHolderCard = function(parent){
//         let holder = document.createElement('div');
//         holder.classList.add("holderCard");
//         parent.appendChild(holder);
// }


Graphic.prototype.drawPlayerFrame = function(parent){
    let playerFrame = document.createElement('div');
    playerFrame.classList.add("playerFrame");
    parent.appendChild(playerFrame);
    return playerFrame;
}



Graphic.prototype.drawInfoBox = function(content, parent){
    let infoBox = document.createElement('div');
    infoBox.classList.add("infoBox");
    infoBox.innerHTML = content;
    parent.appendChild(infoBox);
    return infoBox;
}

Graphic.prototype.drawSupplyCards = function(cardArray){
    for(let i = 0; i < cardArray.length; i++){
        let card = cardArray[i];
        let newDiv = this.crepandBox("supplyCard", this.supplyFrame);
        newDiv.style.backgroundColor = card.color;
        newDiv.innerHTML = card.text;
        newDiv.id = card.short;
        let manager = this.manager;
        newDiv.addEventListener('click', function(){
            manager.addHolderCard(this);
        });
    }
}


Graphic.prototype.drawPlayerCards = function(player){
    for(let i = 0; i < player.cards.length; i++){
        let newDiv = this.createDiv("card ");
        if(player.playerNum == 1){
            newDiv.className += " cardHolder";
        }
        player.cardDisplay.appendChild(newDiv);
        // this.crepandBox("card", player.cardDisplay);
    }
}

Graphic.prototype.editCard = function(card, divCard){
    divCard.style.backgroundColor = card.color;
    divCard.innerHTML = card.text;
    let manager = this.manager;
    divCard.onclick = function(){
        console.log(manager);
        manager.removeHolderCard(this);
    }
}

Graphic.prototype.resetHolderCard = function(divCard){
    divCard.style.backgroundColor =  "rgb(184, 184, 184)";
    divCard.innerHTML = "";
    let manager = this.manager;
    divCard.onclick = function(){
        return;
    }
}

Graphic.prototype.resetTableauClick = function(){
    
}

















