(function($){
	$('#search_btn').on('click',function(){
		var startTime=$('#startTime').val();//开始时间
		var endTime=$('#endTime').val(); //结束时间
		 if(startTime !== "" && endTime !==""){
			 $.ajax({  
			        type: "get",  
			        async: false,  
			        url: "http://localhost:8082/highFrequencyAnalysis?startTime="+startTime+"&endTime="+endTime,  
			        dataType: "jsonp",  
			        jsonp:"cb",
			        success: function(data){
			        	console.log(data);
			        },
			        error:function(err){
			        	console.log("请求出错----"+err);
			        }
			 });
		 }
		return false;
	});
	function readTableFrame(data){
		var html="";
		html+="<table class='table'>";
		html+="<thead><tr><th>车牌号</th><th>时间</th><th>初次入城类型</th></tr></thead>";
		html+="<tbody>";
		for(var i=0;i<data.length;i++){
			html+="<tr>";
			html+="<td>"+data[i].car_plateNo+"</td>";
			html+="<td>"+data[i].cross_time+"</td>";
			if(data[i].arrival_type === 0){
				html+="<td>普通初次入城</td>";
			}else{
				html+="<td></td>";
			}			
			html+="</tr>";
		}
		html+="</tbody>";
		html+="</table>";
	}
	
	
	
})(jQuery);