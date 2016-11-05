var Board = function(){
	this.originPos = new Point(200, 20)
	this.centerPos = new Point()
	this.centerPos.x = this.originPos.x + gridLen* sideNum* 1/2
	this.centerPos.y = this.originPos.y + gridLen* sideNum* Math.sqrt(3)/2
	this.activeGrid = undefined
	this.condition = "offMouse"
	this.apex = new Array(6)
	for(var i=0; i<this.apex.length; i++){
		this.apex[i] = new Point()
		this.apex[i].pos = this.centerPos.add(angle(i/3*PI).mul(gridLen*sideNum))
	}
	this.grid = new Array(sideNum*sideNum*8)
	for(var i=0; i<this.grid.length; i++){
		this.grid[i] = {}
		this.grid[i].color = "gray"
		this.grid[i].isStart = false
		this.grid[i].num = i
		this.grid[i].condition = "offMouse"
		this.grid[i].xNum = i% (4* sideNum)
		this.grid[i].yNum = Math.floor(i/(4*sideNum))
		this.grid[i].point = new Point(this.grid[i].xNum, this.grid[i].yNum)
		this.grid[i].pos = new Point()
		var px = this.originPos.x + (this.grid[i].xNum - this.grid[i].yNum)*gridLen/2
		var py = this.originPos.y +this.grid[i].yNum* sqrt(3)* gridLen/2
		if(this.grid[i].xNum%2==0){
			this.grid[i].apex1 = new Point(px, py)
			this.grid[i].apex2 = new Point(px- gridLen/2, py+ sqrt(3)* gridLen/2)
			this.grid[i].apex3 = new Point(px+ gridLen/2, py+ sqrt(3)* gridLen/2)
		}
		else{
			this.grid[i].apex1 = new Point(px, py + sqrt(3)*gridLen/2)
			this.grid[i].apex2 = new Point(px+ gridLen/2, py)
			this.grid[i].apex3 = new Point(px- gridLen/2, py)
		}
		this.grid[i].pos.x = px
		this.grid[i].pos.y = (this.grid[i].apex1.y + this.grid[i].apex2.y + this.grid[i].apex3.y)/ 3 
		this.grid[i].apex1Rel = this.grid[i].apex1.sub(this.grid[i].pos)
		this.grid[i].apex2Rel = this.grid[i].apex2.sub(this.grid[i].pos)
		this.grid[i].apex3Rel = this.grid[i].apex3.sub(this.grid[i].pos)
		
		if(this.grid[i].xNum- this.grid[i].yNum*2 > sideNum*2 || 
		   this.grid[i].xNum- (this.grid[i].yNum-sideNum)*2 < 1){
			this.grid[i].isAlive = false
		   }
		else{
			this.grid[i].isAlive = true
		}
	}
}

Board.prototype.initialize = function(){
	this.condition = "offMouse"
	for(var i=0; i<this.grid.length; i++){
		this.grid[i].condition = "offMouse"
	}
}

