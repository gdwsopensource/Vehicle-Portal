(function($) {
	// 地图样式
	var styleJson = [ {
		"featureType" : "land",
		"elementType" : "all",
		"stylers" : {
			"color" : "#444444",
			"visibility" : "on"
		}
	}, {
		"featureType" : "water",
		"elementType" : "all",
		"stylers" : {
			"color" : "#444444",
			"visibility" : "on"
		}
	}, {
		"featureType" : "building",
		"elementType" : "all",
		"stylers" : {
			"color" : "#444444",
			"visibility" : "on"
		}
	}, {
		"featureType" : "manmade",
		"elementType" : "all",
		"stylers" : {
			"color" : "#444444",
			"visibility" : "on"
		}
	}, {
		"featureType" : "poi",
		"elementType" : "all",
		"stylers" : {
			"visibility" : "off"
		}
	}, {
		"featureType" : "subway",
		"elementType" : "all",
		"stylers" : {
			"visibility" : "off"
		}
	}, {
		"featureType" : "highway",
		"elementType" : "geometry",
		"stylers" : {
			"color" : "#3d85c6"
		}
	}, {
		"featureType" : "arterial",
		"elementType" : "geometry",
		"stylers" : {
			"color" : "#3d85c6"
		}
	}, {
		"featureType" : "local",
		"elementType" : "geometry",
		"stylers" : {
			"color" : "#3d85c6"
		}
	}, {
		"featureType" : "green",
		"elementType" : "all",
		"stylers" : {
			"color" : "#444444"
		}
	}, {
		"featureType" : "railway",
		"elementType" : "all",
		"stylers" : {
			"color" : "#073763",
			"visibility" : "off"
		}
	}, {
		"featureType" : "highway",
		"elementType" : "labels.text.stroke",
		"stylers" : {
			"color" : "#ffffff"
		}
	}, {
		"featureType" : "arterial",
		"elementType" : "labels.text.stroke",
		"stylers" : {
			"color" : "#ffffff"
		}
	}, {
		"featureType" : "local",
		"elementType" : "labels.text.stroke",
		"stylers" : {
			"color" : "#ffffff"
		}
	} ];

	// 初始操作
	// 加载时高度自适应
	var tableH = parseInt($(".od-data-bottom").height())
			- parseInt($(".od-data-bottom-table").css('top'));
	$(".od-data-bottom-table").css('height', tableH);

	var odallH = parseInt($(".od-data-top").height())
			- parseInt($(".od-all").css('top'));
	$(".od-all").css('height', odallH);
	// 输入车牌号时的查询函数
	var lastSearch = "";
	searchAjax("粤AZ022J");

	// 绑定事件
	$("#searchAll_btn").on('click', function() {
		var plateNo = $("#search_input").val();
		// 过滤输入内容
		if (!plateNo.length) {
			$('.od-msg').html("请输入车牌号");
		} else if (plateNo.length < 5) {
			$('.od-msg').html("请输入至少5位的车牌号");
		} else {
			searchAjax(plateNo);
		}
	});
	$('#saveResult_btn').on('click', function() {
		if ($('.table-primary').length) {
			$('.table-primary').tableExport({
				filename : "车辆：" + lastSearch + "的OD分析结果_%YY%-%MM%-%DD%保存",
				format : "xls",
				cols : "1,2,3",
			});
		} else {
			$('.od-msg').html("请查询再保存");
		}
	});

	// 初始化地图
	function initMap(data) {
		// 格式化线条数据
		var coordsArr = dataToLines(data);

		// 地图参数设置
		var dom_map = document.getElementById('map');
		var myChart_map = echarts.init(dom_map);
		var option_map = null;
		option_map = {
			bmap : {
				center : [ 113.366286, 23.130748 ], // 后台返回后动态设置成第一个出现的地方或最高频率的地方
				zoom : 14,
				roam : true,
				mapStyle : { // 设置的地图的样式
					styleJson : styleJson
				}
			},
			series : [ {
				type : 'lines',
				zlevel : 2,
				symbol : [ 'none', 'arrow' ],
				symbolSize : 10,
				effect : {
					show : true,
					constantSpeed : 50,
					trailLength : 0,
					symbol : 'image://../image/carwhite.png',
					symbolSize : 15,
					loop : true
				},
				coordinateSystem : 'bmap',
				data : coordsArr,
				polyline : true,
				lineStyle : {
					normal : {
						color : 'yellow',
						opacity : 0.5,
						width : 3,
						type : 'solid'
					}
				}
			} ]
		}
		myChart_map.setOption(option_map);
		$(".map")
				.append('<div class="title-primary od-map-title">OD分析地图</div>');
		$(".map").append('<div class="od-map-label"></div>');
		// 绑定地图事件
		myChart_map.on('mouseover', function(params) {
			if (params.seriesType == 'lines') {
				$(".od-map-label").html(
						"<p>月份：" + params.data.crossMonth + "</p><p>出发卡口："
								+ params.data.originCrossName + "</p><p>目的卡口："
								+ params.data.destCrossName + "</p>");
			}
		});
		myChart_map.on('mouseout', function(params) {
			if (params.seriesType == 'lines') {
				$(".od-map-label").empty();
			}
		});
	}

	// 初始化总览饼状图
	function initAll(domId, data, title) {
		var dom_o = document.getElementById(domId);
		console.log(domId);
		if (domId == "od-all-opie") {
			var myChart_o = echarts.init(dom_o);
		} else if (domId == "od-all-dpie") {
			var myChart_d = echarts.init(dom_o);
		}
		var option_o = null;
		option_o = {
			title : {
				text : title,
				textStyle : {
					color : '#FFFFFF',
					fontSize : '14',
					fontWeight : 'normal'
				},
				x : 'left'
			},
			tooltip : {
				trigger : 'item',
				formatter : "{b}<br/>{d}% ({c})"
			},
			series : [ {
				type : 'pie',
				radius : '75%',
				center : [ '50%', '50%' ],
				data : data,
				itemStyle : {
					emphasis : {
						shadowBlur : 10,
						shadowOffsetX : 0,
						shadowColor : 'rgba(0, 0, 0, 0.5)'
					}
				},
				label : {
					normal : {
						show : false
					}
				},
				labelLine : {
					normal : {
						show : false
					}
				}
			} ]
		};
		//绑定屏幕横向拉伸饼图自适应事件
		if (domId == "od-all-opie") {
			myChart_o.setOption(option_o);
			$(window).on('resize',function(){
				myChart_o.resize();
				console.log(1);
			});
		} else if (domId == "od-all-dpie") {
			myChart_d.setOption(option_o);
			$(window).on('resize',function(){
				myChart_d.resize();
			});
		}
		
	}

	// 数据格式化成饼图数据
	function dataToPie(data) {
		var dataPieO = [];
		for (var i = 0; i < data.length; i++) {
			var isNew = true;
			for (var j = 0; j < dataPieO.length; j++) {
				if (dataPieO[j].name == data[i].originCrossName) {
					dataPieO[j].value++;
					isNew = false;
					continue;
				}
			}
			if (isNew) {
				dataPieO.push({
					name : data[i].originCrossName,
					value : 1
				})
			}
		}
		var dataPieD = [];
		for (var i = 0; i < data.length; i++) {
			var isNew = true;
			for (var j = 0; j < dataPieD.length; j++) {
				if (dataPieD[j].name == data[i].destCrossName) {
					dataPieD[j].value++;
					isNew = false;
					continue;
				}
			}
			if (isNew) {
				dataPieD.push({
					name : data[i].destCrossName,
					value : 1
				})
			}
		}
		return [ dataPieO, dataPieD ];
	}

	// 数据格式化成线条数据
	function dataToLines(data) {
		// 线太多乱，只显示最近的条
		if (data.length < 5) {
			var showLineCount = data.length;
		} else {
			var showLineCount = 5;
		}
		var coordsArr = [];
		var len = data.length;
		for (var i = 0; i < showLineCount; i++) {
			var dataItem = data[len - i - 1];
			coordsArr[i] = {};
			coordsArr[i].coords = [
					[ dataItem.origin_lng, dataItem.origin_lat ],
					[ dataItem.dest_lng, dataItem.dest_lat ] ];
			coordsArr[i].originCrossName = dataItem.originCrossName;
			coordsArr[i].destCrossName = dataItem.destCrossName;
			coordsArr[i].crossMonth = dataItem.crossMonth;
		}
		return coordsArr;
	}

	// 查询ajax
	function searchAjax(plateNo) {
		$
				.ajax({
					type : "get",
					url : "odanalysis",
					data : {
						plateNo : plateNo
					},
					success : function(data) {
						if (data.code === 200) {
							if (data.data == "null") {
								$('.od-msg').html("没有查到该车结果");
							} else if (data.data) {
								// 数据加载到饼状图
								initAll("od-all-opie", dataToPie(data.data)[0],
										"出发卡口比例");
								initAll("od-all-dpie", dataToPie(data.data)[1],
										"目的卡口比例");

								// 数据加载到线条地图
								initMap(data.data);

								// 数据加载到表格
								$('.od-msg').html(
										"车辆：" + data.plateNo + " 类型："
												+ data.plateType);
								lastSearch = plateNo;

								$(".table-primary").empty();
								var tbodyStr = "";
								for (var i = 0; i < data.data.length; i++) {
									tbodyStr += ("<tr>" + "<td>"
											+ data.data[i].crossMonth + "</td>"
											+ "<td>"
											+ data.data[i].originCrossName
											+ "</td>" + "<td>"
											+ data.data[i].destCrossName
											+ "</td>" + "</tr>");
								}
								$(".table-primary").html(
										"<thead><tr><th>月份</th><th>出发卡口</th><th>目的卡口</th></tr></thead><tbody>"
												+ tbodyStr + "</tbody>");
							}
						}
					},
					error : function(err) {
						$('.od-msg').html("请求出错");
					}
				});
	}
})(jQuery);