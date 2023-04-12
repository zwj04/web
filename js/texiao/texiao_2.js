window.onload = function() {
	canvas = document.getElementById("draw_texiao");
	ctx = canvas.getContext("2d");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	ballRadius = 12, g = 9.8 , mocali = 0.5, balls = [], collarg = 0.8;
	pxpm = canvas.width / 20;   //px/m
	for (var i = 0; i < 100; i++) {
		var ball = new Ball(getRandom(ballRadius, canvas.width - ballRadius), getRandom(ballRadius, canvas.height - ballRadius), ballRadius, "rgba(" + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + " , 1)");
		balls.push(ball);
	}
	animate();
	canvas.onclick = function(event) {
		event = event || window.event;
		var x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - canvas.offsetLeft;
		var y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop - canvas.offsetTop;
		balls.forEach(function(b) {
			b.vx = (x - b.x) / 40; //初速度 m/s
			b.vy = (y - b.y) / 40;
		});
	};

	/**
	 * 获得a到b之间的随机数
	 * @param a
	 * @param b
	 * @returns {*}
	 */
	function getRandom(a, b) {
		return Math.random() * (b - a) + a;
	}
	function animate() {
		ctx.clearRect(0, 0, canvas.width, canvas.height)//清空画布
		ctx.save();
		ctx.fillStyle = "rgba(255,255,255,0.2)";
		ctx.fillRect(0, 0, canvas.width, canvas.height)
		ctx.restore();
		var t = 16 / 1000;//因为requestAnimationFrame刷新频率约为16ms，所以每次运动变化的时间为16/1000
		collision();
		//所有的小球开始运动
		balls.forEach(function(b) {
			b.run(t);
		});
		if ("requestAnimationFrame" in window) {
			requestAnimationFrame(animate);
		} else if ("webkitRequestAnimationFrame" in window) {
			webkitRequestAnimationFrame(animate);
		} else if ("msRequestAnimationFrame" in window) {
			msRequestAnimationFrame(animate);
		} else if ("mozRequestAnimationFrame" in window) {
			mozRequestAnimationFrame(animate);
		}
	}
};

/**
 * 小球碰撞检测
 */
function collision() {
	//每个小球都拿出来检测碰撞，所以循环嵌套
	for (var i = 0; i < balls.length; i++) {
		for (var j = 0; j < balls.length; j++) {
			var b1 = balls[i], b2 = balls[j];
			//第i个小球和所有小球检测碰撞关系
			if (b1 !== b2) {
				// 计算两点间的距离
				var rc = Math.sqrt(Math.pow(b1.x - b2.x, 2) + Math.pow(b1.y - b2.y, 2));
				//两点间的距离 < 两球半径之和（说明小球碰撞了）
				if (Math.ceil(rc) < (b1.radius + b2.radius + 2)) {
					//获得碰撞后速度的增量 TODO 茫然中----数学忘光了，得补补
					var ax = ((b1.vx - b2.vx) * Math.pow((b1.x - b2.x), 2) + (b1.vy - b2.vy) * (b1.x - b2.x) * (b1.y - b2.y)) / Math.pow(rc, 2);
					var ay = ((b1.vy - b2.vy) * Math.pow((b1.y - b2.y), 2) + (b1.vx - b2.vx) * (b1.x - b2.x) + (b1.y - b2.y)) / Math.pow(rc, 2);
					//给与小球新的速度
					b1.vx = (b1.vx - ax) * collarg;
					b1.vy = (b1.vy - ay) * collarg;
					b2.vx = (b2.vx + ax) * collarg;
					b2.vy = (b2.vy + ay) * collarg;
					//获取两球斜切位置并且强制扭转
					var clength = ((b1.radius + b2.radius + 2) - rc) / 2;
					var cx = clength * (b1.x - b2.x) / rc;
					var cy = clength * (b1.y - b2.y) / rc;
					b1.x = b1.x + cx;
					b1.y = b1.y + cy;
					b2.x = b2.x - cx;
					b2.y = b2.y - cy;
				}
			}
		}
	}
}
var Ball = function(x, y, r, color) {
	this.x = x;//圆心x
	this.y = y;//圆心y
	this.oldx = x;//旧的位置x
	this.oldy = y;//旧的位置y
	this.vx = 0;//x轴的增量
	this.vy = 0;//y轴的增量
	this.radius = r;//圆的半径
	this.color = color;//球的颜色
	this.candrod = true;//TODO
};
Ball.prototype = {
	/**
	 * 绘制小球
	 */
	paint: function() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius - 1, 0, Math.PI * 2);
		ctx.fillStyle = this.color;
		ctx.fill();
		this.moving = false;//是否处于移动中
	},
	/**
	 * 小球运动
	 * @param t 时间
	 * @returns {*|void}
	 */
	run: function(t) {
		if (!this.candrod) {
			return this.paint();
		}
		this.oldx = this.x;
		this.oldy = this.y;
		//判断x轴增量左右运动速度和方向
		this.vx += this.vx > 0 ? -mocali * t : mocali * t;
		//y轴的增量始终是叠加重力加速度
		this.vy = this.vy + g * t;
		//计算球心的位置   x = 时间 * x增量 *
		this.x += t * this.vx * pxpm;
		//计算球心的位置   y = 时间 * y增量 *
		this.y += t * this.vy * pxpm;
		//小球上下边界判断
		if (this.y > canvas.height - ballRadius || this.y < ballRadius) {
			//出界重新计算y
			this.y = this.y < ballRadius ? ballRadius : (canvas.height - ballRadius);
			//y轴增量方向相反，collarg为碰撞后减少的速度
			this.vy = -this.vy * collarg
		}
		//小球左右边界判断
		if (this.x > canvas.width - ballRadius || this.x < ballRadius) {
			//出界重新计算x
			this.x = this.x < ballRadius ? ballRadius : (canvas.width - ballRadius);
			//x的方向
			this.derectionX = !this.derectionX;
			//x轴增量方向相反，collarg为碰撞后减少的速度
			this.vx = -this.vx * collarg;
		}
		//绘制小球
		this.paint();
	},
}