Board.prototype.draw = function(){
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
		ctx.moveTo(this.grid[i].pos.x+ this.grid[i].apex1Rel.x*s, this.grid[i].pos.y+ this.grid[i].apex1Rel.y*s)
		ctx.lineTo(this.grid[i].pos.x+ this.grid[i].apex2Rel.x*s, this.grid[i].pos.y+ this.grid[i].apex2Rel.y*s)
		ctx.lineTo(this.grid[i].pos.x+ this.grid[i].apex3Rel.x*s, this.grid[i].pos.y+ this.grid[i].apex3Rel.y*s)
		ctx.closePath()
		if(this.activeGrid==i && this.grid[i].condition=="canPut"){
			ctx.fillStyle = color[activePlayer]
		}
		else if(this.grid[i].condition=="canPut"){
			ctx.fillStyle = color["l_"+activePlayer]
		}
		else if(this.activeGrid==i　&& this.condition=="onMouse"){
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

Board.prototype.checkActive = function(){
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
			if(checkSide(mouse, this.grid[i].apex1, this.grid[i].apex2)=="left" &&
			   checkSide(mouse, this.grid[i].apex2, this.grid[i].apex3)=="left" &&
			   checkSide(mouse, this.grid[i].apex3, this.grid[i].apex1)=="left"){
				this.activeGrid = i
				test[0] = i
				if(leftDown1==true && leftDown2==false){
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

Board.prototype.checkCanPut = function(piece, putFlag){
	var pieceActiveGrid = piece.grid[clickedGrid[1]]
	var boardActiveGrid = this.grid[this.activeGrid]
	if(piece.color!=activePlayer){
		if(putFlag==true){
			printMassage = "IT'S NOT YOUR TURN"
			printFrame = counter
		}
		return
	}
	if(boardActiveGrid.point.x%2!=pieceActiveGrid.point.x%2){
		if(putFlag==true){
			printMassage = "PIECE'S DIRECTION IS NOT CORRECT"
			printFrame = counter
		}
		return
	}
	var canPut = false
	for(var i=0; i<piece.grid.length; i++){
		var checkPoint = boardActiveGrid.point.add(piece.grid[i].point.sub(pieceActiveGrid.point))
		if(this.checkPointExist(checkPoint)==false) return
		var checkGrid = this.grid[axisToNum(checkPoint)]
		if(checkGrid.color!="gray"){
			if(putFlag==true){
				printMassage = "PIECE CAN'T FIT TO THIS PLACE"
				printFrame = counter
			}
			return
		}
		
		if(checkGrid.isStart==true && moves<playerNum) canPut = true
		var side = checkGrid.point.x%2
		
		for(var j=0; j<nextPoint[0].length; j++){
			if(this.checkPointExist(checkGrid.point.add(nextPoint[side][j]))==false) continue
			var nextGrid = this.grid[axisToNum(checkGrid.point.add(nextPoint[side][j]))]
			if(nextGrid.color==piece.color){
				if(putFlag==true){
					printMassage = "PIECE CONTACT WITH LINE TO YOUR COLOR"
					printFrame = counter
				}
				return
			}
		}
		for(var j=0; j<next2Point[0].length; j++){
			if(this.checkPointExist(checkGrid.point.add(next2Point[side][j]))==false) continue
			var nextGrid = this.grid[axisToNum(checkGrid.point.add(next2Point[side][j]))]
			if(nextGrid.color==piece.color) canPut = true
		}
	}
	if(canPut==true){
		this.changeColor(piece, putFlag)
	}
	else{
		if(moves<playerNum && putFlag){
			printMassage = "PUT THE PIECE TO START GRID"
			printFrame = counter
		}
		else if(putFlag){
			printMassage = "PIECE DOESN'T TOUCH YOUR COLOR"
			printFrame = counter
		}
	}
}

Board.prototype.checkPointExist = function(p){
	var grid = this.grid[axisToNum(p)]
	console.log(grid)
	if(grid==undefined) return false
	else if(grid.isAlive==false) return false
	else return true
}

Board.prototype.changeColor = function(piece, putFlag){
	var pieceActiveGrid = piece.grid[clickedGrid[1]]
	var boardActiveGrid = this.grid[this.activeGrid]
	if(putFlag==true){
		for(var i=0; i<piece.grid.length; i++){
			var checkPoint = boardActiveGrid.point.add(piece.grid[i].point.sub(pieceActiveGrid.point))
			var checkGrid = this.grid[axisToNum(checkPoint)]
			checkGrid.color = piece.color
		}
		moves++
		activePlayer = playerColor[moves%playerNum]
		printFrame = NaN
	}
	else{
		for(var i=0; i<piece.grid.length; i++){
			var checkPoint = boardActiveGrid.point.add(piece.grid[i].point.sub(pieceActiveGrid.point))
			var checkGrid = this.grid[axisToNum(checkPoint)]
			checkGrid.condition = "canPut"
		}
	}
}







