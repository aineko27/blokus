var PushButton = function(){
	this.pos = new Point()
	this.width = 0
	this.height = 0
	this.apex = new Array(4)
	for(var i=0; i<this.apex.length; i++){
		this.apex[i] = {}
		this.apex[i].pos = new Point()
	}
	this.condition = "offMouse"
}

PushButton.prototype.set = function(p, width, height){
	this.pos = p.add(P0)
	this.width = width
	this.height = height
	this.apex[0].pos = this.pos
	this.apex[1].pos = this.pos.add(new Point(width, 0))
	this.apex[2].pos = this.pos.add(new Point(width, height))
	this.apex[3].pos = this.pos.add(new Point(0, height))
	this.centerPos = this.apex[0].pos.add(this.apex[2].pos).mul(1/2)
}

PushButton.prototype.checkActive = function(piece){
	var checkCount = 0
	for(var i=0; i<this.apex.length; i++){
		test[2] = checkSide(mouse, this.apex[i].pos, this.apex[(i+1)%this.apex.length].pos)
		if(checkSide(mouse, this.apex[i].pos, this.apex[(i+1)%this.apex.length].pos)=="right"){
			checkCount++
		}
		else{
			break
		}
	}
	if(checkCount==this.apex.length && clickedGrid[2]){
		if(leftDown1 && !leftDown2){
			if(this.num==0){
				piece.reverse()
				piece.setPos()
			}
			if(this.num==1){
				piece.rotate("clockwise")
				piece.setPos()
			}
			if(this.num==2){
				piece.rotate("counterclockwise")
				piece.setPos()
			}
		}
	}
}

PushButton.prototype.draw = function(){
	ctx.beginPath()
	ctx.moveTo(this.apex[0].pos.x, this.apex[0].pos.y)
	for(var i=0; i<this.apex.length; i++){
		ctx.lineTo(this.apex[i].pos.x, this.apex[i].pos.y)
	}
	ctx.closePath()
	ctx.fillStyle = "gray"
	ctx.fill()
	var chara
	if(this.num==0) chara = "reverse"
	else if(this.num==1) chara ="clock"
	else chara = "counter"
	ctx.textAlign = "center"
	ctx.fillStyle = "black"
	ctx.fillText(chara, this.centerPos.x, this.centerPos.y+10)
	console.log(this.centerPos)
}









