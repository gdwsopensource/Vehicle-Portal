(function($){
	// esc键关闭#data
    $(document).keydown(function (event) {
        var e = event || window.event;
        var k = e.keyCode || e.which;
        if (k == 27) {
            $("#data").hide();
        }
    });

    // 地址栏跳转时
    var jumpHref = location.pathname;
    var aObj = $('.item-bar > a');
    aObj.each(function (index, value) {
        if ($(this).attr("href") == jumpHref) {
            if (window.sessionStorage) {
                sessionStorage.setItem("portalNav", $(this).attr("nav-id"));
            }
        }
    });

    // 储存上次点击菜单
    if (window.sessionStorage) {
        var portalNav = sessionStorage.getItem("portalNav" || "");
        var aObj = $('.item-bar > a');
        aObj.each(function (index, value) {
            if ($(this).attr("nav-id") == portalNav) {
                $(this).addClass("active");
                $(this).parent().parent().find(".text").addClass("active");
                $(this).parent().css({
                    'display': 'block'
                });
            }
        });
    }
    $('.item-bar > a').click(function () {
        $('.item-bar > a').removeClass('active');
        $(this).addClass('active');
        if (window.sessionStorage) {
            sessionStorage.setItem("portalNav", $(this).attr("nav-id"));
        }
    });
    // 下拉菜单
    $('#aside').on('click', '.item', function () {
        if ($(this).find('.item-bar').css('display') === 'none') {
            $(this).find('.item-bar').show();
            $(this).find('.text').addClass("active");
        } else {
            $(this).find('.item-bar').hide();
            $(this).find('.text').removeClass("active");
        }
    });
	//滚动table
	$('#data').find('.box').mCustomScrollbar({
		axis:"y", theme:"my-theme"
	});
	//关闭弹窗
	$('#data').on('click','.close',function(){
		$('#data').hide();
	});
	//获取当前时间，格式YYYY-MM-DD
    Date.prototype.getNowFormatDate=function(time){
       var date = time || new Date();
       var seperator1 = "-";
       if(time){
       	var year =date.split('-')[0];
       	var month=date.split('-')[1];
       	if (month >= 1 && month <= 9){
               month = "0" + month;
           }
       	var strDate=date.split('-')[2];
       	if (strDate >= 0 && strDate <= 9){
               strDate = "0" + strDate;
           }
       }else{
           var year = date.getFullYear();
           var month = date.getMonth() + 1;
           var strDate = date.getDate();
           if (month >= 1 && month <= 9){
               month = "0" + month;
           }											//===>标准化 yyyy--mm--dd					
           if (strDate >= 0 && strDate <= 9){
               strDate = "0" + strDate;
           }
       }  
       var currentdate = year + seperator1 + month + seperator1 + strDate;
       return currentdate;
   }	
})(jQuery);