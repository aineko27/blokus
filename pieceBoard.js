var PieceBoard = function(){
	this.originPos = new Point(1260, 80)
	this.width = 11*gridLen
	this.height = 8.5*gridLen*sqrt(3)
	this.activeGrid = 0
	this.apex = new Array(4)
	for(var i=0; i<this.apex.length; i++){
		this.apex[i] = {}
		this.apex[i].pos = new Point()
	}
	this.apex[0].pos = this.originPos.add(new Point(-gridLen/2,0))
	this.apex[1].pos = this.originPos.add(new Point(this.width+gridLen/2, 0))
	this.apex[2].pos = this.originPos.add(new Point(this.width+gridLen/2, this.height))
	this.apex[3].pos = this.originPos.add(new Point(-gridLen/2, this.height))
	var num = 9
	this.grid = new Array(num* num*8)
	for(var i=0; i<this.grid.length; i++){
		this.grid[i] = {}
		this.grid[i].color = "gray"
		this.grid[i].num = i
		this.grid[i].condition = "offPiece"
		this.grid[i].xNum = i% (4*num)
		this.grid[i].yNum = Math.floor(i/(4*num))
		this.grid[i].point = new Point(this.grid[i].xNum, this.grid[i].yNum)
		this.grid[i].pos = new Point()
		var px = this.originPos.x + (this.grid[i].xNum - this.grid[i].yNum)*gridLen/2
		var py = this.originPos.y +this.grid[i].yNum* sqrt(3)* gridLen/2
		this.grid[i].apex = new Array(3)
		this.grid[i].apexRel = new Array(3)
		if(mod(this.grid[i].xNum,2)==0){
			this.grid[i].apex[0] = new Point(px, py)
			this.grid[i].apex[1] = new Point(px- gridLen/2, py+ sqrt(3)* gridLen/2)
			this.grid[i].apex[2] = new Point(px+ gridLen/2, py+ sqrt(3)* gridLen/2)
		}
		else{
			this.grid[i].apex[0] = new Point(px, py + sqrt(3)*gridLen/2)
			this.grid[i].apex[1] = new Point(px+ gridLen/2, py)
			this.grid[i].apex[2] = new Point(px- gridLen/2, py)
		}
		this.grid[i].pos.x = px
		this.grid[i].pos.y = (this.grid[i].apex[0].y + this.grid[i].apex[1].y + this.grid[i].apex[2].y)/ 3 
		this.grid[i].apexRel[0] = this.grid[i].apex[0].sub(this.grid[i].pos)
		this.grid[i].apexRel[1] = this.grid[i].apex[1].sub(this.grid[i].pos)
		this.grid[i].apexRel[2] = this.grid[i].apex[2].sub(this.grid[i].pos)
		
		if(this.grid[i].xNum- this.grid[i].yNum < 0 || 
		   this.grid[i].xNum- this.grid[i].yNum > 22 ||
		   this.grid[i].yNum > 16){
			this.grid[i].isAlive = false
		   }
		else{
			this.grid[i].isAlive = true
		}
	}
}

PieceBoard.prototype.draw = function(){
	ctx.beginPath()
	ctx.moveTo(this.apex[0].pos.x, this.apex[0].pos.y)
	for(var i=0; i<this.apex.length; i++){
		ctx.lineTo(this.apex[i].pos.x, this.apex[i].pos.y)
	}
	ctx.closePath()
	ctx.lineWidth = 1
	ctx.lineCap = "butt"
	ctx.strokeStyle = "Blue"
	ctx.stroke()
	for(var i=0; i<this.grid.length; i++){
		if(this.grid[i].isAlive==false) continue
		s = 0.85
		ctx.beginPath()
		ctx.moveTo(this.grid[i].pos.x+ this.grid[i].apexRel[0].x*s, this.grid[i].pos.y+ this.grid[i].apexRel[0].y*s)
		ctx.lineTo(this.grid[i].pos.x+ this.grid[i].apexRel[1].x*s, this.grid[i].pos.y+ this.grid[i].apexRel[1].y*s)
		ctx.lineTo(this.grid[i].pos.x+ this.grid[i].apexRel[2].x*s, this.grid[i].pos.y+ this.grid[i].apexRel[2].y*s)
		ctx.closePath()
		if(this.activeGrid==i && this.grid[i].condition=="canPut"){
			ctx.fillStyle = color[activePlayer]
		}
		else if(this.grid[i].condition=="canPut"){
			ctx.fillStyle = color["l_"+activePlayer]
		}
		else if(this.activeGrid==i&& this.condition=="onMouse"){
			ctx.fillStyle = color["d_"+this.grid[i].color]
		}
		else{
			ctx.fillStyle = color[this.grid[i].color]
		}
		ctx.fill()
		if(this.grid[i].isStart==true){
			ctx.beginPath()
			ctx.arc(this.grid[i].pos.x, this.grid[i].pos.y, 5, 0, PI2, true)
			ctx.fillStyle = "white"
			ctx.fill()
		}
	}
	
}

PieceBoard.prototype.checkActive = function(piece){
	var checkCount = 0
	for(var i=0; i<this.apex.length; i++){
		if(checkSide(mouse, this.apex[i].pos, this.apex[(i+1)%this.apex.length].pos)=="right"){
			checkCount++
		}
		else{
			break
		}
	}
	if(checkCount==this.apex.length){
		for(var i=0; i<this.grid.length; i++){
			if(checkSide(mouse, this.grid[i].apex[0], this.grid[i].apex[1])=="left" &&
			   checkSide(mouse, this.grid[i].apex[1], this.grid[i].apex[2])=="left" &&
			   checkSide(mouse, this.grid[i].apex[2], this.grid[i].apex[0])=="left"){
				this.activeGrid = i
				test[1] = this.grid[i].point.x
				test[2] = this.grid[i].point.y
				if(leftDown1==true && leftDown2==false){
					if(this.canMove(piece)==true) this.movePiece(piece)
					this.condition ="clicked"
				}
				else{
					this.condition = "onMouse"
				}
				break
			}
		}
	}
}

PieceBoard.prototype.canMove = function(piece){
	var pieceActivePoint = piece.grid[clickedGrid[1]].point.add(P0)
	var boardActiveGrid = this.grid[this.activeGrid]
	if(clickedGrid[2]==true && mod(pieceActivePoint.x- boardActiveGrid.point.x,2)==0){
		for(var i=0; i<piece.grid.length; i++){
			var checkGridPoint = boardActiveGrid.point.add(piece.grid[i].point.sub(pieceActivePoint))
			if(checkPointExist(checkGridPoint, this)==false || 
			   (this.grid[axisToNum(checkGridPoint)].condition!="offPiece" && this.grid[axisToNum(checkGridPoint)].condition!=piece.num)){
				return false
			}
		}
		return true
	}
}

PieceBoard.prototype.movePiece = function(piece){
	var pieceActivePoint = piece.grid[clickedGrid[1]].point.add(P0)
	var boardActiveGrid = this.grid[this.activeGrid]
	if(clickedGrid[2]==true && mod(pieceActivePoint.x- boardActiveGrid.point.x,2)==0){
		for(var i=0; i<piece.grid.length; i++){
			var checkGrid = piece.grid[i]
			this.grid[axisToNum(checkGrid.point)].condition = "offPiece"
			checkGrid.point = boardActiveGrid.point.add(checkGrid.point.sub(pieceActivePoint))
		}
		piece.setPos(this)
	}
}
















