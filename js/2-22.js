var rootNode = document.getElementById('root'),
    divDate = [],
    timer = null,
    preBtn = document.getElementById('form').getElementsByTagName('button')[0],
    inBtn = document.getElementById('form').getElementsByTagName('button')[1],
    postBtn = document.getElementById('form').getElementsByTagName('button')[2],
    flow = false;
preBtn.addEventListener('click', function  () {
	goTo(preOrder);
});
inBtn.addEventListener('click', function() {
	goTo(inOrder);
});
postBtn.addEventListener('click', function() {
	goTo(postOrder);
});
function goTo (fn) {
	var timeValue = document.getElementsByTagName('input')[0].value;
	if(flow){
		alert('正在遍历，不要捣乱！');
		return;
	}
	divDate = [];
    fn(rootNode);
    changeColor(divDate,timeValue);
}
function preOrder (node) {
	if(!(node == null)){
		divDate.push(node);
		preOrder(node.firstElementChild);
        preOrder(node.lastElementChild);
	}
	flow = true;
}
function inOrder (node) {
	if(!(node == null)){
		inOrder(node.firstElementChild);
		divDate.push(node);
        inOrder(node.lastElementChild);
	}
	flow = true;
}
function postOrder (node) {
	if(!(node == null)){
		postOrder(node.firstElementChild);
        postOrder(node.lastElementChild);
        divDate.push(node);
	}
	flow = true;
}

function changeColor (arr,time) {
	var i = 0,
	    timer = null;
	arr[i].style.background = '#FE7373';
	timer = setInterval(function() {
		for (var j = 0; j < arr.length; j++) {
			arr[j].style.background = '#fff';
		};
		if (i == arr.length-1) {
			clearInterval(timer);
			i = 0;
			flow = false;
			return;
		};
		i++;
		arr[i].style.background = '#FE7373';
	}, time);
}