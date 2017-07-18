(function($){
	$('#search_btn').on('click',function(){
		var plate_no=$('#plate_no').val();
		if(plate_no !== ""){
				 $.ajax({  
				        type: "get",  
				        async: false,  
				        url: "searchFakePlateCar?plateNo="+plate_no,  
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
				        url: "searchFakePlateCarALL",  
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
		html+="<thead><tr><th>车牌号码</th><th>日期</th><th>是否为假套牌车</th></tr></thead>";
		html+="<tbody>";
		for(var i=0;i<data.length;i++){
			html+="<tr>";
			html+="<td>"+data[i].plate_no+"</td>";
			html+="<td>"+data[i].cross_date+"</td>";
			html+="<td>"+data[i].fake_plate_type+"</td>";	
			html+="</tr>";
		}
		html+="</tbody>";
		html+="</table>";
		return html;
	}
})(jQuery);