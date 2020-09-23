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

Graphic.prototype.drawPlayerBoxCard = function(player, card){
	let playerBox = document.querySelector(".infoFrame").childNodes[player];
	playerBox.style.backgroundColor = card.color;
	playerBox.innerHTML = card.text;
}



Graphic.prototype.init = function(){
    this.basicFrame = this.crepandBox('basicFrame', document.querySelector("body"));
    this.infoFrame = this.crepandBox('infoFrame', this.basicFrame);
    this.tableau = this.crepandBox('tableau', this.basicFrame);
    this.supplyFrame = this.crepandBox('supplyFrame', this.basicFrame);
    let playerNum = this.manager.getPlayerCount();
    for(let i = 0; i < playerNum ; i++){
        let player = this.manager.getPlayer(i);
        player.infoContainer = this.drawInfoBox(player.infoBoxText, this.infoFrame)
        player.cardDisplay = this.drawPlayerFrame(this.tableau, player.playerNum);
        this.drawPlayerCards(player);
    }
    this.drawSupplyCards(this.manager.supplyCards);
	this.createButton();
}


Graphic.prototype.drawPlayerFrame = function(parent, id){
    let playerFrame = document.createElement('div');
    playerFrame.classList.add("playerFrame");
	playerFrame.id = id;
    parent.appendChild(playerFrame);
    return playerFrame;
}

Graphic.prototype.createButton = function(){
	this.button = this.crepandBox("button", this.basicFrame);
	let manager = this.manager;
	this.button.innerHTML = "Next";
	this.button.onclick = function(){
		manager.next();
	}
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
            manager.populateHolderCard(this);
        });
    }
}


Graphic.prototype.drawPlayerCards = function(player){
    for(let i = 0; i < player.cards.length; i++){
        let newDiv = this.createDiv("card ");
        if(player.playerNum == 0){
            newDiv.className += " cardHolder";
        }
        player.cardDisplay.appendChild(newDiv);
    }
}

Graphic.prototype.editCard = function(card, divCard){
    divCard.style.backgroundColor = card.color;
    divCard.innerHTML = card.text;
    let manager = this.manager;
    divCard.onclick = function(){
        manager.moveCard(this);
    }
}



Graphic.prototype.resetHolderCard = function(divCard){
    divCard.style.backgroundColor =  "rgb(184, 184, 184)";
    divCard.innerHTML = "";
    // divCard.index = "";
    // let manager = this.manager;
    divCard.onclick = function(){
        return;
    }
}

Graphic.prototype.resetBlancCard = function(divCard){
    divCard.style.backgroundColor =  "white";
    divCard.innerHTML = "";
    divCard.onclick = function(){
        return;
    }
}

Graphic.prototype.resetPlayerBoxCard = function(player){
	let playerBox = document.querySelector(".infoFrame").childNodes[player];
	playerBox.style.backgroundColor = "white";
	playerBox.innerHTML = "";
}

Graphic.prototype.clear = function(){
	for(let i = 0; i < this.manager.numberOfPlayers; i++){
		let player = i.toString();
		let playerBoard = document.getElementById(player);
		for(let j = 0; j < this.manager.maxTurns; j++){
			let card = playerBoard.childNodes[j];
			if(i == 0){
				this.resetHolderCard(card);
				this.resetPlayerBoxCard(player);
			}
			else{
				this.resetBlancCard(card);
				this.resetPlayerBoxCard(player);
			}
		}		
	}	
}

















