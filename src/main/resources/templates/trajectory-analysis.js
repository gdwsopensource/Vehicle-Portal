(function($) {
	// 地图的高度扣除掉上方搜索高度44px
	$("#map").css("height", parseInt($("#map").css("height")) - 44);
	// 起始日期设置
	// 此处调取后台
	// 绑定车牌改变事件
	var startDate = "2017-06-01";
	var endDate = "2017-06-07";
	var minDate = "2016-06-01";
	var maxDate = "2017-06-29";
	var defplantNo = "粤AD736T";
	$(document).keydown(
			function(event) {
				var e = event || window.event;
				var k = e.keyCode || e.which;
				if (k == 13) {
					var dayStart = $("#calendar-start>input").val();
					var dayEnd = $("#calendar-end>input").val();
					var plateNo = $("#plateno-input").val();
					var dayStartTime = new Date(dayStart).getTime();
					var dayEndTime = new Date(dayEnd).getTime();
					if (dayStartTime > dayEndTime) {
						alert("起始时间应大于结束时间，请重新选择");
					} else {
						trankAnalysisOnPlateNo(plateNo, dayStart, dayEnd);

					}
				} else if (k == 72) {
					alert("轨迹分析帮助指南：" + "\n输入车牌号和起始日期后，点查询或按下enter键查询"
							+ "\n鼠标移到卡口汽车图标显示车辆与该卡口信息"
							+ "\n车辆图标按途径概率低中高分别显示黄橙红色"
							+ "\n点击轨迹线查看车辆轨迹，点保存结果可下载结果")
				}
			});
	$("#trajectort-analysis-search-btn").on('click', function() {
		var dayStart = $("#calendar-start>input").val();
		var dayEnd = $("#calendar-end>input").val();
		var plateNo = $("#plateno-input").val();
		var dayStartTime = new Date(dayStart).getTime();
		var dayEndTime = new Date(dayEnd).getTime();
		if (dayStartTime > dayEndTime) {
			alert("起始时间应大于结束时间，请重新选择");
		} else {
			trankAnalysisOnPlateNo(plateNo, dayStart, dayEnd);

		}
	});
	$("#calendar-start>input").attr(
			"onclick",
			"WdatePicker({minDate:'" + minDate + "',maxDate:'" + maxDate
					+ "'})");
	$("#calendar-end>input").attr(
			"onclick",
			"WdatePicker({minDate:'" + minDate + "',maxDate:'" + maxDate
					+ "'})");
	$("#calendar-start>input").val(startDate);
	$("#calendar-end>input").val(endDate);
	$("#plateno-input").val(defplantNo);
	// $("#plateno-input").on('keydown', changeCale);
	// $("#plateno-input").on('change', changeCale);

	trankAnalysisOnPlateNo(defplantNo, startDate, endDate);
	// 初始化地图

	function initMap(data) {
		var dataLen = data.data.length;
		// 格式化轨迹线数据
		var lines = [];
		for (var i = 0; i < dataLen; i++) {
			lines[i] = [];
			lines[i][0] = data.data[i].lng;
			lines[i][1] = data.data[i].lat;
		}

		// 格式化卡口数据
		var crossArr = [];
		var lowCount = 0.1 * dataLen;
		var highCount = 0.2 * dataLen;
		var proOne = (1 / dataLen * 100).toFixed(2);
		var dayStart = new Date($("#calendar-start>input").val()).getTime();
		var dayEnd = new Date($("#calendar-end>input").val()).getTime();
		var dayOne = (1000 * 60 * 60 * 24 / (dayEnd - dayStart + 1000 * 60 * 60 * 24))
				.toFixed(4);
		for (var i = 0; i < dataLen; i++) {
			var index = parseInt(data.data[i].crossId);
			if (crossArr[index]) {
				crossArr[index].count++;
				crossArr[index].crossPro = (parseFloat(proOne) * crossArr[index].count)
						.toFixed(2);
				crossArr[index].crossProDay = (parseFloat(dayOne) * crossArr[index].count)
						.toFixed(2);
				if (crossArr[index].count > lowCount) {
					crossArr[index].symbol = 'image://../image/carorange.png';
					if (crossArr[index].count > highCount) {
						crossArr[index].symbol = 'image://../image/carred.png';
					}
				}
			} else {
				crossArr[index] = {
					count : 1,
					crossId : data.data[i].crossId,
					crossName : data.data[i].crossName,
					crossPro : proOne,
					crossProDay : parseFloat(dayOne).toFixed(2),
					value : [ data.data[i].lng, data.data[i].lat ],
					symbol : 'image://../image/caryellow.png',
					symbolSize : 20,
				};
			}
		}

		// 地图参数设置
		var dom_map = document.getElementById('map');
		var myChart_map = echarts.init(dom_map);
		var option_map = null;
		option_map = {
			title : {
				text : '车辆轨迹图',
				textStyle : {
					color : '#fff'
				},
				top : 10,
				left : 10
			},
			bmap : {
				center : [ 113.366286, 23.130748 ], // 后台返回后动态设置成第一个出现的地方或最高频率的地方
				zoom : 14,
				roam : true,
				mapStyle : { // 设置的地图的样式
					styleJson : [ {
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
					} ]
				}
			},
			series : [ {
				type : 'lines',
				zlevel : 2,
				symbol : [ 'none', 'arrow' ],
				symbolSize : 10,
				effect : {
					show : true,
					constantSpeed : 100,
					trailLength : 0,
					symbol : 'image://../image/carwhite.png',
					symbolSize : 20,
					loop:true
				},
				coordinateSystem : 'bmap',
				data : [ {
					coords : lines
				} ],
				polyline : true,
				lineStyle : {
					normal : {
						color : 'yellow',
						opacity : 0.5,
						width : 3
					}
				}
			}, {
				type : 'scatter',
				coordinateSystem : 'bmap',
				data : crossArr
			} ]
		}

		myChart_map.setOption(option_map);
		myChart_map.on('click', function(params) {
			if (params.seriesType == 'lines') {
				$("#data .title").html(
						"车牌：" + data.plateNo + " 类型：" + data.plateType + " 预警："
								+ data.alertType);
				$("#data .box table tbody").empty();
				var tbodyStr = "";
				for (var i = 0; i < dataLen; i++) {
					tbodyStr += ("<tr>" + "<td>" + data.data[i].alertTime
							+ "</td>" + "<td>" + data.data[i].crossName
							+ "</td>" + "<td>" + data.data[i].crossDirection
							+ "</td>" + "</tr>");
				}
				$("#data .box table tbody").append(tbodyStr);
				$("#data").show();
			}
		})
		myChart_map.on('mouseover', function(params) {
			if (params.seriesType == 'scatter') {
				$(".cross_info_box>.cross_name").html(
						"卡口名称：" + params.data.crossName);
				$(".cross_info_box>.pass_chance").html(
						"途经频率：" + params.data.crossPro + "%");
				$(".cross_info_box>.day_count").html(
						"日均频次：" + params.data.crossProDay);
				var crossInfoBoxW = $(".cross_info_box").width();
				var contentW = $(".content").width();
				if (params.event.offsetX > (contentW / 2)) {
					$(".cross_info_box").css({
						"top" : params.event.offsetY,
						"left" : params.event.offsetX - crossInfoBoxW - 15
					});
				} else {
					$(".cross_info_box").css({
						"top" : params.event.offsetY,
						"left" : params.event.offsetX + 15
					});
				}
				$(".cross_info_box").show();
			}
		})
		myChart_map.on('mouseout', function(params) {
			if (params.seriesType == 'scatter') {
				$(".cross_info_box").hide();
			}
		});
		// 绑定保存结果按钮事件
		$('#data .save').on(
				'click',
				function() {
					if ($('.table').length) {
						$('.table').tableExport(
								{
									filename : "车辆："
											+ $("#plateno-input").val() + "从"
											+ $("#calendar-start>input").val()
											+ "到"
											+ $("#calendar-end>input").val()
											+ "的轨迹分析结果_%YY%-%MM%-%DD%保存",
									format : "xls",
									cols : "1,2,3",
								});
					} else {

					}
				});
	}

	function trankAnalysisOnPlateNo(plateNo, startTime, endTime) {
		$.ajax({
			type : "get",
			async : false,
			url : "trankAnalysisOnPlateNo",
			data : {
				plateNo : plateNo,
				startTime : startTime,
				endTime : endTime
			},
			success : function(data) {
				if (data.code === 200) {
					if (data.data == "null") {
						alert("没有查到在该日期内该车辆的通过卡口记录");
					} else {
						initMap(data);
					}

				}

			},
			error : function(err) {
				console.log("请求出错----" + err);
			}
		})
	}
	/**
	 * function changeCale() { var dayStart = $("#calendar-start>input").val();
	 * var dayEnd = $("#calendar-end>input").val(); var plateNo =
	 * $("#plateno-input").val(); var dayStartTime = new
	 * Date(dayStart).getTime(); var dayEndTime = new Date(dayEnd).getTime(); if
	 * (dayStartTime > dayEndTime) { alert("起始时间应大于结束时间，请重新选择"); } else {
	 * trankAnalysisOnPlateNo(plateNo, dayStart, dayEnd); } };
	 */
})(jQuery);
