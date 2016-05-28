
function checkAndFilterInput(input, showBoard) {
	var str = input.value;
	var warn = $('#warn');
	warn.innerHTML = "";
	showBoard.innerHTML = "";
	//输入为空
	if(!str.toString()) {
		warn.innerHTML = "Please input at least one word!";
		return;
	}
	var arr = str.toString().split(',');
	//输入超过10个
	if(arr.length > 10) {
		warn.innerHTML = "Please input no more than ten words!";
		return;
	}
	else { // 去重
	 	var flag = {};
	 	var res = [];

	 	for(var i = 0, len = arr.length; i < len; i++) {

	 		var single1 = arr[i].replace(/^\s+|\s+$/g, ""); //去除首位空格
	 		var single = single1.replace(/\s{2,}/g, " "); //去除中间的多余空格

	 		if(flag[single] === undefined) {  //不存在
	 			res.push(single);
	 			flag[single] = 1;
	 		}
	 	}
	 	showBoard.innerHTML = res;
	 }
}

addEvent('#hobby-sub', 'click', function() {
	checkAndFilterInput($('#hobby-input'), $('#hobby-show'));
});