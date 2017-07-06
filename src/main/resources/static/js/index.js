(function($) {
	//日期下拉
	$("#selectAdate2").dateSelector({
		yearBegin:2016,
	});
	// 日期下拉选择改变
	$('#selectAdate2_selectYear').on('change',function(){
		var selectYearTime=$('#selectAdate2').val();
			selectYearTime=new Date().getNowFormatDate(selectYearTime);
			readMapFrame(selectYearTime);
	});
	$('#selectAdate2_selectMonth').on('change',function(){
		var selectMonthTime=$('#selectAdate2').val();
			selectMonthTime=new Date().getNowFormatDate(selectMonthTime);
			readMapFrame(selectMonthTime);
	});
	$('#selectAdate2_selectDay').on('change',function(){
		var selectDayTime=$('#selectAdate2').val();
			selectDayTime=new Date().getNowFormatDate(selectDayTime);
			readMapFrame(selectDayTime);
	});
	// 跳转
	$('#data').find('.box').find('.table').find('tbody').on('click','tr',function(){
		var crossTime=$(this).attr('data-crosstime');
		var plateNo=$(this).attr('data-plateno');
		window.location.href="/behavior-analysis?crossTime="+crossTime+"&plateNo="+plateNo;
		
	});
	
	
	// 初始化地图
	initMap();
	function initMap(){
		var nowDate=new Date().getNowFormatDate();//获取当前时间
		console.log(nowDate);
		readMapFrame(nowDate);
	}
	function readMapFrame(time){		
		//地图
		var dom_map = document.getElementById('map');
		var myChart_map = echarts.init(dom_map);
		var option_map = null;		
		option_map={
				title: {
					text: '交通概览图',
					textStyle: {
						color: '#fff'
					},
					top: 10,
					left: 10,
				},
				tooltip:{
					formatter:function(params){
						var res="";
	                		res+=params.marker+params.seriesName+'<br>';
	                        res+=params.name+':'+params.data.car_cross_cnt;
		                return res;
					}
				},
				//设置右侧拦的下标
				legend: {
					data: ['严重警告', '中度警告', '低度警告'],
					textStyle: {
						color: '#fff'
					},
					orient: 'vertical',
					right: '2%',
					bottom: '5%'
				},
				bmap: {
					center: [113.366286, 23.130748], //113.366286,23.130748 天河
					zoom: 14,
					roam: true,
					mapStyle: { //设置的地图的样式
						style:'dark'
						/*styleJson: [{
								'featureType': 'water',
								'elementType': 'all',
								'stylers': {
									'color': '#08233e'
								}
							},
							{
								'featureType': 'land',
								'elementType': 'all',
								'stylers': {
									'color': '#08233e'
								}
							},
							{
								'featureType': 'railway',
								'elementType': 'all',
								'stylers': {
									'visibility': 'off'
								}
							},
							{
								'featureType': 'highway', //高速
								'elementType': 'geometry',
								'stylers': {
									'color': '#227eda',
									'weight': '0.1'
								}
							},
							{
								'featureType': 'highway',
								'elementType': 'labels',
								'stylers': {
									'color': '#ffffff'
								}
							},
							{
								'featureType': 'highway',
								'elementType': 'labels.text.stroke',
								'stylers': {
									'color': 'transparent'
								}
							},
							{
								'featureType': 'arterial', //城市主路
								'elementType': 'geometry',
								'stylers': {
									'color': '#227eda',
									'weight': '0.1'
								}
							},
							{
								'featureType': 'arterial',
								'elementType': 'labels',
								'stylers': {
									'color': '#ffffff'
								}
							},
							{
								'featureType': 'arterial',
								'elementType': 'labels.text.stroke',
								'stylers': {
									'color': 'transparent'
								}
							},
							{
								'featureType': 'poi',
								'elementType': 'all',
								'stylers': {
									'visibility': 'off'
								}
							},
							{
								'featureType': 'green',
								'elementType': 'all',
								'stylers': {
									'visibility': 'off'
								}
							},
							{
								'featureType': 'subway',
								'elementType': 'all',
								'stylers': {
									'visibility': 'off'
								}
							},
							{
								'featureType': 'manmade',
								'elementType': 'all',
								'stylers': {
									'color': '#08233e'
								}
							},
							{
								'featureType': 'local',
								'elementType': 'all',
								'stylers': {
									'color': '#08233e'
								}
							},
							{
								'featureType': 'boundary',
								'elementType': 'all',
								'stylers': {
									'color': '#fefefe'
								}
							},
							{
								'featureType': 'building',
								'elementType': 'all',
								'stylers': {
									'color': '#08233e'
								}
							},
							{
								'featureType': 'label',
								'elementType': 'labels.text.fill',
								'stylers': {
									'color': '#ffffff',
									'weight': '0.1'
								}
							},
							{
								'featureType': 'label',
								'elementType': 'labels.text.stroke',
								'stylers': {
									'color': 'transparent',
									'weight': '0.1'
								}
							}
						]*/
					}
				}
			}	
		if(option_map && typeof option_map ==="object"){
			myChart_map.setOption(option_map);
			$.ajax({  
		        type: "get",  
		        async: false,  
		        url: "http://localhost:8082/getCarOverview?crossTime="+time,  
		        dataType: "jsonp",  
		        jsonp:"cb",
		        success: function(data){
		        	var data=JSON.parse(data);
		        	console.log(data);
		        	if(data.code === 200){	      
		        		var low=CarOverviewValueFormat(data.data).low;
		        		var medium=CarOverviewValueFormat(data.data).medium;
		        		var serious=CarOverviewValueFormat(data.data).serious;
		        		console.log(serious);
		        		myChart_map.setOption({
		        			series: [
		      						{
		      							name: '严重警告', //严重预警
		      							type: 'effectScatter',
		      							coordinateSystem: 'bmap',
		      							data:serious ,
		      							symbol: 'circle',
		      							showEffectOn: 'render',
		      							rippleEffect: {
		      								brushType: 'stroke'
		      							},
		      							itemStyle: {
		      								normal: {
		      									color: '#e60012',
		      									shadowBlur: 10,
		      									shadowColor: '#333'
		      								}
		      							},
		      							zlevel: 1
		      						},
		      						{
		      							name: '中度警告', //中度预警
		      							type: 'effectScatter',
		      							coordinateSystem: 'bmap',
		      							data:medium,
		      							symbol: 'circle',
		      							showEffectOn: 'render',
		      							rippleEffect: {
		      								brushType: 'stroke'
		      							},
		      							itemStyle: {
		      								normal: {
		      									color: '#ff8520',
		      									shadowBlur: 10,
		      									shadowColor: '#333'
		      								}
		      							},
		      						},
		      						{
		      							name: '低度警告', //低度预警
		      							type: 'effectScatter',
		      							coordinateSystem: 'bmap',
		      							data: low,
		      							symbol: 'circle',
		      							showEffectOn: 'render',
		      							rippleEffect: {
		      								brushType: 'stroke'
		      							},
		      							itemStyle: {
		      								normal: {
		      									color: '#ffed27',
		      									shadowBlur: 10,
		      									shadowColor: '#333'
		      								}
		      							}
		      					}
		     				]
		        		});
		        	}
		        	
		        },  
		        error: function(err){  
		            console.log("请求出错----"+err);
		        }
		    });
			myChart_map.on('click', function(params) {
				console.log(params);
				if(params.seriesType=='effectScatter'){
					$.ajax({  
				        type: "get",  
				        async: false,  
				        url: "http://localhost:8082/getCarOverviewCross?crossTime="+time+"&crossId="+params.data.cross_id,  
				        dataType: "jsonp",  
				        jsonp:"cb",
				        success:function(data){
				        	var data=JSON.parse(data);
				        	console.log(data);
				        	if(data.code === 200){
				        		if(data.data === "no data"){
				        			return;
				        		}
				        		$('#data').find('.box').find('.table').find('tbody').html(readTableFrame(data.data));
				        		$('#data').show();
				        	}				        	
				        },
				        error: function(err){  
				            console.log("请求出错----"+err);
				        }
					});
				}
			});
		}	
	}
	
	function readTableFrame(data){
		var html="";
		for(var i=0;i<data.length;i++){
			html+="<tr data-plateNo='"+data[i].plate_no+"' data-crossTime='"+data[i].cross_time+"'>";
			html+="<td>"+data[i].cross_name+"</td>";
			html+="<td>"+data[i].plate_no+"</td>";
			html+="<td>"+data[i].cross_time+"</td>";
			html+="<td>"+data[i].alert_type+"</td>";
			html+="</tr>";
		}
		return html;
	}
	//格式化数据 
	function CarOverviewValueFormat(data){
		var low=[],medium=[],serious=[];
		$.each(data,function(index,value){
			if(value.alert_type === "serious"){
				serious.push(value);
			}else if(value.alert_type === "low"){
				low.push(value);
			}else if(value.alert_type === "medium"){
				medium.push(value);
			}
		});	
		function addAttr(arr){
			var targetArray=arr|| [];
			$.each(targetArray,function(index,value){
				targetArray[index].name=value.cross_name;
				targetArray[index].value=[value.lng,value.lat];
			})
			return targetArray;
		}
		var lowArray=addAttr(low),
			mediumArray=addAttr(medium),
			seriousArray=addAttr(serious);
		return {
			low:lowArray,
			medium:mediumArray,
			serious:seriousArray
		}
	}
})(jQuery);