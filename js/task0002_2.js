function countDown() {

	var	countdownShow = $('#countdown-show');

	var dateInput = new Date($('#input-time').value); //输入时间
	var dateNow = new Date(); //当前时间

	var millisecInput = dateInput.getTime(); //距离1970毫秒数
	var millisecNow = dateNow.getTime();
	var millisecDiff = millisecInput - millisecNow;

	if(millisecDiff < 0) {
		$('#countdown-show').innerHTML = "您输入的日期小于当前日期！";
	}

	else {
		
		if(timer) {
			clearInterval(timer);
		}

		var timer = setInterval(function() {
			dateNow = new Date();
			millisecDiff = dateInput.getTime() - dateNow.getTime();

			if(millisecDiff < 0) {
				countdownShow.innerHTML = "倒计时结束";
				clearInterval(timer);
				return;
			}
			var gapDate = millisecDiff / (60 * 60 * 24 * 1000);
			var dateShow = Math.floor(gapDate);

			var gapHours = (gapDate - dateShow) * 24;
			var hoursShow = Math.floor(gapHours);

			var gapMinutes = (gapHours - hoursShow) * 60;
			var minutesShow = Math.floor(gapMinutes);

			var gapSeconds = (gapMinutes - minutesShow) * 60;
			var secondsShow = Math.floor(gapSeconds);

			countdownShow.innerHTML = "距离 " + dateInput + " 还有 " + dateShow + " 天 " + hoursShow + " 小时 " + minutesShow + " 分 " + secondsShow + " 秒 ";
			console.log(secondsShow);
		}, 1000);
	}
}

addEvent("#count-start", "click", countDown);