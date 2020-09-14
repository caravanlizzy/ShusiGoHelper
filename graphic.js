function Graphic(){
    this.colors = ["chartreuse", "blueviolet", "cornflowerblue",  "khaki",  "goldenrod", "gold", "crimson", "darkred", "saddlebrown", "darkseagreen", "navajowhite",  "darksalmon"];
    this.info = ["s", "t", "d", "1", "2", "3", "1", "2", "3", "c", "w", "p"];
    this.infoText = ["You", "P2", "P3", "P4"];
    this.maxHand = 8;
    this.playerFrames = [];
    this.init();
}

Graphic.prototype.crepandBox = function(className, parent){
    let div = document.createElement('div');
    div.classList.add(className);
    parent.appendChild(div); 
    return div;   
}

// Graphics



Graphic.prototype.init = function(){
    let basicFrame = this.crepandBox('basicFrame', document.querySelector("body"));
    let infoFrame = this.crepandBox('infoFrame', basicFrame);
    let tableau = this.crepandBox('tableau', basicFrame);
    let supplyFrame = this.crepandBox('supplyFrame', basicFrame);
    for(let i = 0; i < this.infoText.length ; i++){
        this.createInfoBox(this.infoText[i], infoFrame)
        this.playerFrames[i] = this.createPlayerFrame(tableau);
    }
    // console.log(tableau);
    this.createSupplyCards(supplyFrame);
    this.createHolderCards(this.playerFrames[0]);


}

Graphic.prototype.createSupplyCards = function(parent){
    for(let i = 0; i < this.colors.length; i++){
        let newBox = this.crepandBox("supplyCard", parent);
        newBox.style.backgroundColor = this.colors[i];
        newBox.innerHTML = this.info[i];
    }
}

Graphic.prototype.createHolderCards = function(parent){
    for(let i = 0; i < 8; i++){
        let holder = document.createElement('div');
        holder.classList.add("holderCard");
        parent.appendChild(holder);
    }
}

Graphic. prototype.createPlayerFrame = function(parent){
    let playerFrame = document.createElement('div');
    playerFrame.classList.add("playerFrame");
    parent.appendChild(playerFrame);
    return playerFrame;
}



Graphic.prototype.createInfoBox = function(content, parent){
    let infoBox = document.createElement('div');
    infoBox.classList.add("infoBox");
    infoBox.innerHTML = content;
    parent.appendChild(infoBox);
}















