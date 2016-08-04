var aBtn = document.getElementsByClassName('node-visible');

function render(obj, arrow, visible) {
    if (arrow) {
        if ( obj.children[1] && obj.children[1].className == "node-hidden" ) {
            obj.children[0].children[0].className = "arrow right-arrow"
        } else if( obj.children[1] && obj.children[1].className == "node-visible"){
            obj.children[0].children[0].className = "arrow down-arrow"
        } else {
        	obj.children[0].children[0].className = "arrow empty-arrow"
        }
    }
    if (visible) {
        if (obj.className.indexOf("node-visible") == -1) { // 本不可见，改为可见
            obj.className = obj.className.replace("hidden", "visible");
        } else { //改为不可见
            obj.className = obj.className.replace("visible", "hidden");
        }
    }
}

function bindBtn() {
    for (var i = 0; i < aBtn.length; i++) {
        aBtn[i].addEventListener('click', putObj);
    };
}

function putObj(e) {
    e = e || window.event;
    if (e.stopPropagation) { //W3C阻止冒泡方法  
        e.stopPropagation();
    } else {
        e.cancelBubble = true; //IE阻止冒泡方法  
    }
    for (var i = 1; i < this.children.length; i++) {
        if (this.children[i].children[1]) {
            this.children[i].addEventListener('click', putObj);
            render(this.children[i], false, true);
        } else {
            this.children[i].addEventListener('click', function(e) {
                e = e || window.event;
                if (e.stopPropagation) { //W3C阻止冒泡方法  
                    e.stopPropagation();
                } else {
                    e.cancelBubble = true; //IE阻止冒泡方法  
                }
            });
            render(this.children[i], false, true);
        }

    }
    render(this, true, false);
}
bindBtn();
var aImg = document.getElementsByClassName('add');
for (var i = 0; i < aImg.length; i++) {
    aImg[i].addEventListener('click', function(e) {
        e = e || window.event;
        if (e.stopPropagation) { //W3C阻止冒泡方法  
            e.stopPropagation();
        } else {
            e.cancelBubble = true; //IE阻止冒泡方法  
        }
        var that = this;
        addChild(prompt("请输入要创建的节点", "写点啥"), that);
    });
};

function addChild(text, node) {
    var aImgParent = node.parentNode.parentNode;
    if (text) {
        text.trim();
        var div1 = document.createElement('div');
        if (!aImgParent.children[1]) {
            div1.className = 'node-hidden';
        } else if (aImgParent.children[1] && aImgParent.children[1].className.indexOf("node-visible") == -1) {
            div1.className = 'node-hidden';
        } else {
            div1.className = 'node-visible';
        }
        var div2 = document.createElement('div');
        div2.className = 'node-header';
        var div3 = document.createElement('div');
        div3.className = 'arrow empty-arrow';
        var span = document.createElement('span');
        span.innerHTML = text;
        var img1 = document.createElement('img');
        img1.src = "img/add.png";
        img1.className = 'add';
        img1.addEventListener('click', function(e) {
        	/*这一段如果不加就不阻止img点击事件向上冒泡
             *这样就实现点击img添加节点的时候冒泡到爷div的
             *点击事件，可以使节点变成展开状态。加上反之。
             *主要看实现那种交互。
        	 */
        	/*
        	 *这里还是得加上，懒得加其他判断了
        	 *以后再完善。不加上的话如果是展开状态添加了节点，
        	 *而又没阻止冒泡，就相当于点击了爷元素进行收拢。
        	 *思路是判断一下是展开还是非展开状态，然后再决定
        	 *冒泡与否。所以还是得写一个判断节点为何种节点
        	 *的函数每次调用一下就行了。
        	 */
            e = e || window.event;
            if (e.stopPropagation) { //W3C阻止冒泡方法  
                e.stopPropagation();
            } else {
                e.cancelBubble = true; //IE阻止冒泡方法  
            }
            var that = this;
            addChild(prompt("请输入要创建的节点", "写点啥"), that)
        });
        var img2 = document.createElement('img');
        img2.src = "img/delete.png";
        img2.className = 'del';
        img2.addEventListener('click', function  (e) {
			e = e || window.event;
			if(e.stopPropagation){
				e.stopPropagation()
			} else {
				e.cancelBubble = true;
			}
			var that = this;
		    del(that);
		});
        aImgParent.appendChild(div1);
        div1.appendChild(div2);
        div2.appendChild(div3);
        div2.appendChild(span);
        div2.appendChild(img1);
        div2.appendChild(img2);
        // div1.addEventListener('click', function(e) {
        //     e = e || window.event;
        //     if (e.stopPropagation) { //W3C阻止冒泡方法  
        //         e.stopPropagation();
        //     } else {
        //         e.cancelBubble = true; //IE阻止冒泡方法  
        //     }
        //  });
        aImgParent.addEventListener('click', putObj);
        render(aImgParent, true, false);
    }
}



function del (obj) {
	var thisParent = obj.parentNode.parentNode;
	var thisPparent = thisParent.parentNode;
	removeElement(thisParent);
    render(thisPparent,true,false);
}

function removeElement(element){
         var parentElement = element.parentNode;
         if(parentElement){
                parentElement.removeChild(element); 
         }
}


/*渲染初始数据*/
var oImgAdd = document.getElementsByClassName('add');
var oNode = document.getElementsByClassName('node-visible')[0];

addChild('水果', oImgAdd[0]);
addChild('零食', oImgAdd[0]);
addChild('果汁', oImgAdd[0]);
addChild('苹果', oImgAdd[1]);
addChild('栗子', oImgAdd[1]);
addChild('梨子', oImgAdd[1]);
addChild('荔枝', oImgAdd[1]);
addChild('辣条', oImgAdd[6]);
addChild('小小酥', oImgAdd[6]);
addChild('旺旺仙贝', oImgAdd[6]);
addChild('浪味仙', oImgAdd[6]);
addChild('果粒橙', oImgAdd[11]);
addChild('可乐', oImgAdd[11]);
addChild('雪碧', oImgAdd[11]);
addChild('雀巢咖啡', oImgAdd[11]);
