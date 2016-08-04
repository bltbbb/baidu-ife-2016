var oInput = document.getElementsByTagName('input')[0],
    oBtn = document.getElementsByTagName('button'),
    team = [],
    onOff = false;
oBtn[0].addEventListener('click', function() {
	if(onOff == true){
		alert('排序呢！别手贱！告诉你妈!')
		return;
	}
	if(oInput.value == ''){
		alert('写点什么吧？');
		return;
	}else if(!(/^[0-9]+$/).test(oInput.value) || (oInput.value<10 || oInput.value>100)){
	    alert('数字不合法!');
	    return;
	}
	var txt = oInput.value;
	team.unshift(txt);
	print();
});
oBtn[1].addEventListener('click', function() {
	if(onOff == true){
		alert('排序呢！别手贱！告诉你妈!')
		return;
	}
	if(oInput.value == ''){
		alert('写点什么吧？');
		return;
	}else if(!(/^[0-9]+$/).test(oInput.value) || (oInput.value<10 || oInput.value>100)){
	    alert('数字不合法!');
	    return;
	}
	var txt = oInput.value;
	team.push(txt);
	print();
});
oBtn[2].addEventListener('click', function() {
	if(onOff == true){
		alert('排序呢！别手贱！告诉你妈!')
		return;
	}
	if(team.length == 0){
		alert('删不了');
		return;
	}
	alert('你删除了'+team.shift());
	print();
});
oBtn[3].addEventListener('click', function() {
	if(onOff == true){
		alert('排序呢！别手贱！告诉你妈!')
		return;
	}
	if(team.length == 0){
		alert('删不了');
		return;
	}
	alert('你删除了'+team.pop());
	print();
});

oBtn[4].onclick = function  () {
    if(onOff == true){
		alert('排序呢！别手贱！告诉你妈!')
		return;
	}
	team = [];
	for (var i = 0; i < 61; i++) {
		team.push(Math.random()*90 + 10);
	};
	print();
}
/*排序*/
function turn () {
	if(onOff == true){
		alert('排序呢！别手贱！告诉你妈!')
		return;
	}
	onOff = true;
	var team2 = [];
	var timer = null;
	for (var i = 0; i < team.length; i++) {
		team2.push(team[i]);
	};
	timer = setInterval(function() {
			team2.sort(function  (item1,item2) {
			return item1- item2;
		});
	    var a = team2.pop();
	    for (var i = 0; i < team.length; i++) {
	    	if(team[i] == a){
	    		 var b = team.splice(i, 1);
	    		 var c = b[0];
	    		 team.unshift(c);  
	         } 
	    	}
	    if(team2 == ''){
           clearInterval(timer);
           onOff = false;
	    }
	    print();
		}, 50);
	
    }
function print () {
	var oDiv = document.getElementById('box'),
	    html = '';
	for (var i = 0; i < team.length; i++) {
		color = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
		html += '<span style="height:'+team[i]+'px;background-color:'+color+'"></span>';
	};
	oDiv.innerHTML = html;
	oInput.value = '';
}

oBtn[5].onclick = turn;


