(function($) {
	var lastSearch = "";
	$('#searchAll_btn').on('click', function() {
		var searchVal = $('#search_input').val();
		if (searchVal != "") {
			behaviorPredictAjax(searchVal, true);
		}
	});
	$('#saveResult_btn').on('click', function() {
		var searchVal = $('#search_input').val();
		if ($('#result').find('.table').length) {
			$('#result').find('.table').tableExport({
				filename: "车辆："+lastSearch+"的预测结果_%YY%-%MM%-%DD%保存",
				format: "xls",
				cols:"1,2,3,4",
			});
		} else {
			$('#result').html("请查询再保存");
		}

	});
	$('#data').find('.open-box').find('.box-close').on('click',function(){
		$('#data').find('.open-box').hide();
		return false;
	});
	
	function readTableFrame(data,data_length){
		var html="",data_length=data_length || 10;
			html+="<table class='table'>";
			html+="<thead><tr><th class='text-center'>车牌号</th><th class='text-center'>预测地点</th><th class='text-center'>可能时间</th><th class='text-center'>预测类型</th></tr></thead>";
			html+="<tbody>";
			for(var i=0;i<data_length;i++){
				html+="<tr>";
				html+="<td>"+data[i].plate_no+"</td>";
				html+="<td>"+data[i].cross_name+"</td>";
				html+="<td>"+data[i].cross_date+"</td>";
				html+="<td>"+data[i].alert_type+"</td>";
				html+="</tr>";
			}
			html+="</tbody>";
			html+="<table>";
		return html;
	}
	function behaviorPredictAjax(plateNo, isAll) {
		$.ajax({
			type : "get",
			async : false,
			url : "behaviorPredict?plateNo=" + plateNo,
			success : function(data) {
				console.log(data);
				if (data.code === 200) {
					if (data.data === "null") {
						$('#result').html('没有查询到结果');
					} else {
						lastSearch = plateNo;
						$('#result').html(readTableFrame(data.data,isAll ? data.data.length : "")).mCustomScrollbar({
							axis:"y", theme:"my-theme"
						});
					}
				}
			},
			error : function(err) {
				console.log("请求出错----" + err);
			}
		});
	}

})(jQuery);
