var oInput = document.getElementsByTagName('input'),
    oText = document.getElementsByTagName('textarea')[0];
    oBtn = document.getElementsByTagName('button')[0],
    team = [],
    onOff = false;
tag();
var tagDate = [],
    team = [],
    onOff = false;
function tag () {
	oInput[0].onkeydown = function (e) {
		if(e.keyCode === 32 || e.keyCode === 188 || e.keyCode === 13 ){
			if(oInput[0].value.trim() === ''){
				return;
			}else{
				for (var i = 0; i < tagDate.length; i++) {
					if(oInput[0].value.trim() === tagDate[i]){
                        oInput[0].value = '';
						return;
					}
				};
				if(tagDate.length == 10){
					tagDate.shift();
				}
				tagDate.push(oInput[0].value.trim());
		        oInput[0].value = '';
		        print('tagDiv',tagDate);
		        deleteDiv();
			}
         }
	}
	oInput[0].onkeyup = function (e) {
		if(e.keyCode === 188 || e.keyCode === 32){
			oInput[0].value = '';
		}
	}
}
function deleteDiv () {
	var oTagDiv = document.getElementById('tagDiv');
	var aDiv = oTagDiv.getElementsByTagName('div');
	for (var i = 0; i < aDiv.length; i++) {
		aDiv[i].index = i;
		aDiv[i].onmouseover = function  () {
    		var oTxt = this.innerHTML;
	    	this.innerHTML = '删除'+ oTxt;
	    	this.style.backgroundColor = 'black';
	    	this.style.borderRadius = '5px';
	    	this.style.transform = 'scale(1.2)';
	    	this.onmouseout = function  () {
		    	this.innerHTML = oTxt;
		    	this.style.backgroundColor = 'red';
		    	this.style.borderRadius = '0';
		    	this.style.transform = 'scale(1)';
		    };
		    this.onclick = function  () {
		    	console.log(this.index);
		    	tagDate.splice(this.index, 1);
		    	this.innerHTML = '';
		    	console.log(tagDate)
		    	print('tagDiv',tagDate);
		    }
		};
	};
}

function getText () {
	var txt = oText.value.trim();
	txt = txt.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(item){return item !== '';});
    var nowTxt = [];
    for (var i = 0; i < txt.length; i++) {
    	if(nowTxt.indexOf(txt[i]) === -1){
    		nowTxt.push(txt[i])
    	}
    };
    return nowTxt;
}

oBtn.addEventListener('click', function () {
	if(oText.value === ''){
		alert('写点什么吧？');
		return;
	}
	var txt = getText();
	for (var i = 0; i < team.length; i++) {
		    for (var j = 0; j < txt.length; j++) {
		    	if(txt[j] === team[i]){
                txt.splice(j,1);
				continue;
				}
		    };
		};
	for (var i =0;i<txt.length;i++) {
		    team.push(txt[i]);
		    if(team.length > 10){
			    team.shift();
			}
		}
	print('text',team);
	oText.value = '';
});
function print (id,array) {
	var oDiv = document.getElementById(id),
	    html = '';
	for (var i = 0; i < array.length; i++) {
		html += '<div>'+array[i]+'</div>';
	}
	oDiv.innerHTML = html;
	oInput.value = '';
	deleteDiv();
}


