var Piece = function(){
	this.homePos = new Point()
	this.pos = new Point()
	this.num = 0
	this.pieceNum = 0
	this.color = undefined
	this.isActive = false
	this.condition = "offMouse"
}

Piece.prototype.set = function(n, c){
	this.homePos = new Point(900, 40+ 100*this.num)
	this.pos = this.homePos.add(P0)
	this.pieceNum = n
	this.color = c
	this.grid = new Array(n)
	for(var i=0; i<this.grid.length; i++){
		this.grid[i] = {}
		this.grid[i].pos = new Point()
		this.grid[i].point = new Point()
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

Piece.prototype.setPos = function(){
	for(var i=0; i<this.grid.length; i++){
		var p = this.pos
		this.grid[i].pos.x = p.x + (this.grid[i].point.x - this.grid[i].point.y)*gridLen/2
		this.grid[i].pos.y = p.y + (this.grid[i].point.y* sqrt(3) + 1.5/ sqrt(3))*gridLen/2
		if(this.grid[i].point.x%2==0){
			var xn = this.grid[i].point.x
			var yn = this.grid[i].point.y
			this.grid[i].apex1 = new Point(p.x+ (xn-yn)*gridLen/2, p.y+ yn/2* sqrt(3)* gridLen)
			this.grid[i].apex2 = new Point(p.x+ (xn-yn-1)*gridLen/2, p.y+ (yn+1)* sqrt(3)* gridLen/2)
			this.grid[i].apex3 = new Point(p.x+ (xn-yn+1)*gridLen/2, p.y+ (yn+1)* sqrt(3)* gridLen/2)
		}
		else{
			var xn = this.grid[i].point.x
			var yn = this.grid[i].point.y
			this.grid[i].apex1 = new Point(p.x+ (xn-yn)*gridLen/2, p.y+ (yn+1)* sqrt(3)* gridLen/2)
			this.grid[i].apex2 = new Point(p.x+ (xn-yn+1)*gridLen/2, p.y+ yn* sqrt(3)* gridLen/2)
			this.grid[i].apex3 = new Point(p.x+ (xn-yn-1)*gridLen/2, p.y+ yn* sqrt(3)* gridLen/2)
		}
		this.grid[i].pos.x = (this.grid[i].apex1.x + this.grid[i].apex2.x + this.grid[i].apex3.x)/ 3 
		this.grid[i].pos.y = (this.grid[i].apex1.y + this.grid[i].apex2.y + this.grid[i].apex3.y)/ 3 
		this.grid[i].apex1Rel = this.grid[i].apex1.sub(this.grid[i].pos)
		this.grid[i].apex2Rel = this.grid[i].apex2.sub(this.grid[i].pos)
		this.grid[i].apex3Rel = this.grid[i].apex3.sub(this.grid[i].pos)
	}
}

Piece.prototype.draw = function(){
	for(var i=0; i<this.grid.length; i++){
		s = 0.85
		ctx.beginPath()
		ctx.moveTo(this.grid[i].pos.x+ this.grid[i].apex1Rel.x*s, this.grid[i].pos.y+ this.grid[i].apex1Rel.y*s)
		ctx.lineTo(this.grid[i].pos.x+ this.grid[i].apex2Rel.x*s, this.grid[i].pos.y+ this.grid[i].apex2Rel.y*s)
		ctx.lineTo(this.grid[i].pos.x+ this.grid[i].apex3Rel.x*s, this.grid[i].pos.y+ this.grid[i].apex3Rel.y*s)
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
}

Piece.prototype.reverse = function(){
	console.log(11111, this.num)
	var activeGrid = this.grid[clickedGrid[1]]
	var activePoint = activeGrid.point
	for(var i=0; i<this.grid.length; i++){
		var point = this.grid[i].point.sub(activePoint)
		point = new Point(-point.x+ point.y*2, point.y)
		this.grid[i].point = point.add(activePoint)
	}
}

Piece.prototype.rotate = function(direction){
	var activeGrid = this.grid[clickedGrid[1]]
	var activePoint = activeGrid.point
	if(direction=="clockwise"){
		for(var i=0; i<this.grid.length; i++){
			var point = this.grid[i].point.sub(activePoint)
			if(activePoint.x%2==0) point = new Point(mod(point.x,2)- 2*point.y, Math.ceil(point.x/2)-point.y)
			else point = new Point(-mod(point.x,2)- 2*point.y, Math.floor(point.x/2)- point.y)
			this.grid[i].point = point.add(activePoint)
		}
	}
	else{
		for(var i=0; i<this.grid.length; i++){
			var point = this.grid[i].point.sub(activePoint)
			if(activePoint.x%2==0) point = new Point(-point.x+ 2*point.y, -Math.floor(point.x/2))
			else point = new Point(-point.x+ 2*point.y, -Math.ceil(point.x/2))
			this.grid[i].point = point.add(activePoint)
		}
	}
}

Piece.prototype.replaceGrid = function(){
	
}

Piece.prototype.checkActive = function(piece){
	if(true){
		for(var i=0; i<this.grid.length; i++){
			if(checkSide(mouse, this.grid[i].apex1, this.grid[i].apex2)=="left" &&
			   checkSide(mouse, this.grid[i].apex2, this.grid[i].apex3)=="left" &&
			   checkSide(mouse, this.grid[i].apex3, this.grid[i].apex1)=="left"){
				if(leftDown1==true){
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
