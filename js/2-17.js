/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}

/*
 * 动画定时器
 */
function bottomChange () {
    var oBox = document.getElementById('aqi-box'),
        timer = null,
        oB = 0;
    oBox.style.bottom = -300 +'px';
    timer = setInterval(function() {
      oB += 1;
      oBox.style.bottom = parseInt(oBox.style.bottom) + oB +'px';
      if(parseInt(oBox.style.bottom) >= 0){
        oBox.style.bottom = 0;
        clearInterval(timer);
      }
    }, 20);

}


/**
 * 渲染图表
 */
function renderChart() {
    var oBox = document.getElementById('aqi-box'),
        html = '',
        color = '';
    for (i in chartData) {
      color = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
      html += '<div title="'+i+':'+chartData[i]+'" style="height:'+chartData[i]+'px;background:'+color+'"></div>'
    }
    oBox.innerHTML = html;
    bottomChange();
}

var graTime = document.getElementById('form-gra-time');

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  if(pageState.nowGraTime === this.value){
  // 设置对应数据
     return; 
  }else{
     pageState.nowGraTime = this.value;
  }
  // 调用图表渲染函数
  initAqiChartData();
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  if(pageState.nowSelectCity === this.value){
     return; 
  }else{
  // 设置对应数据
     pageState.nowSelectCity = this.value;
  // 调用图表渲染函数
  initAqiChartData();
  renderChart();
  }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var oInput = graTime.getElementsByTagName('input');
  for (var i = 0; i < oInput.length; i++) {
    oInput[i].onclick = graTimeChange;
    
   };
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  var oCity = document.getElementById('city-select');
  var aOption = oCity.getElementsByTagName('option');
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  for(attr in aqiSourceData){
    oCity.innerHTML += '<option>'+attr+'</option>'
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  oCity.onchange = citySelectChange;
  
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  var nowCityData = aqiSourceData[pageState.nowSelectCity];
  if(pageState.nowGraTime == "day"){
    // for(var i=0;i<aqiSourceData[pageState.nowSelectCity]){
    //   chartData[i] = 
    // }
    for (attr in aqiSourceData[pageState.nowSelectCity]) {
      chartData = nowCityData;
    }
  }
  // console.log(nowCityData)
  if(pageState.nowGraTime == "week"){
    chartData = {};
    var countData = 0,
        daySum = 0,
        week = 0;
    for (day in nowCityData) {
      countData += nowCityData[day];
      daySum++;
      if(new Date(day).getDay() == 6){
        week++;
        chartData['第'+week+'周'] = Math.floor(countData/daySum);
        countSum = 0;
        daySum = 0;
        countData = 0;
      }
    }
    if(daySum !== 0){
      week++;
      chartData['第'+week+'周'] = Math.floor(countData/daySum);
    }
  }
  if(pageState.nowGraTime == "month"){
    chartData = {};
    var countData = 0,
        daySum = 0,
        month = 0;
    for (day in nowCityData) {
      countData += nowCityData[day];
      daySum++;
      if(new Date(day).getMonth() != month){
        month++;
        chartData['第'+month+'月'] = Math.floor(countData/daySum);
        countSum = 0;
        daySum = 0;
        countData = 0;
      }
    }
    if(daySum !== 0){
      month++;
      chartData['第'+month+'月'] = Math.floor(countData/daySum);
    }
  }
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
}

/**
 * 初始化函数
 */
function init() {
  bottomChange();
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
  renderChart();
}

init();