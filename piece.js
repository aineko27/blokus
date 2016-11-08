var Piece = function(){
	this.homePos = new Point()
	this.pos = new Point()
	this.num = 0
	this.basePoint = new Point()
	this.pieceNum = 0
	this.color = undefined
	this.isAlive = true
	this.isActive = false
	this.condition = "offMouse"
	this.onMouseGrid = 0
}

Piece.prototype.set = function(c, pbp, psp, pap){
	this.homePos = new Point(1260, 80)
	this.pos = this.homePos.add(P0)
	this.pieceNum = psp.length
	this.color = c
	this.basePoint = pbp.add(P0)
	this.grid = new Array(psp.length)
	for(var i=0; i<this.grid.length; i++){
		this.grid[i] = {}
		this.grid[i].pos = new Point()
		this.grid[i].point = this.basePoint.add(psp[i])
		this.grid[i].apex = new Array(3)
		this.grid[i].apexRel = new Array(3)
	}
	this.apex = new Array(pap.length)
	for(var i=0; i<this.apex.length; i++){
		this.apex[i] = pap[i]
	}
}

Piece.prototype.initialize = function(){
	this.condition = "offMouse"
	for(var i=0; i<this.grid.length; i++){
		if(this.grid[i].condition!="clicked"){
			this.grid[i].condition = "offMouse";
		}
	}
}

Piece.prototype.setPos = function(pieceBoard){
	for(var i=0; i<this.grid.length; i++){
		var p = this.pos
		this.grid[i].pos.x = p.x + (this.grid[i].point.x - this.grid[i].point.y)*gridLen/2
		this.grid[i].pos.y = p.y + (this.grid[i].point.y* sqrt(3) + 1.5/ sqrt(3))*gridLen/2
		pieceBoard.grid[axisToNum(this.grid[i].point)].condition = this.num
		if(mod(this.grid[i].point.x,2)==0){
			var xn = this.grid[i].point.x
			var yn = this.grid[i].point.y
			this.grid[i].apex[0] = new Point(p.x+ (xn-yn)*gridLen/2, p.y+ yn/2* sqrt(3)* gridLen)
			this.grid[i].apex[1] = new Point(p.x+ (xn-yn-1)*gridLen/2, p.y+ (yn+1)* sqrt(3)* gridLen/2)
			this.grid[i].apex[2] = new Point(p.x+ (xn-yn+1)*gridLen/2, p.y+ (yn+1)* sqrt(3)* gridLen/2)
		}
		else{
			var xn = this.grid[i].point.x
			var yn = this.grid[i].point.y
			this.grid[i].apex[0] = new Point(p.x+ (xn-yn)*gridLen/2, p.y+ (yn+1)* sqrt(3)* gridLen/2)
			this.grid[i].apex[1] = new Point(p.x+ (xn-yn+1)*gridLen/2, p.y+ yn* sqrt(3)* gridLen/2)
			this.grid[i].apex[2] = new Point(p.x+ (xn-yn-1)*gridLen/2, p.y+ yn* sqrt(3)* gridLen/2)
		}
		this.grid[i].pos.x = (this.grid[i].apex[0].x + this.grid[i].apex[1].x + this.grid[i].apex[2].x)/ 3 
		this.grid[i].pos.y = (this.grid[i].apex[0].y + this.grid[i].apex[1].y + this.grid[i].apex[2].y)/ 3 
		this.grid[i].apexRel[0] = this.grid[i].apex[0].sub(this.grid[i].pos)
		this.grid[i].apexRel[1] = this.grid[i].apex[1].sub(this.grid[i].pos)
		this.grid[i].apexRel[2] = this.grid[i].apex[2].sub(this.grid[i].pos)
	}
}

