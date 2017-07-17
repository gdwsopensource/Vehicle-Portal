(function($){
	$('#search_btn').on('click',function(){
		var startTime=$('#startTime').val();
		var endTime=$('#endTime').val();
		var crossName=$('#cross_name').val();
		if(startTime !== "" && endTime !=null){
			if(crossName !== ""){
				 $.ajax({  
				        type: "get",  
				        async: false,  
				        url: "highFrequencyAnalysisAccrodingCrossName?startTime="+startTime+"&endTime="+endTime+"&crossName="+crossName,  
				        success: function(data){
				        	console.log(data);
				        	if(data.code === 200){
				        		if(data.data === "null"){
				        			$('#result').html('没有查询到结果~');
				        		}else{
				        			$('#result').html(readTableFrameCrossName(data.data));
				        		}
				        	}
				        },
				        error:function(err){
				        	console.log("请求出错----"+err);
				        }
				 });
			}else{
				$.ajax({  
				        type: "get",  
				        async: false,  
				        url: "highFrequencyAnalysis?startTime="+startTime+"&endTime="+endTime,  
				        success: function(data){
				        	console.log(data);
				        	if(data.code === 200){
				        		if(data.data === "null"){
				        			$('#result').html('没有查询到结果~');
				        		}else{
				        			$('#result').html(readTableFrameAll(data.data));
				        		}
				        	}
				        },
				        error:function(err){
				        	console.log("请求出错----"+err);
				        }
				 });
			}
		}
		return false;
	});
	function readTableFrameAll(data){
		var html="";
		html+="<table class='table'>";
		html+="<thead><tr><th>卡口名称</th><th>车牌号</th><th>预警次数</th><th>预警类型</th></tr></thead>";
		html+="<tbody>";
		for(var i=0;i<data.length;i++){
				html+="<tr>";
				html+="<td>"+data[i].cross_name+"</td>";
				html+="<td>"+data[i].car_plateNo+"</td>";
				html+="<td>"+data[i].warning_total+"</td>";
				html+="<td>"+data[i].warning_type+"</td>"
				html+="</tr>";	
		}
		html+="</tbody>";						
		html+="</table>";
		return html;
	}
	function readTableFrameCrossName(data){
		var html="";
		html+="<table class='table'>";
		html+="<thead><tr><th>车牌号</th><th>预警次数</th><th>预警类型</th></tr></thead>";
		html+="<tbody>";
		for(var i=0;i<data.length;i++){
				html+="<tr>";
				html+="<td>"+data[i].car_plateNo+"</td>";
				html+="<td>"+data[i].warning_total+"</td>";
				html+="<td>"+data[i].warning_type+"</td>"
				html+="</tr>";	
		}
		html+="</tbody>";						
		html+="</table>";
		return html;
	}
	
	
})(jQuery);