(function($){
	$('#result').mCustomScrollbar({
		axis:"y", theme:"my-theme"
	});
	$('#startTime').datepicker({
		language: 'zh-CN',
		format: 'yyyy-mm-dd',
		startDate:'2016-06-01',
		autoHide:true
	});
	$('#endTime').datepicker({
		language: 'zh-CN',
		format: 'yyyy-mm-dd',
		autoHide:true
	});
	
	$('#search_btn').on('click',function(){
		var startTime=$('#startTime').val();//开始时间
		var endTime=$('#endTime').val(); //结束时间	
		console.log(startTime);
		console.log(endTime);
		 if(startTime !== "" && endTime !==""){
			 $.ajax({  
			        type: "get",  
			        async: false,  
			        url: "carFirstArrivalService?startTime="+startTime+"&endTime="+endTime,  
			        success: function(data){
			        	console.log(data);
			        	if(data.code === 200){
			        		if(data.data === null){
			        			$('#result').find('.result-data').html('没有查询到结果~');
			        		}else{
			        			$('#result').find('.result-data').html(readTableFrame(data.data));
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
		html+="<thead><tr><th class='text-center'>车牌号</th><th class='text-center'>时间</th><th class='text-center'>初次入城类型</th></tr></thead>";
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