Piece.prototype.draw = function(){
	var s = 0.85
	for(var i=0; i<this.grid.length; i++){
		var p = this.grid[i].pos
		ctx.beginPath()
		ctx.moveTo(p.x+ this.grid[i].apexRel[0].x*s, p.y+ this.grid[i].apexRel[0].y*s)
		ctx.lineTo(p.x+ this.grid[i].apexRel[1].x*s, p.y+ this.grid[i].apexRel[1].y*s)
		ctx.lineTo(p.x+ this.grid[i].apexRel[2].x*s, p.y+ this.grid[i].apexRel[2].y*s)
		ctx.closePath()
		if(this.grid[i].condition=="clicked"){
			ctx.fillStyle = color["d_"+this.color]
			
		}
		else if(this.grid[i].condition=="onMouse"){
			ctx.fillStyle = color[this.color]
		}
		else{
			ctx.fillStyle = color["l_"+this.color]
		}
		ctx.fill()
		
	}
	s = 1
	ctx.beginPath()
	var m = this.apex[0][0]
	var n = this.apex[0][1]
	ctx.moveTo(this.grid[m].pos.x+ this.grid[m].apexRel[n].x*s, this.grid[m].pos.y+ this.grid[m].apexRel[n].y*s)
	for(var i=0; i<this.apex.length;i++){
		m = this.apex[i][0]
		n = this.apex[i][1]
		ctx.lineTo(this.grid[m].pos.x+ this.grid[m].apexRel[n].x*s, this.grid[m].pos.y+ this.grid[m].apexRel[n].y*s)
	}
	ctx.closePath()
	ctx.strokeStyle = "black"
	ctx.lineWidth = 1
	ctx.stroke()
}

Piece.prototype.reverse = function(pieceBoard){
	var activeGrid = this.grid[clickedGrid[1]]
	var activePoint = activeGrid.point
	for(var i=0; i<this.grid.length; i++){
		var point = this.grid[i].point.sub(activePoint)
		point = new Point(-point.x+ point.y*2, point.y)
		point = activePoint.add(point)
		if(checkPointExist(point, pieceBoard)==false){
			return
		}
		if(pieceBoard.grid[axisToNum(point, pieceBoard)].condition!=this.num && pieceBoard.grid[axisToNum(point, pieceBoard)].condition!="offPiece"){
			return
		}
	}
	for(var i=0; i<this.grid.length; i++){
		var point = this.grid[i].point.sub(activePoint)
		point = new Point(-point.x+ point.y*2, point.y)
		this.grid[i].point = point.add(activePoint)
	}
	for(var i=0; i<this.apex.length; i++){
		if(this.apex[i][1]==1) this.apex[i][1] = 2
		else if(this.apex[i][1]==2) this.apex[i][1] = 1
	}
}

Piece.prototype.reverse2 = function(pieceBoard){
	var activeGrid = this.grid[clickedGrid[1]]
	var activePoint = activeGrid.point
	for(var i=0; i<this.grid.length; i++){
		var point = this.grid[i].point.sub(activePoint)
		if(mod(activePoint.x,2)==0) point = new Point(point.x+ 1- point.y*2, -point.y*1+1)
		else point = new Point(point.x- 1- point.y*2, -point.y*1-1)
		point = activePoint.add(point)
		if(checkPointExist(point, pieceBoard)==false){
			return
		}
		if(pieceBoard.grid[axisToNum(point, pieceBoard)].condition!=this.num && pieceBoard.grid[axisToNum(point, pieceBoard)].condition!="offPiece"){
			return
		}
	}
	for(var i=0; i<this.grid.length; i++){
		var point = this.grid[i].point.sub(activePoint)
		if(mod(activePoint.x,2)==0) point = new Point(point.x+ 1- point.y*2, -point.y*1+1)
		else point = new Point(point.x- 1- point.y*2, -point.y*1-1)
		this.grid[i].point = point.add(activePoint)
	}
	for(var i=0; i<this.apex.length; i++){
		if(this.apex[i][1]==1) this.apex[i][1] = 2
		else if(this.apex[i][1]==2) this.apex[i][1] = 1
	}
}

