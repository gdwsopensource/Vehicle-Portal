(function($){
	
	$('#result').mCustomScrollbar({
		axis:"y", theme:"my-theme"
	});
	//获取参数
	function getQueryStringArgs(){
		var flag=(location.search.length > 0 ? true : false);
		if(flag){
				var qs=location.search.substring(1);
				var	args={},
				items=qs.length ? qs.split("&") : [],
				item=null,
				name=null,
				value=null,
				i=0,
				len=items.length;
				for(i=0;i<len;i++){
					item=items[i].split("=");
					name=decodeURIComponent(item[0]);
					value=decodeURIComponent(item[1]);
					if(name.length){
						args[name]=value;
					}
				}	
				return args;
		}else{
				return flag;
		}
		
	}
	function getAnalysisData(type,QueryObj,callback){
		/**
		 * type ===>0  获取当天的分析数据
		 * type ===>1  获取一周或者一个月的数据
		 * type ===>2  获取一年的数据
		 */
		var plateNo=QueryObj.plateNo || "",//车牌
			crossDate=QueryObj.crossDate || ""; //时间 ===>分析当天时间
		if(type === 0){
			$.ajax({  
		        type: "get",  
		        async: false,  
		        url: "analysisOneDay?crossDate=2016-06-01&plateNo="+plateNo,  
		        success:function(data){
		        	callback && callback(data);
		        },
		        error:function(err){
		        	  console.log("请求出错----"+err);
		        }
			});
		}else if(type ===1){
			$.ajax({  
		        type: "get",  
		        async: false,  
		        url: "analysisOnWeek?plateNo="+plateNo,  
		        success:function(data){
		        	callback && callback(data);
		        },
		        error:function(err){
		        	  console.log("请求出错----"+err);
		        }
			});
		}else if(type === 2){
			$.ajax({  
		        type: "get",  
		        async: false,  
		        url: "analysisOnMonth?plateNo="+plateNo,  
		        success:function(data){
		        	callback && callback(data);
		        },
		        error:function(err){
		        	  console.log("请求出错----"+err);
		        }
			});
		}else if(type === 3){
			$.ajax({  
		        type: "get",  
		        async: false,  
		        url: "analysisOnYear?plateNo="+plateNo,  
		        success:function(data){
		        	callback && callback(data);
		        },
		        error:function(err){
		        	  console.log("请求出错----"+err);
		        }
			});
		}	
	}
	var _initArgs=getQueryStringArgs();
	_initPage(_initArgs);
	function _initPage(_initArgs){
		if(_initArgs === false){	
			var prefix="analysis_";
			$('#search_btn').on('click',function(){
				var plateNo =$('#search').val();
					plateNo=$.trim(plateNo);
				if(plateNo !== ""){
					window.sessionStorage.setItem(prefix+"plateNo", plateNo);
					var type=parseInt($("input[name='analysis_type']:checked").val());
					var QueryObj={};
					if(type === 0){
						QueryObj.plateNo=plateNo;
						QueryObj.crossDate=new Date().getNowFormatDate();
						getAnalysisData(type,QueryObj,function(res){
							console.log(res);
							if(res.code === 200){
								if(res.data === "null"){
									$('#result').find('.result-data').html("没有查询到结果~");
								}else{
									var result_html="<div id='behavior_analysis_line'></div><div id='behavior_analysis_bar_total'></div><div id='behavior_analysis_pie'></div>";
									$('#result').find('.result-data').html(result_html);
									readAnalysis_Line_Frame(type,res.data);
									readAnalysis_bar_total_Frame(type,res.data);
									readAnalysis_pie_Frame(type,res.data);								
								}
							}
						});			
					}
					else if(type === 1){
						QueryObj.plateNo=plateNo;
						getAnalysisData(type,QueryObj,function(res){
							console.log(res);
							if(res.code === 200){
								if(res.data === "null"){
									$('#result').find('.result-data').html("没有查询到结果~");
								}else{
									var result_html="<div id='behavior_analysis_line'></div><div id='behavior_analysis_bar_total'></div><div id='behavior_analysis_pie'></div>";
									$('#result').find('.result-data').html(result_html);
									readAnalysis_Line_Frame(type,res.data);
									readAnalysis_bar_total_Frame(type,res.data);
									readAnalysis_pie_Frame(type,res.data);									
								}
							}
						});
					}
					else if(type === 2){
						QueryObj.plateNo=plateNo;
						getAnalysisData(type,QueryObj,function(res){
							console.log(res);
							if(res.code === 200){
								if(res.data === "null"){
									$('#result').find('.result-data').html("没有查询到结果~");
								}else{
									var result_html="<div id='hot'></div>";
									$('#result').find('.result-data').html(result_html);
									var hotHeight=$('#result').height();
									$('#hot').height(hotHeight);
									readAnalysis_hot_Frame(res.data);
								}
							}
						});
					}
					else if(type === 3){
						QueryObj.plateNo=plateNo;
						getAnalysisData(type,QueryObj,function(res){
							console.log(res);
							if(res.code === 200){
								if(res.data === "null"){
									$('#result').find('.result-data').html("没有查询到结果~");
								}else{
									var result_html="<div id='hot'></div>";
									$('#result').find('.result-data').html(result_html);
									var hotHeight=$('#result').height();
									$('#hot').height(hotHeight);
									readAnalysis_hot_Frame(res.data);
								}
							}
						});
					}
				};
			});
			$("input[name='analysis_type']").on('change',function(){
				if(!window.sessionStorage.getItem(prefix+"plateNo")) return;
				var plateNo=window.sessionStorage.getItem(prefix+"plateNo");
				var type=parseInt($(this).val());
				if(type ===0){
					var QueryObj=new Object();
						QueryObj.plateNo=plateNo;
						QueryObj.crossDate=new Date().getNowFormatDate();
						getAnalysisData(type,QueryObj,function(res){
							console.log(res);
							if(res.code === 200){
								if(res.data === "null"){
									$('#result').find('.result-data').html("没有查询到结果~");
								}else{
									var result_html="<div id='behavior_analysis_line'></div><div id='behavior_analysis_bar_total'></div><div id='behavior_analysis_pie'></div>";
									$('#result').find('.result-data').html(result_html);
									readAnalysis_Line_Frame(type,res.data);
									readAnalysis_bar_total_Frame(type,res.data);
									readAnalysis_pie_Frame(type,res.data);								
								}
							}
						});	
				}else if(type === 1){
					var QueryObj=new Object();
					QueryObj.plateNo=plateNo;
					getAnalysisData(type,QueryObj,function(res){
						console.log(res);
						if(res.code === 200){
							if(res.data === "null"){
								$('#result').find('.result-data').html("没有查询到结果~");
							}else{
								var result_html="<div id='behavior_analysis_line'></div><div id='behavior_analysis_bar_total'></div><div id='behavior_analysis_pie'></div>";
								$('#result').find('.result-data').html(result_html);
								readAnalysis_Line_Frame(type,res.data);
								readAnalysis_bar_total_Frame(type,res.data);
								readAnalysis_pie_Frame(type,res.data);
							}
						}
					});
				}else if(type ===2){
					var QueryObj=new Object();
					QueryObj.plateNo=plateNo;
					getAnalysisData(type,QueryObj,function(res){
						console.log(res);
						if(res.code === 200){
							if(res.data === "null"){
								$('#result').find('.result-data').html("没有查询到结果~");
							}else{
								var result_html="<div id='hot'></div>";
								$('#result').find('.result-data').html(result_html);
								var hotHeight=$('#result').height();
								$('#hot').height(hotHeight);
								readAnalysis_hot_Frame(res.data);
							}
						}
					});
				}
				else if(type === 3){
					var QueryObj=new Object();
					QueryObj.plateNo=plateNo;
					getAnalysisData(type,QueryObj,function(res){
						console.log(res);
						if(res.code === 200){
							if(res.data === "null"){
								$('#result').find('.result-data').html("没有查询到结果~");
							}else{
								var result_html="<div id='hot'></div>";
								$('#result').find('.result-data').html(result_html);
								var hotHeight=$('#result').height();
								$('#hot').height(hotHeight);
								readAnalysis_hot_Frame(res.data);
							}
						}
					});
				}
			});		
		}else{		
			$('#data').find('.box').find('.search').css('display','none');
			var initType=0;
			var prefix="analysis_";
			console.log(_initArgs);
			window.sessionStorage.setItem(prefix+"plateNo", _initArgs.plateNo);
			getAnalysisData(initType,_initArgs,function(res){
				console.log(res);
				if(res.code === 200){
					if(res.data === "null"){
						$('#result').find('.result-data').html("没有查询到结果~");
					}else{
						var result_html="<div id='behavior_analysis_line'></div><div id='behavior_analysis_bar_total'></div><div id='behavior_analysis_pie'></div>";
						$('#result').find('.result-data').html(result_html);
						readAnalysis_Line_Frame(initType,res.data);
						readAnalysis_bar_total_Frame(initType,res.data);
						readAnalysis_pie_Frame(initType,res.data);
					}
				}
		   });
		   $("input[name='analysis_type']").on('change',function(){
				if(!window.sessionStorage.getItem(prefix+"plateNo")) return;
				var plateNo=window.sessionStorage.getItem(prefix+"plateNo");
				var type=parseInt($(this).val());
				if(type ===0){
					var QueryObj=new Object();
						QueryObj.plateNo=plateNo;
						QueryObj.crossDate=new Date().getNowFormatDate();
						getAnalysisData(type,QueryObj,function(res){
							console.log(res);
							if(res.code === 200){
								if(res.data === "null"){
									$('#result').find('.result-data').html("没有查询到结果~");
								}else{
									var result_html="<div id='behavior_analysis_line'></div><div id='behavior_analysis_bar_total'></div><div id='behavior_analysis_pie'></div>";
									$('#result').find('.result-data').html(result_html);
									readAnalysis_Line_Frame(type,res.data);
									readAnalysis_bar_total_Frame(type,res.data);
									readAnalysis_pie_Frame(type,res.data);
								}
							}
						});	
				}else if(type === 1){
					var QueryObj=new Object();
					QueryObj.plateNo=plateNo;
					getAnalysisData(type,QueryObj,function(res){
						console.log(res);
						if(res.code === 200){
							if(res.data === "null"){
								$('#result').find('.result-data').html("没有查询到结果~");
							}else{
								var result_html="<div id='behavior_analysis_line'></div><div id='behavior_analysis_bar_total'></div><div id='behavior_analysis_pie'></div>";
								$('#result').find('.result-data').html(result_html);
								readAnalysis_Line_Frame(type,res.data);
								readAnalysis_bar_total_Frame(type,res.data);
								readAnalysis_pie_Frame(type,res.data);
							}
						}
					});
				}else if(type ===2){
					var QueryObj=new Object();
					QueryObj.plateNo=plateNo;
					getAnalysisData(type,QueryObj,function(res){
						console.log(res);
						if(res.code === 200){
							if(res.data === "null"){
								$('#result').find('.result-data').html("没有查询到结果~");
							}else{
								var result_html="<div id='hot'></div>";
								$('#result').find('.result-data').html(result_html);
								var hotHeight=$('#result').height();
								$('#hot').height(hotHeight);
								readAnalysis_hot_Frame(res.data);
							}
						}
					});
				}
				else if(type === 3){
					var QueryObj=new Object();
					QueryObj.plateNo=plateNo;
					getAnalysisData(type,QueryObj,function(res){
						console.log(res);
						if(res.code === 200){
							if(res.data === "null"){
								$('#result').find('.result-data').html("没有查询到结果~");
							}else{
								var result_html="<div id='hot'></div>";
								$('#result').find('.result-data').html(result_html);
								var hotHeight=$('#result').height();
								$('#hot').height(hotHeight);
								readAnalysis_hot_Frame(res.data);
							}
						}
					});
				}
			});			
		}
	}
	function readAnalysis_Line_Frame(type,data){
		var legendData=[],xAxisData=[],seriesData=[],title="";
		$.each(data,function(index,value){
			legendData.push(value.cross_name);
			var obj=new Object();
				obj.type="line";
				obj.name=value.cross_name;
				obj.data=value.cross_car_data;
				seriesData.push(obj);
		});		
		if(type === 0){
			xAxisData=data[0].day_time;
			title="一天内车辆经过卡口的分析";
		}else if(type === 1){
			title="一周内车辆经过卡口的分析";
			xAxisData=data[0].week_time;
		}	
		var dom_line = document.getElementById('behavior_analysis_line');
		var myChart_line = echarts.init(dom_line);
		var option_line = null;
		option_line = {
			title: {
				text: title,
				textStyle: {
					color: '#fff',
					fontWeight: 400
				}
			},
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data:legendData,
				textStyle: {
					color: '#fff'
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data:xAxisData,
				name: '时间',
				nameTextStyle: {
					color: '#fff'
				},
				axisLabel: {
					show: true,
					textStyle: {
						color: '#fff'
					}
				},
				axisLine: {
					lineStyle: {
						color: '#fff',
					}
				}
			},
			yAxis: {
				type: 'value',
				name: '次数',
				nameTextStyle: {
					color: '#fff'
				},
				axisLabel: {
					show: true,
					textStyle: {
						color: '#fff'
					}
				},
				axisLine: {
					lineStyle: {
						color: '#fff',
					}
				}
			},
			series:seriesData
		};
		myChart_line.setOption(option_line);

		$(window).on('resize',function(){
			myChart_line.resize();
		})
	}
	function readAnalysis_bar_total_Frame(type,data){
		var legendData=[],xAxisData=[],seriesData=[],title="";
		if(type === 0){
			title="统计一天内车辆通过卡口最多的总数";
		}else if(type === 1){
			title="统计一周内车辆通过卡口最多的总数";
		}
		$.each(data,function(index,value){
			xAxisData.push(value.cross_name);
			legendData.push(value.cross_name);
			seriesData.push(value.cross_car_total);
		});
		
		var dom_bar_total = document.getElementById('behavior_analysis_bar_total');
		var myChart_bar_total = echarts.init(dom_bar_total);
		var option_bar_total = null;
		option_bar_total = {
			title: {
				text: title,
				textStyle: {
					color: '#fff'
				},
			},
			tooltip: {},
			xAxis: {
				data: xAxisData,
				axisLabel: {
					show: true,
					textStyle: {
						color: '#fff'
					}
				},
				axisLine: {
					lineStyle: {
						color: '#fff',
					}
				},
				name: '卡口',
				nameStyle: {
					color: '#ff'
				}
			},
			yAxis: {
				name: '次数',
				nameStyle: {
					color: '#fff'
				},
				type: 'value',
				axisLabel: {
					show: true,
					textStyle: {
						color: '#fff'
					}
				},
				axisLine: {
					lineStyle: {
						color: '#fff',
					}
				}
			},
			series: [{
				type: 'bar',
				data: seriesData,
				name:"次数",
				itemStyle: {
					normal: {
						color: function(params) {
							var colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae'];
							return colorList[params.dataIndex];
						}
					}
				}
			}]
		}
		myChart_bar_total.setOption(option_bar_total);
		
		$(window).on('resize',function(){
			myChart_bar_total.resize();
		});
	}
	function readAnalysis_pie_Frame(type,data){
		var legendData=[],seriesData=[],title="";
		if(type === 0){
			title="统计一天内车辆通过卡口最多的百分比";
		}else if(type === 1){
			title="统计一周内车辆通过卡口最多的百分比";
		}
		$.each(data,function(index,value){
			legendData.push(value.cross_name);
			var obj=new Object();
				obj.name=value.cross_name;
				obj.value=value.cross_car_total;
				seriesData.push(obj);
		});
		
		
		var dom_pie = document.getElementById('behavior_analysis_pie');
		var myChart_pie = echarts.init(dom_pie);
		var option_pie = null;
		option_pie = {				
				title: {
					text: title,
					x: 'center',
					textStyle:{
						color:'#fff',
						fontWeight:400
					}
				},
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				legend: {
					orient: 'vertical',
					left: 'left',
					data: legendData,
					textStyle:{
						color:'#fff'
					}
				},
				series: [{
					name: '访问来源',
					type: 'pie',
					radius: '55%',
					center: ['50%', '60%'],
					data: seriesData,
					itemStyle: {
						emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					},
					label:{
						normal:{
							textStyle:{
								color:'#fff'
							}
						}
					}
				}]
		}
		myChart_pie.setOption(option_pie);
		
		$(window).on('resize',function(){
			myChart_pie.resize();
		});
	}
	function readAnalysis_hot_Frame(data){
		var data = data || [];
		var points=[];
		$.each(data,function(index,value){
			points.push(value.coord);
		});
		$.each(points,function(index,value){
			points[index].push(1);
		});
		console.log(points);
	    var dom_hot = document.getElementById('hot');
		var myChart_hot = echarts.init(dom_hot);
		myChart_hot.setOption(option = {
	        animation: false,
	        bmap: {
	            center: [113.366286, 23.130748],
	            zoom: 14,
	            roam: true,
	            mapStyle: { //设置的地图的样式
					//style:'dark'
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
	        },
	        visualMap: {
	            show: false,
	            top: 'top',
	            min: 0,
	            max: 5,
	            seriesIndex: 0,
	            calculable: true,
	            inRange: {
	                color: ['blue', 'blue', 'green', 'yellow', 'red']
	            }
	        },
	        series: [{
	            type: 'heatmap',
	            coordinateSystem: 'bmap',
	            data: points,
	            pointSize: 5,
	            blurSize: 6
	        }]
		});
	}
})(jQuery);