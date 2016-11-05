//global
var screenCanvas;
var run = true;
var fps = 1000 / 60;
var counter = 0;
var mouse = new Point();
var moves = 0;
var playerNum = 3;
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
var gridLen = 60;
var sideNum = 6;
var test = new Array();
var P0 = new Point();
var clickedGrid = new Array(0,1,false);
color = new Array()
var nextPoint = new Array(2)
nextPoint[0] = new Array(new Point(-1,0),new Point(1,0),new Point(1,1))
nextPoint[1] = new Array(new Point(-1,0),new Point(1,0),new Point(-1,-1))
var next2Point = new Array(2)
next2Point[0] = new Array(new Point(2,0),new Point(3,1),new Point(2,1), new Point(0,1), new Point(-1,1),
                         new Point(-2,0), new Point(-2,-1), new Point(-1,-1), new Point(0,-1))
next2Point[1] = new Array(new Point(2,0),new Point(2,1),new Point(1,1), new Point(0,1), new Point(-2,0),
                         new Point(-3,-1), new Point(-2,-1), new Point(0,-1), new Point(1,-1))
color["red"]      = "rgba(255,   0,   0, 0.55)"
color["green"]    = "rgba(  0, 255,   0, 0.55)"
color["blue"]     = "rgba(  0,   0, 255, 0.55)"
color["yellow"]   = "rgba(  0, 255, 255, 0.55)"
color["gray"]     = "rgba(155, 155, 155, 0.55)"
color["l_red"]    = "rgba(255,  60,  60, 0.35)"
color["l_green"]  = "rgba( 60, 255,  60, 0.35)"
color["l_blue"]   = "rgba( 60,  60, 255, 0.35)"
color["l_yellow"] = "rgba( 60, 255, 255, 0.35)"
color["l_gray"]   = "rgba(155, 155, 155, 0.35)"
color["d_red"]    = "rgba(255,   0,   0, 0.95)"
color["d_green"]  = "rgba(  0, 255,   0, 0.95)"
color["d_blue"]   = "rgba(  0,   0, 255, 0.95)"
color["d_yellow"] = "rgba(  0, 255, 255, 0.95)"
color["d_gray"]   = "rgba(155, 155, 155, 0.95)"
color[00] = "rgba(  0, 255,   0, 0.75)";//緑
color[01]　= "rgba(  0,   0, 255, 0.75)";//青
color[02] = "rgba(255,   0,   0, 0.75)";//赤
color[03]　= "rgba(255, 255,   0, 0.75)";//黄
color[04]　= "rgba( 85,  85,  85, 0.75)";//グレー
color[10] = "rgba( 60, 255,  60, 0.30)";//薄緑
color[11]　= "rgba( 60,  60, 255, 0.30)";//薄青
color[12] = "rgba(255,  60,  60, 0.30)";//薄赤
color[13] = "rgba(255, 255,  60, 0.30)";//薄黄
color[14]　= "rgba(115, 115, 115, 0.30)";//薄灰
color[20] = "rgba(  0, 140,   0, 0.85)";//濃緑
color[21] = "rgba(  0,   0, 140, 0.85)";//濃青
color[22] = "rgba(140,   0,   0, 0.85)";//濃赤
color[23] = "rgba( 20,  20,  20, 0.85)";//濃黄
color[24] = "rgba( 20,  20,  20, 0.85)";//濃灰
color[30] = "rgba(  0, 255,   0, "      //緑
color[31] = "rgba(  0,   0, 255, "      //青
color[32] = "rgba(255,   0,   0, "      //赤
color[32] = "rgba(255, 255,   0, "      //黄
color[34] = "rgba(255, 255, 255, "      //灰

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
	var piece = new Array(3)
	for(var i=0; i<piece.length; i++){
		piece[i] = new Piece
		piece[i].num = i
		piece[i].set(4, "red")
	}
	var pushButton = new Array(3)
	for(var i=0; i<pushButton.length; i++){
		pushButton[i] = new PushButton
		pushButton[i].num = i
		pushButton[i].set(new Point(100+i*200, 700), 100, 60)
	}
	piece[1].color = "blue"
	piece[2].color = "green"
	
	//=============================================
	piece[0].grid[0].point = new Point(0, 0)
	piece[0].grid[1].point = new Point(1, 0)
	piece[0].grid[2].point = new Point(2, 0)
	piece[0].grid[3].point = new Point(3, 0)
	piece[1].grid[0].point = new Point(0, 0)
	piece[1].grid[1].point = new Point(1, 0)
	piece[1].grid[2].point = new Point(2, 0)
	piece[1].grid[3].point = new Point(3, 1)
	piece[2].grid[0].point = new Point(0, 0)
	piece[2].grid[1].point = new Point(0, 1)
	piece[2].grid[2].point = new Point(1, 1)
	piece[2].grid[3].point = new Point(2, 1)
	board.grid[56].isStart = true
	board.grid[101].isStart = true
	board.grid[111].isStart = true
	board.grid[176].isStart = true
	board.grid[186].isStart = true
	board.grid[231].isStart = true
	for(var i=0; i<piece.length; i++){
		piece[i].setPos();
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
				piece[i].checkActive(piece);
			}
			for(var i=0; i<pushButton.length; i++){
				pushButton[i].checkActive(piece[clickedGrid[0]])
			}
		}
		
		if(keyCode1[82] && !keyCode2[82]){
			piece[clickedGrid[0]].reverse()
			piece[clickedGrid[0]].setPos()
		}
		if(keyCode1[84] && !keyCode2[84]){
			piece[clickedGrid[0]].rotate("clockwise")
			piece[clickedGrid[0]].setPos()
		}
		if(keyCode1[69] && !keyCode2[69]){
			piece[clickedGrid[0]].rotate("counterclockwise")
			piece[clickedGrid[0]].setPos()
		}
		
		//計算処理
		if(board.condition=="onMouse" && clickedGrid[2]==true){
			board.checkCanPut(piece[clickedGrid[0]], false)
		}
		if(board.condition=="clicked" && clickedGrid[2]==true){
			board.checkCanPut(piece[clickedGrid[0]], true)
		}
		
		test[1] = board.condition
		for(var i=0; i<keyCode1.length; i++){
			keyCode2[i] = keyCode1[i]
		}
		leftDown1 = leftDown2
		rightDown1 =　rightDown2
		leftUp1 = leftUp2
		rightUp1 = rightUp2 
		//===========================================================================================
		
		//スクリーンクリア
		ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height)
		board.draw();
		for(var i=0; i<piece.length; i++){
			piece[i].draw()
		}
		for(var i=0; i<pushButton.length; i++){
			pushButton[i].draw()
		}
		
		
		
		//info
		if(printFrame+120>counter){
			ctx.beginPath()
			ctx.fillStyle = "black"
			ctx.font = "45px 'MSゴシック'"
			ctx.fillText("ERROR ::  " + printMassage, 700, 600)
		}
		ctx.beginPath()
		ctx.fillStyle = color["d_"+activePlayer]
		ctx.font = "45px 'MSゴシック'"
		ctx.fillText("PLAYER: "+playerCapital[moves%playerNum]+ "   MOVES: "+ moves, 700, 700)
		console.log(counter)
		info.innerHTML = "  0: "+test[0]+", 1: "+test[1]+", 2: "+test[2]+", 3: "+test[3]+", 4: "+test[4]+",  5"+test[5]
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