//---- 二、数据类型 ----
//1. 数值类型判断
function typeOfValue(val) {
	if(typeof val === "object") {
		return Object.prototype.toString.call(val).slice(8, -1);
	}
	else {
		return typeof val;
	}
}

function isArray(arr) {
	return Array.isArray(arr);
}

function isFunction(fn) {
	return (typeof fn === "function");
}

//2. 深度拷贝
function deepClone(obj) {  

    if(typeof(obj) == 'object') {

    	//保持原型
    	var Constructor = obj.constructor;
    	var result = new Constructor(); 

        for(var i in obj) {
            var attr = obj[i];
            result[i] = arguments.callee(attr);
        }
        return result;
    } 

    else {
        return obj;
    }
};
//此外，使用JSON方法很简便，但不能保持原型
//result = JSON.parse(JSON.stringify(obj));

//3. 数组去重
function uniqArray(arr) {

	var temp = {};
	for(var i = 0, len = arr.length; i < len; i++) {

		var attr = arr[i];

		if(!temp[attr]) {
			temp[attr] = 1;
		} else continue;
	}

	var res = [];
	for(var pro in temp) {
		res.push(pro);
	}

	return res;
}

//4. 去除字符串首尾空白
function trim(str) {
	var reg = /(^\s+)|(\s+$)/g;  //不全局的话|前为真就短路了，不会再匹配后面的
	return str.replace(reg, "");
}

//5. 数组遍历
function each(arr, fn) {
	for(var i = 0, len = arr.length; i < len; i++) {
		fn(arr[i], i);
	}
}

//6. 获取对象里第一层元素的数量
function getObjLength(obj) {

	if(typeof obj === 'object' && obj) {

		var len = 0;
		for(var pro in obj) {
			if(obj.hasOwnProperty(pro)) {
				len++;
			}
		}

		return len;
	}
}

//7. 判断是否为邮箱地址
function isEmail(emailStr) {
	var reg = /^[\w-]+@[\w-]+.[\w-]+$/i;
	return reg.test(emailStr);
}

//8. 判断是否为手机号
//现有手机号前三位：
//130~139  145,147 15[012356789] 176,170,177,178 180~189
function isMobilePhone(phone) {
	var reg = /^1(3[0-9]|4[57]|5[012356789]|7[0678]|8[0-9])\d{8}$/;
	return reg.test(phone);
}

//---- 三、DOM ----
//9. 为节点添加类
function addClass(element, newClass) {
	var oldClass = trim(element.className);
	var finalClass = '';
	oldClass === '' ? finalClass = newClass : finalClass = oldClass + ' ' + newClass;
	element.className = finalClass;
}

//10.移除oldClass
function removeClass(element, oldClassName) {
	var classStr = element.className;
	var reg = new RegExp('(\\s|^)' + oldClassName + '(\\s|$)');
	var newClass = classStr.replace(reg, ' ');
	element.className = newClass;
}

//11. 判断是否为兄弟节点
function isSiblingNode(element, siblingNode) {
	return element.parentNode === siblingNode.parentNode;
}

//12. 获取元素相对于浏览器窗口的位置
function getPosition(element) {

	var left = parseInt(element.offsetLeft);
	var top = parseInt(element.offsetTop);
	var current = element;

	while(current.parentNode && current.parentNode !== document.documentElement) {
		current = current.parentNode;

		left += parseInt(current.offsetLeft);
		top += parseInt(current.offsetTop);

		console.log(left + ' ' + top);
	}

	return {
		x: left + 'px',
		y: top + 'px'
	};
}

//13. 实现一个简单的Query
function $(selector) {
	//根据iD
	if(/^#/.test(selector)) {
		return document.getElementById(selector.slice(1));
	}
	//根据类名
	if(/^\./.test(selector)) {
		return document.getElementsByClassName(selector.slice(1))[0];
	}
	//根据属性
	if(/^\[[\w\-=\'\"]+\]$/.test(selector)) {

		var childNodes = document.getElementsByTagName('*');
		
		var i = 0;
		var len = childNodes.length;
		

		if(selector.indexOf("=") != -1){  //指定属性值
			console.log('here');

			var attr = selector.slice(1,-1).split('=');
			attr[1] = attr[1].replace(/[\"\']+/g,"");
	
			for (; i < len; i++) {
				if(childNodes[i].getAttribute(attr[0]) === attr[1]) {
					return childNodes[i];
				}
			}
		}
		else {  //不指定属性值
			var attrName = selector.slice(1,-1);
			console.log(attrName);
			for (; i < len; i++) {
				if(childNodes[i].hasAttribute(attrName)) {
					return childNodes[i];
				}
			}				
		}
	}
	else {
		return document.getElementsByTagName(selector);
	}

	//组合查找
}

// ------四、事件 ----
//1. 绑定事件
function addEvent(selector, event, listener) {
	var element = $(selector);

	if(element.addEventListener) { //现代浏览器
		element.addEventListener(event, listener, false);
	}
	else if(element.attachEvent) { //IE
		element.attachEvent('on' + event, listener);
	}
	else {
		element['on' + event] = listener;
	}

}
//2. 移除事件
function removeEvent(selector, event, listener) {
	var element = $(selector);

	if(element.removeEventListener) {
		element.removeEventListener(event, listener, false);
	}
	else if(element.detachEvent) {
		element.detachEvent('on' + event, listener);
	}
	else {
		element['on' + event] = null;
	}
}

//3. 实现对click事件的绑定
function addClickEvent(selector, listener) {
	var element = $(selector);
    addEvent(element, 'click', listener);
}

//4. 实现对于按Enter键时的事件绑定
function addEnterEvent(selector, listener) {
	var element = $(selector);
    addEvent(element, keydown, listener)
}

$.on = addEvent;

$.un = removeEvent;

$.click = addClickEvent;

$.enter = addEnterEvent;

//5. 事件代理
function delegateEvent(selector, tag, eventName, listener) {
	
	$.on(selector, eventName, function(event){
		var e = arguments[0] || window.event; //后者针对IE8及以下
		var tg = e.srcElement || e.target; 

		if(tg && tg.nodeName.toLowerCase() == tag) {
			listener();
		}
	});
}

$.delegate = delegateEvent;
