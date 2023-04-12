/* 首先获取canvas画布 */
var canvas = document.querySelector("#draw_texiao");
var yuan = canvas.getContext("2d");
/* 绑定窗口大小发生改变事件，让canvas随时铺满浏览器可视区 */
window.onresize = resizeCanvas;
function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}
resizeCanvas();

/* 定义数组，存下面触发移动事件时产生的小圆 */
var arr = [];

/* 绘制小圆形的方法，x与y是初始位置，r是圆半径 */
function circle(x, y, r) {
	this.x = x;
	this.y = y;
	this.r = r;
	/* 得一个随机颜色 */
	this.color = `rgb(${255 * Math.random()},${255 * Math.random()},${255 * Math.random()})`
	/* 圆的移动方向，random函数为随机返回一个0.0到1.0的数，x可得随机正负数，y为随机正数 */
	this.xZou = parseInt(Math.random() * 10 - 5);
	this.yZou = parseInt(Math.random() * 10);
	/* 向arr数组末尾添加这个元素 */
	arr.push(this);
}

/* 更新圆形的方法 */
circle.prototype.updated = function () {
	/* x和y增加，呈现圆形一直走 */
	this.x = this.x + this.xZou;
	this.y = this.y + this.yZou;
	/* 半径慢慢减少 */
	this.r = this.r - 0.1;
	/* 当半径小于1清除这个圆 */
	if (this.r < 0) {
		this.remove();
	}
}
/* 删除小圆的函数 */
circle.prototype.remove = function () {
	/* 遍历数组，找到和调用这个函数相同的圆后用splice函数删除 */
	for (let i = 0; i < arr.length; i++) {
		if (this == arr[i]) {
			arr.splice(i, 1);
		}
	}
}
/* 渲染小圆 */
circle.prototype.render = function () {

	yuan.beginPath();
	yuan.arc(this.x, this.y, this.r, 0, 2 * 3.14, false);
	yuan.fillStyle = this.color;
	yuan.fill();
}
/* 给画布绑定鼠标经过事件 */
canvas.addEventListener('mousemove', function (e) {
	/* 传入x，y，r。offsetX距离左侧距离，..， */
	new circle(e.offsetX, e.offsetY, Math.random() * 15);
})

/* 定时器渲染小圆，开始动画 ，30毫秒一次 */
setInterval(function () {
	/* 清屏 */
	yuan.clearRect(0, 0, canvas.width, canvas.height);
	/* 循环数组，给每个小圆更新和渲染 */
	for (let i = 0; i < arr.length; i++) {
		/* 更新 */
		arr[i].updated();
		/* 如果浏览器支持，则渲染 */

		if(arr[i])
		{
			if (arr[i].render()) {
				arr[i].render();
			}
		}

	}

}, 30)