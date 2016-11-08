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

PushButton.prototype.checkActive = function(piece, pieceBoard){
	var checkCount = 0
	for(var i=0; i<this.apex.length; i++){
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
				piece.reverse(pieceBoard)
				piece.setPos(pieceBoard)
			}
			else if(this.num==1){
				piece.reverse2(pieceBoard)
				piece.setPos(pieceBoard)
			}
			else if(this.num==2){
				piece.rotate(pieceBoard, "counterclockwise")
				piece.setPos(pieceBoard)
			}
			else if(this.num==3){
				piece.rotate(pieceBoard, "clockwise")
				piece.setPos(pieceBoard)
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
	var c = this.centerPos
	var wid = this.width
	var hei = this.height
	if(this.num==0){
		var w1 = 0.15, w2 = 0.42, h1 = 0.20, h2 = 0.4
		ctx.beginPath()
		ctx.moveTo(c.x- wid*w2, c.y)
		ctx.lineTo(c.x- wid*w1, c.y+ hei*h2)
		ctx.lineTo(c.x- wid*w1, c.y+ hei*h1)
		ctx.lineTo(c.x+ wid*w1, c.y+ hei*h1)
		ctx.lineTo(c.x+ wid*w1, c.y+ hei*h2)
		ctx.lineTo(c.x+ wid*w2, c.y)
		ctx.lineTo(c.x+ wid*w1, c.y- hei*h2)
		ctx.lineTo(c.x+ wid*w1, c.y- hei*h1)
		ctx.lineTo(c.x- wid*w1, c.y- hei*h1)
		ctx.lineTo(c.x- wid*w1, c.y- hei*h2)
		ctx.closePath()
		ctx.fillStyle = "white"
		ctx.fill()
	}
	else if(this.num==1){
		var w1 = 0.20, w2 = 0.42, h1 = 0.20, h2 = 0.45
		ctx.beginPath()
		ctx.moveTo(c.x, c.y- hei*h2)
		ctx.lineTo(c.x+ wid*w2, c.y- hei*h1)
		ctx.lineTo(c.x+ wid*w1, c.y- hei*h1)
		ctx.lineTo(c.x+ wid*w1, c.y+ hei*h1)
		ctx.lineTo(c.x+ wid*w2, c.y+ hei*h1)
		ctx.lineTo(c.x, c.y+ hei*h2)
		ctx.lineTo(c.x- wid*w2, c.y+ hei*h1)
		ctx.lineTo(c.x- wid*w1, c.y+ hei*h1)
		ctx.lineTo(c.x- wid*w1, c.y- hei*h1)
		ctx.lineTo(c.x- wid*w2, c.y- hei*h1)
		ctx.closePath()
		ctx.fillStyle = "white"
		ctx.fill()
	}
	else if(this.num==2){
		var len = Math.min(wid, hei)
		ctx.beginPath()
		ctx.arc(c.x, c.y-len*0.05, len*0.40, PI*0.15, PI_2, true)
		ctx.lineTo(c.x, c.y+ len*0.55-len*0.05)
		ctx.lineTo(c.x+ len*0.3, c.y+ len*0.300-len*0.05)
		ctx.lineTo(c.x, c.y+ len*0.1-len*0.05)
		ctx.lineTo(c.x, c.y+ len*0.25-len*0.05)
		ctx.arc(c.x, c.y-len*0.05, len*0.25, PI_2, PI*0.15, false)
		ctx.closePath()
		ctx.fillStyle = "white"
		ctx.fill()
	}
	else if(this.num==3){
		var len = Math.min(wid, hei)
		ctx.beginPath()
		ctx.arc(c.x, c.y-len*0.05, len*0.40, PI*0.85, PI_2, false)
		ctx.lineTo(c.x, c.y+ len*0.55-len*0.05)
		ctx.lineTo(c.x- len*0.3, c.y+ len*0.300-len*0.05)
		ctx.lineTo(c.x, c.y+ len*0.1-len*0.05)
		ctx.lineTo(c.x, c.y+ len*0.25-len*0.05)
		ctx.arc(c.x, c.y-len*0.05, len*0.25, PI_2, PI*0.85, true)
		ctx.closePath()
		ctx.fillStyle = "white"
		ctx.fill()
	}
}









