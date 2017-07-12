(function($) {
	var lastSearch = "";
	$("#data").show();
	$("#searchAll_btn")
			.on(
					'click',
					function() {
						var plateNo = $("#search_input").val();
						$
								.ajax({
									type : "get",
									async : false,
									url : "odanalysis",
									data : {
										plateNo : plateNo
									},
									success : function(data) {
										if (data.code === 200) {
											if (data.data == "null") {
												$('#data').find('.box').find(
														'.result').html(
														'没有查到该车结果');
												$("#data .title").html("OD分析");
											} else {
												lastSearch = plateNo;
												$("#data .title")
														.html(
																"车辆："
																		+ data.plateNo
																		+ " 类型："
																		+ data.plateType);
												var tbodyStr = "";
												for (var i = 0; i < data.data.length; i++) {
													tbodyStr += ("<tr>"
															+ "<td>"
															+ data.data[i].crossMonth
															+ "</td>"
															+ "<td>"
															+ data.data[i].originCrossName
															+ "</td>"
															+ "<td>"
															+ data.data[i].destCrossName
															+ "</td>" + "</tr>");
												}
												$('#data')
														.find('.box')
														.find('.result')
														.html(
																"<table class='table'><thead><tr><th>月份</th><th>出发卡口</th><th>目的卡口</th></tr></thead><tbody>"
																		+ tbodyStr
																		+ "</tbody></table>")
												$("#data .result").show();
											}
										}
									},
									error : function(err) {
										console.log("请求出错----" + err);
									}
								});
					});
	$('#saveResult_btn').on('click', function() {
		if ($('.table').length) {
			$('.table').tableExport({
				filename : "车辆：" + lastSearch + "的OD分析结果_%YY%-%MM%-%DD%保存",
				format : "xls",
				cols : "1,2,3",
			});
		} else {
			$('#data').find('.box').find('.result').html("请查询再保存");
		}

	});
})(jQuery);