Piece.prototype.rotate = function(pieceBoard, direction){
	var activeGrid = this.grid[clickedGrid[1]]
	var activePoint = activeGrid.point
	if(direction=="clockwise"){
		for(var i=0; i<this.grid.length; i++){
			var point = this.grid[i].point.sub(activePoint)
			if(mod(activePoint.x,2)==0) point = new Point(mod(point.x,2)- 2*point.y, Math.ceil(point.x/2)-point.y)
			else point = new Point(-mod(point.x,2)- 2*point.y, Math.floor(point.x/2)- point.y)
			point = activePoint.add(point)
			if(checkPointExist(point, pieceBoard)==false){
				return
			}
			if(pieceBoard.grid[axisToNum(point, pieceBoard)].condition!=this.num && pieceBoard.grid[axisToNum(point, pieceBoard)].condition!="offPiece"){
				return
			}
		}
		for(var i=0; i<this.grid.length; i++){
			var point = this.grid[i].point.sub(activePoint)
			if(mod(activePoint.x,2)==0) point = new Point(mod(point.x,2)- 2*point.y, Math.ceil(point.x/2)-point.y)
			else point = new Point(-mod(point.x,2)- 2*point.y, Math.floor(point.x/2)- point.y)
			this.grid[i].point = point.add(activePoint)
		}
		for(var i=0; i<this.apex.length; i++){
			if(this.apex[i][1]==0) this.apex[i][1] = 2
			else if(this.apex[i][1]==1) this.apex[i][1] = 0
			else this.apex[i][1] = 1
		}
	}
	else{
		for(var i=0; i<this.grid.length; i++){
			var point = this.grid[i].point.sub(activePoint)
			if(mod(activePoint.x,2)==0) point = new Point(-point.x+ 2*point.y, -Math.floor(point.x/2))
			else point = new Point(-point.x+ 2*point.y, -Math.ceil(point.x/2))
			point = activePoint.add(point)
			if(checkPointExist(point, pieceBoard)==false){
				return
			}
			if(pieceBoard.grid[axisToNum(point, pieceBoard)].condition!=this.num && pieceBoard.grid[axisToNum(point, pieceBoard)].condition!="offPiece"){
				return
			}
		}
		for(var i=0; i<this.grid.length; i++){
			var point = this.grid[i].point.sub(activePoint)
			if(mod(activePoint.x,2)==0) point = new Point(-point.x+ 2*point.y, -Math.floor(point.x/2))
			else point = new Point(-point.x+ 2*point.y, -Math.ceil(point.x/2))
			this.grid[i].point = point.add(activePoint)
		}
		for(var i=0; i<this.apex.length; i++){
			if(this.apex[i][1]==0) this.apex[i][1] = 1
			else if(this.apex[i][1]==1) this.apex[i][1] = 2
			else this.apex[i][1] = 0
		}
	}
}

// Piece.prototype.rotate = function(direction){
	// var activeGrid = this.grid[clickedGrid[1]]
	// var activePoint = activeGrid.point
	// if(direction=="clockwise"){
		// for(var i=0; i<this.grid.length; i++){
			// var point = this.grid[i].point.sub(activePoint)
			// if(mod(activePoint.x,2)==0) point = new Point(point.x+ 1- point.y*2, Math.floor(point.x/2)+ 1)
			// else point = new Point(point.x-1, point.y+ Math.ceil(point.x/2))
			// this.grid[i].point = point.add(activePoint)
		// }
	// }
	// else{
		// for(var i=0; i<this.grid.length; i++){
			// var point = this.grid[i].point.sub(activePoint)
			// if(mod(activePoint.x,2)==0) point = new Point(-point.x+ 2*point.y, -Math.floor(point.x/2))
			// else point = new Point(-point.x+ 2*point.y, -Math.ceil(point.x/2))
			// this.grid[i].point = point.add(activePoint)
		// }
	// }
// }

Piece.prototype.replaceGrid = function(){
	
}

Piece.prototype.checkActive = function(piece){
	if(true){
		for(var i=0; i<this.grid.length; i++){
			if(checkSide(mouse, this.grid[i].apex[0], this.grid[i].apex[1])=="left" &&
			   checkSide(mouse, this.grid[i].apex[1], this.grid[i].apex[2])=="left" &&
			   checkSide(mouse, this.grid[i].apex[2], this.grid[i].apex[0])=="left"){
				if(leftDown1==true){
					console.log(clickedGrid[0], clickedGrid[1])
					piece[clickedGrid[0]].grid[clickedGrid[1]].condition = "offMouse"
					this.grid[i].condition = "clicked"
					this.condition = "clicked"
					clickedGrid[0] = this.num
					clickedGrid[1] = i
					clickedGrid[2] = true
				}
				else if(this.grid[i].condition!="clicked"){
					this.grid[i].condition = "onMouse"
					this.condition = "onMouse"
				}
				break
			}
		}
	}
}
