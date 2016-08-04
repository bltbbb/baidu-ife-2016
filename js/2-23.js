var rootNode = document.getElementById('root'),
    divDate = [],
    searchDate = [],
    timer = null,
    preBtn = document.getElementById('form').getElementsByTagName('button')[0],
    inBtn = document.getElementById('form').getElementsByTagName('button')[1],
    preSearch = document.getElementById('form').getElementsByTagName('button')[2],
    inSearch = document.getElementById('form').getElementsByTagName('button')[3],
    input1 = document.getElementsByTagName('input')[0],
    input2 = document.getElementsByTagName('input')[1],
    flow = false,
    num = 0;
preBtn.addEventListener('click', function  () {
	goTo(preOrder);
});
inBtn.addEventListener('click', function() {
	goTo(inOrder);
});
preSearch.addEventListener('click', function () {
	search(input1,preOrder);
});
inSearch.addEventListener('click', function  () {
	search(input2,inOrder);
});
//alert(document.getElementById('apple').firstChild.nodeValue)
function goTo (fn) {
	var timeValue = document.getElementsByTagName('input')[2].value;
	for (var j = 0; j < arr.length; j++) {
		arr[j].style.background = '#fff';
	};
	divDate = [];
    fn(rootNode);
    changeColor(divDate,timeValue);
}
function preOrder (node) {
	if (!(node == null)) {
		divDate.push(node);
		for (var i = 0; i < node.children.length; i++) {
			preOrder(node.children[i]);
		}
	}
	flow = true;
}
// 感觉这个算法设置的太巧妙了...
function inOrder (node) {
	if (!(node == null)) {
		divDate.push(node);
		inOrder(node.nextElementSibling);
		node = divDate[num++];
		inOrder(node.firstElementChild);
		// nodeList.push(node);
		// traverseBF(node.nextElementSibling, nodeList);
		// node = nodeList[BFindex++];
		// traverseBF(node.firstElementChild, nodeList);
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
	num = 0;
}
function search (valueNode,fn) {
	var inputValue = valueNode.value.trim();
	var timeValue = document.getElementsByTagName('input')[2].value;
	if(flow){
		alert('正在遍历，不要捣乱！');
		return;
	}
	divDate = [];
    fn(rootNode);
    searchNode(divDate,inputValue,timeValue);
	valueNode.value = '';
}
function searchNode (arr,value,time) {
	var i = 0,
	    timer = null;
	arr[i].style.background = '#FE7373';
	searchDate = [];
	timer = setInterval(function() {
		for (var j = 0; j < arr.length; j++) {
			arr[j].style.background = '#fff';
		};
		if (i == arr.length-1) {
			clearInterval(timer);
			i = 0;
			flow = false;
			markNode();
			return;
		};
		i++;
		arr[i].style.background = '#FE7373';
		if(arr[i].firstChild.nodeValue.trim() == value){
            searchDate.push(arr[i]);
        }
	}, time);
	num = 0;
}
function markNode () {
	if(searchDate.length > 0){
		for (var i = 0; i < searchDate.length; i++) {
			searchDate[i].style.background = '#C0BDBD';
		};
	}else{
		alert('没有找到!')
	}
}