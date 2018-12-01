function getStyle(obj, name) {

	if(window.getComputedStyle) {
		//正常浏览器的方式,具有getComputedStyle()方法
		return getComputedStyle(obj, null)[name];
	} else {
		//IE8的方式
		return obj.currentStyle[name];
	}
}

//定义一个变量，用来保存定时器标识
//var timer;
//创建一个可以执行简单动画的函数
/*
 * 参数：
 * 	obj:要执行动画的对象
 * 	attr:要执行动画的样式,比如，left,top,width,height
 * 	target:执行动画的目标
 * 	speed:移动的速度(正数向右移动，负数向左移动)
 * 	callback:回调函数
 */
function move(obj, attr, target, speed, callback) {
	//关闭上一个定时器
	clearInterval(obj.timer);

	//获取元素目前的位置
	var current = parseInt(getStyle(obj, attr));

	//判断速度的正负值
	//如果从0移动到800，则speed为正
	//如果从800移动到0，则speed为负
	if(current > target) {
		speed = -speed;
	}

	//开启定时器,用来执行动画效果
	//向执行动画的对象中添加一个timer属性，用来保存它自己的定时器标识
	//从而防止了，box2定时器，关闭了box1定时器
	obj.timer = setInterval(function() {
		//获取box1原来的left值
		var oldValue = parseInt(getStyle(obj, attr));

		//在旧值的基础上增加
		var newValue = oldValue + speed;

		//判断newValue是否大于800
		//从800向0移动
		//向左移动时需要判断newValue值是否小于target
		//向右移动时需要判断newValue值是否大于target
		if((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
			newValue = target;
		}

		//将新值设置给box1
		obj.style[attr] = newValue + "px";

		//当新值移动到800px时，停止动画
		if(newValue == target) {
			//达到目标关闭定时器
			clearInterval(obj.timer);
			//动画执行完毕时，执行回调函数
			//判断函数是否传入了回调函数，有则执行，没有则不执行
			callback && callback();
		}
	}, 30);
};

//定义一个函数，用来向一个元素中添加指定的class属性值
/*
 * 参数：
 * 	obj 要添加class属性的元素
 * 	cn 要添加的class值
 */
function addClass(obj, cn) {

	//判断obj中是否含有cn
	if(!hasClass(obj, cn)) {
		//注意添加" ",防止拼串
		obj.className = " " + cn;
	}
}

/*
 * 判断一个元素中是否含有指定的class属性值
 * 如果有该class，则返回true，没有则返回false
 */
function hasClass(obj, cn) {

	//判断obj中有没有cn  class
	//创建一个正则表达式
	//使用单词边界/\bb2\b/,表示有b2，且b2还是独立的，
	//这样就能防止b2018返回true了，但是这里不能将b2写死，所以要通过构造函数
	//var reg = /\bb2\b/;

	//这里要注意转义字符
	//这样就能动态的去生成正则表达式了
	var reg = new RegExp("\\b" + cn + "\\b");

	return reg.test(obj.className);

}

/*
 * 删除一个元素中指定的class属性值
 */
function removeClass(obj, cn) {
	//创建一个正则表达式
	var reg = new RegExp("\\b" + cn + "\\b");

	//删除class
	obj.className = obj.className.replace(reg, "");
}

/*
 * toggleClass可以用来切换一个类
 * 如果元素中具有该类，则删除
 * 如果元素中没有该类，则添加
 * 
 */
function toggleClass(obj, cn) {
	//判断obj中是否含有cn
	if(hasClass(obj, cn)) {
		//有，则删除
		removeClass(obj, cn);
	} else {
		//没有，则添加
		addClass(obj, cn);
	}
}