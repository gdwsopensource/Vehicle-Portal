(function($){
	$('#search_btn').on('click',function(){
		var plateNo=$('#plate_no').val();
		var startTime=$('#startTime').val();
		var endTime=$('#endTime').val();
		if(startTime !== "" && endTime !==""){
			if(plate_no !== ""){
				 $.ajax({  
				        type: "get",  
				        async: false,  
				        url: "nightActivePlateAnalysis?startTime=" + startTime+"&endTime="+endTime+"&plateNo="+plateNo,
				        success: function(data){
				        	console.log(data);
				        	if(data.code === 200){
				        		if(data.data === "null"){
				        			$('#result').html('没有查询到结果~');
				        		}else{
				        			$('#result').html(readTableFrame(data.data));
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
				        url: "nightActiveAnalysis?startTime="+ startTime+"&endTime="+endTime,
				        success: function(data){
				        	console.log(data);
				        	if(data.code === 200){
				        		if(data.data === "null"){
				        			$('#result').html('没有查询到结果~');
				        		}else{
				        			$('#result').html(readTableFrame(data.data));
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
	function readTableFrame(data){
		var html="";
		html+="<table class='table'>";
		html+="<thead><tr><th>车牌号码</th><th>车辆类型</th><th>是否为昼伏夜出类型</th></tr></thead>";
		html+="<tbody>";
		for(var i=0;i<data.length;i++){
			html+="<tr>";
			html+="<td>"+data[i].plate_no+"</td>";
			html+="<td>"+data[i].plate_type+"</td>";
			if(data[i].night_active === 0){
				html+="<td>否</td>";
			}else if(data[i].night_active === 1){
				html+="<td>是</td>";
			}	
			html+="</tr>";
		}
		html+="</tbody>";
		html+="</table>";
		return html;
	}
})(jQuery);