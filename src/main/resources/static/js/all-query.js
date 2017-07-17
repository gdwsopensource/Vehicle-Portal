(function() {

	// 初始化结果栏的高度
	var AllResultH = parseInt($(".container .content").height()) - parseInt($(".container .content .all-query .all-search").height());
	console.log(AllResultH);
	$(".all-result").css({
		'height':AllResultH,
		'top':parseInt($(".container .content .all-query .all-search").height())
	});
	$(".all-result-box").css({
		'height':parseInt($(".all-result").height())-parseInt($(".all-result-desc").height())
	});

	// 初始化预警类型和车辆类型的下拉列表项
	var alertTypeArr = [ "", "多次违章", "未年检", "重点关注" ];
	var plateTypeArr = [ "", "小型汽车", "小型自动挡汽车", "中型客车", "大型货车", "大型客车", "牵引车",
			"城市公交车" ];
	var alertTypeOption = "";
	for (var i = 0; i < alertTypeArr.length; i++) {
		alertTypeOption += ("<option value='" + alertTypeArr[i] + "'>"
				+ alertTypeArr[i] + "</option>");
	}
	$("#alert-type").append(alertTypeOption);
	var plateTypeOption = "";
	for (var i = 0; i < plateTypeArr.length; i++) {
		plateTypeOption += ("<option value='" + plateTypeArr[i] + "'>"
				+ plateTypeArr[i] + "</option>");
	}
	$("#plate-type").append(plateTypeOption);

	// 查询请求
	$("#search-btn").on(
			'click',
			function() {
				var crossName = $("#cross-name").val();
				var plateNo = $("#plate-no").val();
				var startTime = $("#start-time>input").val();
				var endTime = $("#end-time>input").val();
				var alertType = $("#alert-type").val();
				var plateType = $("#plate-type").val();
				console.log(crossName, plateNo, startTime, endTime, alertType,
						plateType);
				// 查询请求前约束查询条件
				var dayStartTime = new Date(startTime).getTime();
				var dayEndTime = new Date(endTime).getTime();
				if (!($("#start-time>input").val() && $("#end-time>input")
						.val())) {
					$(".all-result-box")
							.html("<div class='msg'>请选择起始时间和结束时间</div>")
				} else if (dayStartTime > dayEndTime) {
					$(".all-result-box").html(
							"<div class='msg'>起始时间应大于结束时间，请重新选择</div>");
				} else {
					allQuery(crossName, plateNo, startTime, endTime, alertType,
							plateType);
				}
			});

	// 查询ajax
	function allQuery(crossName, plateNo, startTime, endTime, alertType,
			plateType) {
		$
				.ajax({
					type : "get",
					async : false,
					url : "allQuery",
					data : {
						crossName : crossName,
						plateNo : plateNo,
						startTime : startTime,
						endTime : endTime,
						alertType : alertType,
						plateType : plateType
					},
					success : function(data) {
						if (data.code === 200) {
							if (data.data == "null") {
								$(".all-result-box").html(
										"<div class='msg'>没有查到该条件的结果</div>");
							} else {
								var tbodyStr = "";
								for (var i = 0; i < data.total; i++) {
									tbodyStr += ("<tr>" + "<td>"
											+ data.data[i].alertTime + "</td>"
											+ "<td>" + data.data[i].plateNo
											+ "</td>" + "<td>"
											+ data.data[i].plateType + "</td>"
											+ "<td>" + data.data[i].alertType
											+ "</td>" + "<td>"
											+ data.data[i].crossName + "</td>"
											+ "<td>"
											+ data.data[i].crossDirection
											+ "</td>" + "</tr>");
								}
								$(".all-result-box")
										.html(
												"<table class='table'><thead><tr><th>通过时间</th><th>车牌</th><th>车辆类型</th><th>预警类型</th><th>卡口</th><th>驶向</th></tr></thead><tbody>"
														+ tbodyStr
														+ "</tbody></table>");
							}

						}
					},
					error : function(err) {
						console.log("请求出错----" + err);
					}
				});
	}
	//保存
	$('#save-btn').on('click', function() {
		if ($('.table').length) {
			$('.table').tableExport({
				filename : "综合查询结果_%YY%-%MM%-%DD%保存",
				format : "xls",
				cols : "1,2,3,4,5,6",
			});
		} else {
			$(".all-result-box").html(
			"<div class='msg'>请查询再保存</div>");
		}

	});


})(jQuery);