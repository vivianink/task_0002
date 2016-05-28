# task_0002
百度前端学院之JS练习任务

###小结
####计算器
'
function addEventHandle() {
	var num1 = Number($('number1').value);
	var num2 = Number($('number2').value);
	console.log(typeof num1);
	var result = add(num1, num2);
	renderResult(result);
}
'
注意value获取的是字符串，要转换成数值否则采用 + 连接的时候是连成字符串

####<javascript>标签的位置
<p>应当放在'</body>'前面，由于脚本的下载和执行会阻塞其他文件的下载和文档的渲染。现在已经可以并行下载JS脚本，但让会阻塞CSS等其他文件的下载。</p>
参考资料：[JavaScript 的性能优化：加载和执行](_http://www.ibm.com/developerworks/cn/web/1308_caiys_jsload/index.html#icomments)

- Q1:并行下载在执行的时候是否仍会阻塞？

注意offsetLeft等返回的是带px单位的字符串，进行计算时应当转换为数字。
使用Number()强制转换只能转换本身就是纯数字的字符串，而parseInt可以将遇到的第一个非数字之后的字符串忽略。

getElementsByTagName()只返回元素节点，而通过childNodes会返回元素节点和文本节点。

继承的两种方式； 

'
// 1.
function Person(name, age) {
	this.name = name;
	this.age = age;
}
Person.prototype.sayName = function() {
	console.log(this.name);
}

function Chinesse(name, age, country) {
	Person.call(this, name, age);  //构造函数继承实例属性
	this.country = country;
	this.sayCountry = function() {
		console.log(this.country);
	};
}

Chinesse.prototype = new Person(); //原型继承，因为Person的实例可以访问到其原型方法

var p = new Chinesse('Lily', 10, 'Chinesse');

//2. 使用Object.create

Chinesse.prototype = Object.create(Person.prototype, {});

var p1 = Object.create(Person.prototype, {
	hobby: ['swimming', 'hiking'],
	sayHi: function() {
		alert('hi');
	}
});
console.log(p1.hasOwnProperty('sayHi')); //true
'

实例上调用原型方法时，实际上是如下过程：
'
Object.getPrototypeOf(a1).doSomething
'