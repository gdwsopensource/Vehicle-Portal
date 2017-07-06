(function($){
	$('#search_btn').on('click',function(){
		var searchVal=$('#search_input').val();
		if(searchVal != ""){
			$.ajax({  
		        type: "get",  
		        async: false,  
		        url: "http://localhost:8082/behaviorPredict?plateNo="+searchVal,  
		        dataType: "jsonp",  
		        jsonp:"cb",
		        success:function(data){
		        	var data=JSON.parse(data);
		        	console.log(data);
		        	if(data.code === 200){
		        		if(data.data === "no data"){
		        			$('#data').find('.box').find('.result').html('没有查询到结果~')
		        		}else{
		        			$('#data').find('.box').find('.result').html(readTableFrame(data.data));
		        		}
		        	}				        	
		        },
		        error: function(err){  
		            console.log("请求出错----"+err);
		        }
			});
		}
	});
	function readTableFrame(data,data_length){
		var html="",data_length=data_length || 10;
			html+="<table class='table'>";
			html+="<thead><tr><td>预测地点</td><td>可能时间</td><td>操作</td></tr></thead>";
			html+="<tbody>";
			for(var i=0;i<data_length;i++){
				html+="<tr>";
				html+="<td>"+data[i].cross_name+"</td>";
				html+="<td>"+data[i].cross_time+"</td>";
				html+="<td>查看轨迹</td>";
				html+="</tr>";
			}
			html+="</tbody>";
			html+="<table>";
		return html;
	}
})(jQuery);