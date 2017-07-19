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
	/*$('#map_data').find('.table-content').mCustomScrollbar({
		axis:"y", theme:"my-theme"
	});
	$('#map_analysis').find('.table-content').mCustomScrollbar({
		axis:"y", theme:"my-theme"
	});*/
	// 初始化地图
	initMap();
	function initMap(){
		var nowDate=new Date().getNowFormatDate();//获取当前时间
		readMapFrame(nowDate);
	}
	function readMapFrame(time){		
		console.log(time);
		//地图
		var dom_map = document.getElementById('map');
		var myChart_map = echarts.init(dom_map);
		var option_map = null;		
		option_map={
				/*title: {
					text: '交通概览图',
					textStyle: {
						color: '#fff'
					},
					top: 10,
					left: 10,
				},	*/		
				/*tooltip:{
					formatter:function(params){
						var res="";
	                		res+=params.marker+params.seriesName+'<br>';
	                        res+=params.name+':'+params.data.car_cross_cnt;
		                return res;
					}
				},*/			
				//设置右侧拦的下标
				legend: {
					data: ['严重警告', '中度警告', '低度警告'],
					textStyle: {
						color: '#fff'
					},
					orient: 'vertical',
					right: '2%',
					bottom: '240px'
				},
				bmap: {
					center: [113.366286, 23.130748], //113.366286,23.130748 天河
					zoom: 14,
					roam: true,
					mapStyle: { //设置的地图的样式
						styleJson: [
						            {
					                    "featureType": "land",
					                    "elementType": "all",
					                    "stylers": {
					                              "color": "#444444",
					                              "visibility": "on"
					                    }
					          },
					          {
					                    "featureType": "water",
					                    "elementType": "all",
					                    "stylers": {
					                              "color": "#444444",
					                              "visibility": "on"
					                    }
					          },
					          {
					                    "featureType": "building",
					                    "elementType": "all",
					                    "stylers": {
					                              "color": "#444444",
					                              "visibility": "on"
					                    }
					          },
					          {
					                    "featureType": "manmade",
					                    "elementType": "all",
					                    "stylers": {
					                              "color": "#444444",
					                              "visibility": "on"
					                    }
					          },
					          {
					                    "featureType": "poi",
					                    "elementType": "all",
					                    "stylers": {
					                              "visibility": "off"
					                    }
					          },
					          {
					                    "featureType": "subway",
					                    "elementType": "all",
					                    "stylers": {
					                              "visibility": "off"
					                    }
					          },
					          {
					                    "featureType": "highway",
					                    "elementType": "geometry",
					                    "stylers": {
					                              "color": "#3d85c6"
					                    }
					          },
					          {
					                    "featureType": "arterial",
					                    "elementType": "geometry",
					                    "stylers": {
					                              "color": "#3d85c6"
					                    }
					          },
					          {
					                    "featureType": "local",
					                    "elementType": "geometry",
					                    "stylers": {
					                              "color": "#3d85c6"
					                    }
					          },
					          {
					                    "featureType": "green",
					                    "elementType": "all",
					                    "stylers": {
					                              "color": "#444444"
					                    }
					          },
					          {
					                    "featureType": "railway",
					                    "elementType": "all",
					                    "stylers": {
					                              "color": "#073763",
					                              "visibility": "off"
					                    }
					          },
					          {
					                    "featureType": "highway",
					                    "elementType": "labels.text.stroke",
					                    "stylers": {
					                              "color": "#ffffff"
					                    }
					          },
					          {
					                    "featureType": "arterial",
					                    "elementType": "labels.text.stroke",
					                    "stylers": {
					                              "color": "#ffffff"
					                    }
					          },
					          {
					                    "featureType": "local",
					                    "elementType": "labels.text.stroke",
					                    "stylers": {
					                              "color": "#ffffff"
					                    }
					          }
					  ]
					}
				}
			}	
		if(option_map && typeof option_map ==="object"){
			myChart_map.setOption(option_map);
			$.ajax({  
		        type: "get",  
		        async: false,  
		        url: "getCarOverview?crossDate="+time,  
		        success: function(data){
		        	console.log(data);
		        	if(data.code === 200){	  
		        		if(data.data === "null"){
		        			myChart_map.setOption({
		        				series:[
		        				        {
											name: '严重警告', //严重预警
											type: 'effectScatter',
											coordinateSystem: 'bmap',
											data:[] ,
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
			      							data:[],
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
			      							data: [],
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
		        		}else{
		        			var low=CarOverviewValueFormat(data.data).low;
			        		var medium=CarOverviewValueFormat(data.data).medium;
			        		var serious=CarOverviewValueFormat(data.data).serious;
			        		$('#map_analysis').find('.line-content').html(readLineFrame(data.data));	
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
			        		/*$.ajax({  
						        type: "get",  
						        async: false,  
						        url: "getCarOverviewCross?crossId="+data.data[0].cross_id+"&crossDate="+time,  
						        success:function(data){
						        	console.log(data);
						        	if(data.code === 200){
						        		if(data.data === "null") return;
						        		$('#map_data').find('.table-content').html(readTableFrame(data.data));				        		
						        		// 跳转
						        		$('#map_data').find('.table-content').find('.table').find('tbody').on('click','tr',function(){
						        			var crossDate=$(this).attr('data-crossdate');
						        			var plateNo=$(this).attr('data-plateno');
						        			window.location.href="/behavior-analysis?crossDate="+crossDate+"&plateNo="+plateNo;
						        			
						        		});
						        	}	
						        },
						        error: function(err){  
						            console.log("请求出错----"+err);
						        }
			        		});
			        		*/
			        		getCrossCarData(data.data[0].cross_id,time,function(data){
			        			if(data.code === 200){
					        		if(data.data === "null") return;
					        		$('#map_data').find('.table-content').html(readTableFrame(data.data));				        		
					        		// 跳转
					        		$('#map_data').find('.table-content').find('.table').find('tbody').on('click','tr',function(){
					        			var crossDate=$(this).attr('data-crossdate');
					        			var plateNo=$(this).attr('data-plateno');
					        			window.location.href="/behavior-analysis?crossDate="+crossDate+"&plateNo="+plateNo;
					        			
					        		});
					        	}
			        		});
			        		getCrossPoliceData(data.data[0].cross_id,time,function(data){
			        			console.log(data);
			        			if(data.code === 200){
			        				if(data.data === "null") return;
			        				$('#map_analysis').find('.table-content').html(readPoliceFrame(data.data));
			        			}
			        	   });
			        	   
		        		}	
		        	}
		        },  
		        error: function(err){  
		            console.log("请求出错----"+err);
		        }
		    });
			myChart_map.on('click', function(params) {
				console.log(params);
				if(params.seriesType=='effectScatter'){
					getCrossCarData(params.data.cross_id,time,function(data){
						if(data.code === 200){
			        		if(data.data === "null") return;
			        		$('#map_data').find('.table-content').html(readTableFrame(data.data));				        		
			        		// 跳转
			        		$('#map_data').find('.table-content').find('.table').find('tbody').on('click','tr',function(){
			        			var crossDate=$(this).attr('data-crossdate');
			        			var plateNo=$(this).attr('data-plateno');
			        			window.location.href="/behavior-analysis?crossDate="+crossDate+"&plateNo="+plateNo;
			        			
			        		});
			        	}	
					});
				}
			});
			myChart_map.on('mouseover',function(params){
				if (params.seriesType == 'effectScatter'){
					$(".cross_info_box>.cross_name").html("卡口："+params.data.name);
					$(".cross_info_box>.value").html("坐标："+params.data.value[0]+","+params.data.value[1]);
					$(".cross_info_box>.car_cross_cnt").html("预测通过车辆数："+params.data.car_cross_cnt);					
					var crossInfoBoxW=$(".cross_info_box").width();
					var contentW=$(".content").width();
					if(params.event.offsetX>(contentW/2)){
						$(".cross_info_box").css({"top":params.event.offsetY,"left":params.event.offsetX-crossInfoBoxW-15});
					}else{
						$(".cross_info_box").css({"top":params.event.offsetY,"left":params.event.offsetX+15});
					}
					$(".cross_info_box").show();
				}
			});
			myChart_map.on('mouseout',function(params){
				if (params.seriesType == 'effectScatter'){
					$(".cross_info_box").hide();
				}
			});
		}	
	}
	
	//根据crossID获取相对应的经过的车辆
	function getCrossCarData(crossId,crossDate,callback){
		$.ajax({  
	        type: "get",  
	        async: false,  
	        url: "getCarOverviewCross?crossId="+crossId+"&crossDate="+crossDate,  
	        success:function(data){
	        	callback && callback(data);
	        },
	        error: function(err){  
	            console.log("请求出错----"+err);
	        }
		});
	}
	//根据crossId获取相对应得警力分配
	function getCrossPoliceData(crossId,crossDate,callback){
		$.ajax({  
	        type: "get",  
	        async: false,  
	        url: "getCrossPolice?crossId="+crossId+"&crossDate="+crossDate,  
	        success:function(data){
	        	callback && callback(data);
	        },
	        error: function(err){  
	            console.log("请求出错----"+err);
	        }
		});
	}
	function readPoliceFrame(data){
		var html="";
			html+="<table>";
			html+="<thead><tr><th>卡口</th><th>预测通过车辆</th><th>人员</th><th>时间</th></tr></thead>";
			html+="<tbody>";
			for(var i=0;i<data.length;i++){
				html+="<tr>";
				html+="<td>"+data[i].cross_name+"</td>";
				html+="<td>"+data[i].cross_car_cnt+"</td>";
				html+="<td>"+data[i].cross_people+"</td>";
				html+="<td>"+data[i].cross_time+"</td>";
			}
			html+="</tbody>";
			html+="</table>";
			return html;
	}
	
	function readLineFrame(data){
		var html="";
		for(var i=0;i<data.length;i++){
			html+="<div class='line'>";
			html+="<div class='text'>"+data[i].cross_name+"</div>";
			html+="<div class='rate'>";
			html+="<div class='bg' style='width:"+(data[i].cross_warning_type_pie)*100+"%;'></div>";
			html+="</div>";
			html+="</div>";
		}
		return html;
	}
	
	function readTableFrame(data){
		var html="";
			html+="<table>";
			html+="<thead><tr><td>卡口</td><td>车牌</td><td>时间</td><td>预警类型</td></tr></thead>";
		for(var i=0;i<data.length;i++){
			html+="<tr data-plateNo='"+data[i].plate_no+"' data-crossdate='"+data[i].cross_date+"'>";
			html+="<td>"+data[i].cross_name+"</td>";
			html+="<td>"+data[i].plate_no+"</td>";
			html+="<td>"+data[i].hour_num+"</td>";
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