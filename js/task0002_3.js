window.onload = function() {
	var imgs = $('#slider-imgs').getElementsByTagName('img');
	var dots = document.getElementsByClassName('dot');
	var len = imgs.length;
	var index = 0;
	var timer = null;

    function changeImgsAndDots() {
		for(var i = 0; i < len; i++) {
			if(dots[i].className.indexOf('active') !== -1){
				removeClass(dots[i], 'active');
				imgs[i].style.display = "none";
				break;
			}
		}
		addClass(dots[index], 'active');
		imgs[index].style.display = "block";
	}

	function slider() {
		if(index >= len) {
			index = 0;
		}
		changeImgsAndDots();
		index++;
	}

	function play() {
		timer = setInterval(slider, 2000);
	}

	function stop() {
		clearInterval(timer);
	}

	//事件绑定
	for(var i = 0; i < len; i++) {
		dots[i].idx = i;
		dots[i].onclick = function() {
			index = this.idx;
			changeImgsAndDots();
		};
	}

	$('#slider').onmouseover = stop;
	$('#slider').onmouseout = play;

    //调用
	play();

}