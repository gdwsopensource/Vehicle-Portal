var lastSearch="";
(function($){
	$('#searchAll_btn').on('click',function(){
		var searchVal=$('#search_input').val();
		if(searchVal != ""){
			behaviorPredictAjax(searchVal,true);
		}
	});
	$('#saveResult_btn').on('click',function(){
		var searchVal=$('#search_input').val();
		if($('.table').length){
			$('.table').tableExport({
				filename: "车辆："+lastSearch+"的预测结果_%YY%-%MM%-%DD%保存",
				format: "xls",
				cols:"1,2,3",
			});
		}else{
			$('#data').find('.box').find('.result').html("请查询再保存");
		}
		
	});
	function readTableFrame(data,data_length){
		var html="",data_length=data_length || 10;
			html+="<table class='table'>";
			html+="<thead><tr><th>车牌号</th><th>预测地点</th><th>可能时间</th></tr></thead>";
			html+="<tbody>";
			for(var i=0;i<data_length;i++){
				html+="<tr>";
				html+="<td>"+data[i].plate_no+"</td>";
				html+="<td>"+data[i].cross_name+"</td>";
				html+="<td>"+data[i].cross_time+"</td>";
				html+="</tr>";
			}
			html+="</tbody>";
			html+="<table>";
		return html;
	}
	function behaviorPredictAjax(plateNo,isAll){
		$.ajax({  
	        type: "get",  
	        async: false,  
	        url: "http://localhost:8082/behaviorPredict?plateNo="+plateNo,  
	        dataType: "jsonp",  
	        jsonp:"cb",
	        success:function(data){
	        	var data=JSON.parse(data);
	        	console.log(data);
	        	if(data.code === 200){
	        		if(data.data === "null"){
	        			$('#data').find('.box').find('.result').html('没有查询到结果')
	        		}else{
	        			lastSearch=plateNo;
	        			$('#data').find('.box').find('.result').html(readTableFrame(data.data,isAll?data.data.length:""));
	        		}
	        	}				        	
	        },
	        error: function(err){  
	            console.log("请求出错----"+err);
	        }
		});
	}

})(jQuery);
