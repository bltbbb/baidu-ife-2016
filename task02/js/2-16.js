/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city = document.getElementById('aqi-city-input').value.trim();
    var value = document.getElementById('aqi-value-input').value.trim();
    var re = /^[\u4e00-\u9fa5a-zA-Z]+$/;
    if(!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)){
    	alert('请在城市名称栏输入中文或者英文！');
    	return;
    }else if(!value.match(/^\d+$/)){
        alert('请在AQI栏输入合法的AQI值');
        return;
    }else{
    	aqiData[city] = value;
    }
    console.log(aqiData)
}


/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var items = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
	for (attr in aqiData){
		items += '<tr><td>'+attr+'</td><td>'+aqiData[attr]+'</td><td class="del" data-city='+attr+' onclick="delBtnHandle(this);"><button>删除</button></td></tr>'
    }
    console.log(items)
    document.getElementById("aqi-table").innerHTML = items;
    // var items = document.getElementById('aqi-table');
    // for (attr in aqiData){
    // 	oTab.innerHTML = '<tr><td>'+attr+'</td><td>'+aqiData[attr]+'</td><td class="del" data-city='+attr+' onclick="delBtnHandle(this);">删除</td></tr>'
    // }
    // var items = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    // for(var city in aqiData){
    //     items += "<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button data-city="+city+" onclick="delBtnHandle(this);">删除</button></td></tr>"
    // }
    // document.getElementById("aqi-table").innerHTML = city ? items : "";
   
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(that) {
	delete aqiData[that.dataset.city];
	renderAqiList();
  // var oDel = document.getElementsByClassName('del');
  // for (var i = 0; i < oDel.length; i++) {
  // 	oDel[i].onclick = function  () {
  // 		console.log(this.dataset.city)
  // 	}
  // };
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  document.getElementById('add-btn').onclick = function  () {
  
  addAqiData();
  renderAqiList();
  }
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

init();