cos = Math.cos
sin = Math.sin
sqrt = Math.sqrt

var Point = function(a, b){
	if(typeof(a)=="number" && typeof(b)=="number"){
		this.x = a;
		this.y = b;
	}
	else{
		this.x = 0;
		this.y = 0;
	}
};

Point.prototype.add = function(p){
	if(typeof(p.x)=="number"){
		var q = new Point();
		q.x = this.x+ p.x;
		q.y = this.y+ p.y;
		return q;
	}
	else if(typeof(p)=="number"){
		var q = new Point();
		q.x = this.x+ p;
		q.y = this.y+ p;
		return q;
	}
}

Point.prototype.sub = function(p){
	if(typeof(p.x)=="number"){
		var q = new Point();
		q.x = this.x- p.x;
		q.y = this.y- p.y;
		return q;
	}
	else if(typeof(p)=="number"){
		var q = new Point();
		q.x = this.x- p;
		q.y = this.y- p;
		return q;
	}
};

Point.prototype.dot = function(p){
	if(typeof(p.x)=="number") return this.x* p.x+ this.y* p.y;
	else if(typeof(p)=="number") return this.x* cos(p)+ this.y* sin(p);
	else console.log("!ERROR Point.dot")
}

Point.prototype.cross = function(p){
	if(typeof(p.x)=="number") return this.x* p.y- this.y* p.x;
	else if(typeof(p)=="number") return this.x* sin(p)- this.y* cos(p);
	else console.log("!ERROR Point.cross")
}

Point.prototype.mul = function(a){
	if(typeof(a)=="number"){
		var q = new Point();
		q.x = this.x* a;
		q.y = this.y* a;
		return q;
	}
	else if(typeof(a.x)=="number"){
		var q = new Point();
		q.x = this.x* a.x;
		q.y = this.y* a.y;
		return q;
	}
	else console.log("!ERROR Point.mul")
}

Point.prototype.div = function(a){
	if(typeof(a)=="number"){
		var q = new Point();
		q.x = this.x/ a;
		q.y = this.y/ a;
		return q;
	}
	else if(typeof(a.x)=="number"){
		var q = new Point();
		q.x = this.x/ a.x;
		q.y = this.y/ a.y;
		return q;
	}
	else console.log("!ERROR Point.div")
}

Point.prototype.norm = function(){
	return sqrt(this.x * this.x +this.y * this.y);
};

Point.prototype.normalize = function(){
	var i = this.norm();
	var q = new Point();
	if(i > 0){
		q.x = this.x/ i;
		q.y = this.y/ i;
		return q;
	}
	else console.log("!ERROR Point.normalize")
	run = false;
};

Point.prototype.rot = function(center, rad){
	if(typeof(center.x)=="number" && typeof(rad)=="number"){
		var x = (this.x- center.x)*cos(rad)- (this.y- center.y)*sin(rad);
		var y = (this.x- center.x)*sin(rad)+ (this.y- center.y)*cos(rad);
		return new Point(center.x+ x, center.y+ y)
	}
	else console.log("!ERROR Point.rot");
}

//配列の処理を行う==================================================================================================
Array.prototype.sum = function(){
	var sum = 0;
	for(var i=0; i<this.length; i++){
		sum += this[i];
	}
	return sum;
}

Array.prototype.mul = function(a){
	var arr = new Array(this.length);
	for(var i=0; i<this.length; i++){
		arr[i] = this[i]* a;
	}
	return arr;
}

//その他適当な関数=================================================================================================
var mod = function(a, b){
	if(!b) return a-dotLen*(Math.floor(a/dotLen));
	else if(typeof(a)=="number" && typeof(b)=="number") return a-b*(Math.floor(a/b));
}

var angle = function(rad){
	if(typeof(rad)=="number"){
		var q = new Point();
		q.x = cos(rad);
		q.y = sin(rad);
		return q;
	}
}

var atan2 = function(a, b){
	if(typeof(b)=="number") return Math.atan2(a, b);
	else if(typeof(a.x)=="number") return Math.atan2(a.y, a.x);
	else console.log("!ERROR function atan2");
	
}

var moveTo = function(a){
	if(typeof(a.x)=="number"){
		ctx.moveTo(a.x, a.y);
	}
	else console.log("!ERROR function moveTo");
}

var lineTo = function(a){
	if(typeof(a.x)=="number"){
		ctx.lineTo(a.x, a.y);
	}
	else console.log("!ERROR function lineTo");
}

var gradation1 = function(p1, p2, c1, c2){
	grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
	grad.addColorStop(0, c1);
	grad.addColorStop(1, c2);
	return grad;
}

var gradation2 = function(p, r1, r2, c1, c2){

	grad = ctx.createRadialGradient(p.x, p.y, r1, p.x, p.y, r2);
	grad.addColorStop(0, c1);
	grad.addColorStop(1, c2);
	return grad;
}

var drawDot = function(p){
	ctx.beginPath();
	ctx.arc(p.x, p.y, 2, 0, PI2, true);
	ctx.fillStyle = "black";
	ctx.fill();
}

var checkSide = function(p, a, b){
	if(typeof(p)!="object" || typeof(a)!="object" || typeof(b)!="object"){
		alert("checkSide bug")
	} 
	else{
		var value = p.sub(a).cross(b.sub(a))
		if(value<0){
			return "right"
		}
		else{
			return "left"
		}
	}
}

var axisToNum = function(p){
	return p.x + p.y*4*sideNum
}

checkPointExist = function(p, board){
	// console.log(board, board.grid, p)
	var grid = board.grid[axisToNum(p)]
	if(grid==undefined) return false
	else if(grid.isAlive==false) return false
	else return true
}
















