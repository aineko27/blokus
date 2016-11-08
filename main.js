//global
var screenCanvas;
var run = true;
var fps = 1000 / 60;
var counter = 0;
var mouse = new Point();
var moves = 0;
var playerNum = 1;
var activePlayer = "red";
var playerColor = new Array("red", "blue", "green", "yellow")
var playerCapital = new Array("RED", "BLUE", "GREEN", "YELLOW")
var printMassage = ""
var printFrame
var kc
var keyCode1 = new Array();
var keyCode2 = new Array();
var leftDown1 = false;
var rightDown1 = false;
var leftUp1 = false;
var rightUp1 = false;
var leftDown2 = false;
var rightDown2 = false;
var leftUp2 = false;
var rightUp2 = false;
var sizeRate = 1;
var PI = Math.PI;
var PI2 = PI* 2;
var PI_2 = PI/ 2;
var gridLen = 42;
var sideNum = 9;
var test = new Array();
var P0 = new Point();
var clickedGrid = new Array(0,0,false);

//main=================================================================================================
window.onload = function(){
	//スクリーンの初期化
	screenCanvas = document.getElementById("screen");
	screenCanvas.width = window.innerWidth;
	screenCanvas.height = window.innerHeight-80;
	ctx = screenCanvas.getContext("2d");
	//イベントの登録
	window.addEventListener("mousemove", mouseMove, true);
	window.addEventListener("mousedown", mouseDown, true);
	window.addEventListener("mouseup", mouseUp, true);
	window.addEventListener("keydown", keyDown, true);
	window.addEventListener("keyup", keyUp, true);
	
	var board = new Board;
	var pieceBoard = new PieceBoard;
	//test=======================================
	var testcount = 0
	for(var i=0; i<pieceShapePoint.length; i++){
		if(pieceShapePoint[i]==undefined) break
		testcount++
	}
	//test=======================================
	var piece = new Array(testcount)
	for(var i=0; i<piece.length; i++){
		piece[i] = new Piece
		piece[i].num = i
		piece[i].set("red", pieceBasePoint[i], pieceShapePoint[i], pieceApexPoint[i])
	}
	var pushButton = new Array(4)
	for(var i=0; i<pushButton.length; i++){
		pushButton[i] = new PushButton
		pushButton[i].num = i
		pushButton[i].set(new Point(1237+i*140, 750), 120, 90)
	}
	// piece[1].color = "blue"
	// piece[2].color = "green"
	
	//=============================================
	board.grid[120].isStart = true
	board.grid[223].isStart = true
	board.grid[239].isStart = true
	board.grid[408].isStart = true
	board.grid[424].isStart = true
	board.grid[527].isStart = true
	for(var i=0; i<piece.length; i++){
		piece[i].setPos(pieceBoard);
	}
	
	
	//レンダリング処理を呼び出す==========================================================
	//loadCode();
	(function(){
		counter++

		//初期化を行う
		board.initialize()
		
		for(var i=0; i<piece.length; i++){
			piece[i].initialize()
		}
		
		
		//マウスの場所チェック
		board.checkActive()
		if(board.condition=="offMouse"){
			for(var i=0; i<piece.length; i++){
				if(piece[i].isAlive){
					piece[i].checkActive(piece);
				}
			}
			pieceBoard.checkActive(piece[clickedGrid[0]])
			for(var i=0; i<pushButton.length; i++){
				if(piece[clickedGrid[0]].isAlive==true){
					pushButton[i].checkActive(piece[clickedGrid[0]], pieceBoard)
				}
			}
		}
		
		//計算処理
		if(piece[clickedGrid[0]].isAlive==true){
			if(board.condition=="onMouse" && clickedGrid[2]==true){
				board.checkCanPut(piece[clickedGrid[0]], pieceBoard, false)
			}
			if(board.condition=="clicked" && clickedGrid[2]==true){
				board.checkCanPut(piece[clickedGrid[0]], pieceBoard, true)
			}
		}
		
		for(var i=0; i<keyCode1.length; i++){
			keyCode2[i] = keyCode1[i]
		}
		leftDown1 = leftDown2
		rightDown1 =　rightDown2
		leftUp1 = leftUp2
		rightUp1 = rightUp2 
		//描画=========================================================================================
		
		//スクリーンクリア
		ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height)
		board.draw();
		pieceBoard.draw();
		for(var i=0; i<piece.length; i++){
			if(piece[i].isAlive==true){
				piece[i].draw()
			}
		}
		for(var i=0; i<pushButton.length; i++){
			pushButton[i].draw()
		}
		
		
		
		//info
		if(printFrame+120>counter){
			ctx.beginPath()
			ctx.fillStyle = "black"
			ctx.font = "35px 'MSゴシック'"
			ctx.textAlign = "center";
			ctx.fillText("ERROR: " + printMassage, 800, 820)
			ctx.textAlign = "left";
		}
		ctx.beginPath()
		ctx.fillStyle = "black"
		ctx.font = "40px 'MSゴシック'"
		ctx.fillText("YOUR BLOKUS: ("+ piece.length+" left)", 1285, 60)
		
		ctx.beginPath()
		ctx.fillStyle = color["d_"+activePlayer]
		ctx.font = "40px 'MSゴシック'"
		ctx.fillText("PLAYER: "+playerCapital[moves%playerNum]+ "   MOVES: "+ moves, 580, 50)
		
		
		// info.innerHTML = "  0: "+test[0]+", 1: "+test[1]+", 2: "+test[2]+", 3: "+test[3]+", 4: "+test[4]+",  5"+test[5]
		info.innerHTML = "  0: "+test[0]+" Point(x="+test[1]+", y="+test[2]+" ),  3: "+test[3]+", 4: "+test[4]+",  5"+test[5]
		if(run){setTimeout(arguments.callee, fps);}
	})();
};


var mouseMove = function(e){
	//マウスカーソルの座標の更新
	mouse.x = e.clientX - screenCanvas.offsetLeft;
	mouse.y = e.clientY - screenCanvas.offsetTop;
};

var keyDown = function(e){
	kc = e.keyCode;
	keyCode1[kc] = true;
	if(keyCode1[27]) run = false;
};

var keyUp = function(e){
	kc = e.keyCode;
	keyCode1[kc] = false;
};

var mouseDown = function(e){
	if(e.button == 0){
		leftDown1  = true;
		leftUp1 = false;
	}
	else if(e.button == 2){
		rightDown1 = true;
		rightUp1 = false;
	}
};

var mouseUp = function(e){
	if(e.button == 0){
		leftDown1  = false;
		leftUp1  = true;
	}
	else if(e.button == 2){
		rightDown1  = false;
		rightUp1 = true;
	}
};
window.onblur = function (){
	keyCode1.length = 0;
};