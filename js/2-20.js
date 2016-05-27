var oInput = document.getElementsByTagName('textarea')[0];
var oBtn = document.getElementsByTagName('button'),
    team = [];
function getText () {
	var txt = oInput.value.trim();
	txt = txt.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(item){return item !== '';});
  return txt;
}
oBtn[0].addEventListener('click', function leftIn() {
	if(oInput.value === ''){
		alert('写点什么吧？');
		return;
	}
	var txt = getText();
  for (var i = txt.length-1; i > -1; i--) {
		if(i<0) break;
		team.unshift(txt[i]);
	}
	print();
});
oBtn[1].addEventListener('click', function rightIn() {
	if(oInput.value === ''){
		alert('写点什么吧？');
		return;
	}
	var txt = getText();
	for (var i = 0; i < txt.length; i++) {
		team.push(txt[i]);
	}
	print();
});
oBtn[2].addEventListener('click', function() {
	if(team.length === 0){
		alert('删不了');
		return;
	}
	alert('你删除了'+team.shift());
	print();
});
oBtn[3].addEventListener('click', function() {
	if(team.length === 0){
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
	}
	oDiv.innerHTML = html;
	oInput.value = '';
}
function search () {
	oBtn[4].addEventListener('click',toGo,false);
	
    
}
function toGo () {
	var oInp = document.getElementById('inp');
	var txt = oInp.value;
	var waitText = document.getElementById('text').getElementsByTagName('div');
    for (var i = 0; i < waitText.length; i++) {
    	if(waitText[i].innerHTML.indexOf(txt) > -1){
    		waitText[i].style.backgroundColor = 'black';
    		waitText[i].style.transform = 'scale(1.2)';
    		waitText[i].style.borderRadius = '5px';
    	}else{
    		waitText[i].style.backgroundColor = 'red';
    		waitText[i].style.transform = 'scale(0.5)';
    		waitText[i].style.borderRadius = '0';
    	}
    }
}
search();