var oInput = document.getElementsByTagName('textarea')[0];
var oBtn = document.getElementsByTagName('button'),
    team = [];
var a = '1 2 3, 4';
alert(a.split(/[^\d]+/))
function getText () {
	var txt = oInput.value.trim();
	return txt = txt.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(item){return item != '';});
}
oBtn[0].addEventListener('click', function leftIn() {
	if(oInput.value == ''){
		alert('写点什么吧？');
		return;
	}
	var txt = getText();
	console.log(txt)
	for (var i = txt.length-1; i > -1; i--) {
		if(i<0) break;
		team.unshift(txt[i]);
	};
	print();
});
oBtn[1].addEventListener('click', function rightIn() {
	if(oInput.value == ''){
		alert('写点什么吧？');
		return;
	}
	var txt = getText();
	console.log(txt)
	for (var i = 0; i < txt.length; i++) {
		team.push(txt[i]);
	};
	print();
});
oBtn[2].addEventListener('click', function() {
	if(team.length == 0){
		alert('删不了');
		return;
	}
	alert('你删除了'+team.shift());
	print();
});
oBtn[3].addEventListener('click', function() {
	if(team.length == 0){
		alert('删不了');
		return;
	}
	alert('你删除了'+team.pop());
	print();
});
function print () {
	var oDiv = document.getElementById('text'),
	    html = '';
	for (var i = 0; i < team.length; i++) {
		html += '<div>'+team[i]+'</div>';
	};
	oDiv.innerHTML = html;
	oInput.value = '';
}