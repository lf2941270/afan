
//手游中心模块
$(function(){
	$.fn.tabs=function(content,callback){
		var elem=$(this);//tab触发器
		content=$(content);//tab容器
		elem.click(function(){
			var index=$(this).index()
			elem.trigger("change.tabs",index);
		});
		elem.bind("change.tabs",function(e,index){
			elem.eq(index).addClass("cur").siblings().removeClass("cur");
			content.find(".tab").eq(index).show().siblings().hide();
			callback(index);
		});
		elem.trigger("change.tabs",0);
		return this;
	}
	$(".phone_game .hd .tab_hd").tabs(".phone_game .bd",function(index){
		$(".tab_cur_bg").stop().animate({"left":(-1+154*index)+"px"},600,'easeOutBounce');
	});
	$(".phone_game .hovercur").hover(function(){
		$(this).find("a>img").stop().animate({
			width:"92px",
			height:"92px",
			left:"-5px",
			top:"-5px"
		})
	},function(){
		$(this).find("a>img").stop().animate({
			width:"82px",
			height:"82px",
			left:"0px",
			top:"0px"
		})
	});
	$(".phone_game .btn").hover(function(){
		$(this).parent(".hovercur").find(".ewm").addClass("cur");
	},function(){
		$(this).parent(".hovercur").find(".ewm").removeClass("cur");
	})
})


//首屏轮播上的雪花
//(function(window){
	var canvasSupported = !!document.createElement("canvas").getContext;
//  if (canvasSupported && !/msie/gi.test(navigator.userAgent)) {
	if (canvasSupported) {
		var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
			setTimeout(callback, 1000 / 60);
		};
		var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;
		var snowFall = function(snow) {
			snow = snow || {};
			this.maxFlake = snow.maxFlake || 100;
			this.flakeSize = snow.flakeSize || 7;
			this.fallSpeed = snow.fallSpeed || 2;
			this.status = 0;
		};
		snowFall.prototype.start = function() {
			if (this.status == 1 || this.status == 4) {
				return false;
			}
			this.status = 1;
			snowCanvas.apply(this);
			createFlakes.apply(this);
			drawSnow.apply(this);
		};
		snowFall.prototype.stop = function() {
			if (this.status == 2 || this.status == 0 || !this.canvas) {
				return false;
			}
			this.pause();
			this.status = 2;
			this.canvas.parentNode.removeChild(this.canvas);
			this.canvas = null;
		};
		snowFall.prototype.pause = function() {
			if (this.status == 3) {
				return false;
			}
			this.status = 3;
			cancelAnimationFrame(this.loop);
		};
		snowFall.prototype.resume = function() {
			if (this.status == 3 && this.canvas) {
				this.status = 4;
				this.loop = requestAnimationFrame(function() {
					drawSnow.apply(that);
				});
			}
		};
		function snowCanvas() {
			var snowcanvas = document.createElement("canvas");
			snowcanvas.id = "snowfall";
			snowcanvas.width = window.innerWidth;
			snowcanvas.height = 413;
			snowcanvas.setAttribute("style", "position:absolute;top: 0px;left:0px;z-index: 100;pointer-events: none;");
			$(".banner").append(snowcanvas);
			this.canvas = snowcanvas;
			this.ctx = snowcanvas.getContext("2d");
			window.onresize = function() {
				snowcanvas.width = window.innerWidth;
				snowcanvas.height =413;
			};
		}
		function flakeMove(canvasWidth, canvasHeight, flakeSize, fallSpeed) {
			this.x = Math.floor(Math.random() * canvasWidth);
			this.y = Math.floor(Math.random() * canvasHeight);
			this.size = Math.random() * flakeSize + 2;
			this.maxSize = flakeSize;
			this.speed = Math.random() * 1 + fallSpeed;
			this.fallSpeed = fallSpeed;
			this.velY = this.speed;
			this.velX = 0;
			this.stepSize = Math.random() / 30;
			this.step = 0;
		}
		flakeMove.prototype.update = function() {
			var x = this.x, y = this.y;
			this.velX *= 0.98;
			if (this.velY <= this.speed) {
				this.velY = this.speed;
			}
			this.velX += Math.cos(this.step += 0.05) * this.stepSize;
			this.y += this.velY;
			this.x += this.velX;
			if (this.x >= canvas.width || this.x <= 0 || this.y >= canvas.height || this.y <= 0) {
				this.reset(canvas.width, canvas.height);
			}
		};
		flakeMove.prototype.reset = function(width, height) {
			this.x = Math.floor(Math.random() * width);
			this.y = 0;
			this.size = Math.random() * this.maxSize + 2;
			this.speed = Math.random() * 1 + this.fallSpeed;
			this.velY = this.speed;
			this.velX = 0;
		};
		flakeMove.prototype.render = function(ctx) {
			var snowFlake = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
			snowFlake.addColorStop(0, "rgba(255, 255, 255, 0.9)");
			snowFlake.addColorStop(0.5, "rgba(255, 255, 255, 0.5)");
			snowFlake.addColorStop(1, "rgba(255, 255, 255, 0)");
			ctx.save();
			ctx.fillStyle = snowFlake;
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
			ctx.fill();
			ctx.restore();
		};
		function createFlakes() {
			var maxFlake = this.maxFlake, flakes = this.flakes = [], canvas = this.canvas;
			for (var i = 0; i < maxFlake; i++) {
				flakes.push(new flakeMove(canvas.width, canvas.height, this.flakeSize, this.fallSpeed));
			}
		}
		function drawSnow() {
			var maxFlake = this.maxFlake, flakes = this.flakes;
			ctx = this.ctx, canvas = this.canvas, that = this;
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			for (var e = 0; e < maxFlake; e++) {
				flakes[e].update();
				flakes[e].render(ctx);
			}
			this.loop = requestAnimationFrame(function() {
				drawSnow.apply(that);
			});
		}
		window.onload = function() {
			var snow = new snowFall({maxFlake: 80});
			snow.start();
		};
	}
//})(window);

