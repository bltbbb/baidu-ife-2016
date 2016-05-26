var oInput = document.getElementsByTagName('input')[0];
var oBtn = document.getElementsByTagName('button'),
    team = [];
oBtn[0].addEventListener('click', function() {
	if(oInput.value == ''){
		alert('写点什么吧？');
		return;
	}else if(!(/^[0-9]+$/).test(oInput.value)){
	    alert('写数字');
	    return;
	}
	var txt = oInput.value;
	team.unshift(txt);
	print();
});
oBtn[1].addEventListener('click', function() {
	if(oInput.value == ''){
		alert('写点什么吧？');
		return;
	}else if(!(/^[0-9]+$/).test(oInput.value)){
	    alert('写数字');
	    return;
	}
	var txt = oInput.value;
	team.push(txt);
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