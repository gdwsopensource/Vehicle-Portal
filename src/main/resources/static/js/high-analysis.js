(function($){
	$('#search_btn').on('click',function(){
		var  searchTime=$('#search').val();
			 searchTime=$.trim(searchTime);
			 console.log(searchTime);
		 if(searchTime !== ""){
			 $.ajax({  
			        type: "get",  
			        async: false,  
			        url: "http://localhost:8082/highFrequencyAnalysis?searchTime="+searchTime,  
			        dataType: "jsonp",  
			        jsonp:"cb",
			        success: function(data){
			        	var data=JSON.parse(data);
			        	console.log(data);
			        	if(data.code=== 200){
			        		if(data.data==="null"){
			        			$('#result').html('没有查询到结果~');
			        		}else{
			        			$('#result').html(readTableFrame(data.data,searchTime));
			        			// 跳转
			        			$('#result').find('.table').find('tbody').on('click','tr',function(){
			        				var crossTime=$(this).attr('data-crossTime');
			        				var plateNo=$(this).attr('data-plateNo');
			        				window.location.href="/behavior-analysis?crossTime="+crossTime+"&plateNo="+plateNo;	
			        			});
			        			
			        		}
			        	}
			        },
			        error: function(err){  
			            console.log("请求出错----"+err);
			        }
			 });
		}
	});
	
	function readTableFrame(data,time){
		var html="";
			html+="<table class='table'>";
			html+="<thead><tr><th>车牌号</th><th>预警次数</th><th>预警类型</th></tr></thead>";
			html+="<tbody>";
			for(var i=0;i<data.length;i++){
				html+="<tr data-plateNo="+data[i].car_plateNo+" data-crossTime="+time+">";
				html+="<td>"+data[i].car_plateNo+"</td>";
				html+="<td>"+data[i].warning_total+"</td>";
				html+="<td>"+data[i].warning_type+"</td>";
				html+="</tr>";
			}
			html+="</tbody>";
			html+="</table>";
			return html;
	}
})(jQuery);