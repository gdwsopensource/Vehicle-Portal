(function($){
	$('#search_btn').on('click',function(){
		var startTime=$('#startTime').val();//开始时间
		var endTime=$('#endTime').val(); //结束时间
		 if(startTime !== "" && endTime !==""){
			 $.ajax({  
			        type: "get",  
			        async: false,  
			        url: "http://192.168.1.161:8082/carFirstArrivalService?startTime="+startTime+"&endTime="+endTime,  
			        dataType: "jsonp",  
			        jsonp:"cb",
			        success: function(data){
			        	var data=JSON.parse(data);
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
		return false;
	});
	function readTableFrame(data){
		var html="";
		html+="<table class='table'>";
		html+="<thead><tr><th>车牌号</th><th>时间</th><th>初次入城类型</th></tr></thead>";
		html+="<tbody>";
		for(var i=0;i<data.length;i++){
			html+="<tr>";
			html+="<td>"+data[i].plate_no+"</td>";
			html+="<td>"+data[i].cross_date+"</td>";
			html+="<td>"+data[i].arrival_type+"</td>";
			html+="</tr>";
		}
		html+="</tbody>";
		html+="</table>";
		return html;
	}
	
	
	
})(jQuery);