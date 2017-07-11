(function($){
	$('#search_btn').on('click',function(){
		var plate_no=$('#plate_no').val();
		if(plate_no !== ""){
			 $.ajax({  
			        type: "get",  
			        async: false,  
			        url: "nightActiveAnalysis?plateNo="+plate_no,
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
			        url: "nightActiveAnalysis?plateNo=",
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
		return false;
	});
	function readTableFrame(data){
		var html="";
		html+="<table class='table'>";
		html+="<thead><tr><th>车牌号码</th><th>日期</th><th>07:00-19:00的过车次数</th><th>19:00-24:00,00:00-07:00的过车次数</th><th>是否为昼伏夜出类型</th></tr></thead>";
		html+="<tbody>";
		for(var i=0;i<data.length;i++){
			html+="<tr>";
			html+="<td>"+data[i].plate_no+"</td>";
			html+="<td>"+data[i].cross_date+"</td>";
			html+="<td>"+data[i].day_cross_cnt+"</td>";
			html+="<td>"+data[i].night_cross_cnt+"</td>";
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