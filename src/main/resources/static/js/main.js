(function($) {
	/*if(window.sessionStorage){
		var ref=window.location.href;
		ref=ref.split('/')[1];
		console.log(ref);
		
		var portalNav_href = sessionStorage.getItem("portalNav_href" || "");
		var aArray = $('#aside').find('.item').find('.item-bar').find('a');
		for (var i = 0; i < aArray.length; i++) {
			var a=$('#aside').find('.item').find('.item-bar').find('a').eq(i);		
			if (a.attr("data-href") == portalNav_href) {
				a.addClass("active");
				a.parent().siblings('.item-bar').css('display','none');
				a.parent().css({
					'display' : 'block'
				});
			}
		}
	}
	$('#aside').find('.item').on('click','a',function(){
		if (window.sessionStorage) {
			sessionStorage.setItem("portalNav_href", $(this).attr("data-href"));
		}
	})*/
	//下拉菜单
	$('#aside').on('click', '.item', function() {
		if($(this).find('.item-bar').css('display') === 'none') {
			$(this).find('.item-bar').show();
		} else {
			$(this).find('.item-bar').hide();
		}
	})
	
	
	
	//滚动table
	$('#data').find('.box').mCustomScrollbar({
		axis:"y", theme:"my-theme"
	});
	$('#data').on('click','.close',function(){
		$('#data').hide();
	});
	//跳转到车辆分析
	/*$('#carData').find('.box').find('.table').on('click','tr',function(){
		var carId=$(this).attr('data-carId');
		window.location.href='/behavior-analysis.html?carId='+carId;
	});*/
	
	
	
	//地图
	var dom_map = document.getElementById('map');
	var myChart_map = echarts.init(dom_map);
	var option_map = null;
	option_map={
		title: {
			text: '交通概览图',
			textStyle: {
				color: '#fff'
			},
			top: 10,
			left: 10,
		},
		//设置右侧拦的下标
		legend: {
			data: ['严重警告', '中度警告', '低度警告'],
			textStyle: {
				color: '#fff'
			},
			orient: 'vertical',
			right: '2%',
			bottom: '5%'
		},
		bmap: {
			center: [113.366286, 23.130748], //113.366286,23.130748 天河
			zoom: 14,
			roam: true,
			mapStyle: { //设置的地图的样式
				//style:'dark'
				styleJson: [{
						'featureType': 'water',
						'elementType': 'all',
						'stylers': {
							'color': '#08233e'
						}
					},
					{
						'featureType': 'land',
						'elementType': 'all',
						'stylers': {
							'color': '#08233e'
						}
					},
					{
						'featureType': 'railway',
						'elementType': 'all',
						'stylers': {
							'visibility': 'off'
						}
					},
					{
						'featureType': 'highway', //高速
						'elementType': 'geometry',
						'stylers': {
							'color': '#227eda',
							'weight': '0.1'
						}
					},
					{
						'featureType': 'highway',
						'elementType': 'labels',
						'stylers': {
							'color': '#ffffff'
						}
					},
					{
						'featureType': 'highway',
						'elementType': 'labels.text.stroke',
						'stylers': {
							'color': 'transparent'
						}
					},
					{
						'featureType': 'arterial', //城市主路
						'elementType': 'geometry',
						'stylers': {
							'color': '#227eda',
							'weight': '0.1'
						}
					},
					{
						'featureType': 'arterial',
						'elementType': 'labels',
						'stylers': {
							'color': '#ffffff'
						}
					},
					{
						'featureType': 'arterial',
						'elementType': 'labels.text.stroke',
						'stylers': {
							'color': 'transparent'
						}
					},
					{
						'featureType': 'poi',
						'elementType': 'all',
						'stylers': {
							'visibility': 'off'
						}
					},
					{
						'featureType': 'green',
						'elementType': 'all',
						'stylers': {
							'visibility': 'off'
						}
					},
					{
						'featureType': 'subway',
						'elementType': 'all',
						'stylers': {
							'visibility': 'off'
						}
					},
					{
						'featureType': 'manmade',
						'elementType': 'all',
						'stylers': {
							'color': '#08233e'
						}
					},
					{
						'featureType': 'local',
						'elementType': 'all',
						'stylers': {
							'color': '#08233e'
						}
					},
					{
						'featureType': 'boundary',
						'elementType': 'all',
						'stylers': {
							'color': '#fefefe'
						}
					},
					{
						'featureType': 'building',
						'elementType': 'all',
						'stylers': {
							'color': '#08233e'
						}
					},
					{
						'featureType': 'label',
						'elementType': 'labels.text.fill',
						'stylers': {
							'color': '#ffffff',
							'weight': '0.1'
						}
					},
					{
						'featureType': 'label',
						'elementType': 'labels.text.stroke',
						'stylers': {
							'color': 'transparent',
							'weight': '0.1'
						}
					}
				]
			}

		},
		tooltip: {
			trigger: 'item'
		},
		
	}
	if(option_map && typeof option_map ==="object"){
		myChart_map.setOption(option_map);
		var ERR_OK=0;
		$.getJSON('../data/bayonet.json',function(res){
			if(ERR_OK === res.code){
				console.log(res.data[1].data)
				myChart_map.setOption({
					series: [
						{
							//设置路标
							name: 'checkpoint',
							type: 'scatter',
							coordinateSystem: 'bmap',
							data: [
								{
									name: '天河',
									value: [113.366286, 23.132748]
								}
							],
							symbol: 'image://../image/addr.png',
							symbolSize: 20
						},
						{
							name: '严重警告', //严重预警
							type: 'effectScatter',
							coordinateSystem: 'bmap',
							data: res.data[1].data,
							symbol: 'circle',
							showEffectOn: 'render',
							rippleEffect: {
								brushType: 'stroke'
							},
							itemStyle: {
								normal: {
									color: '#e60012',
									shadowBlur: 10,
									shadowColor: '#333'
								}
							},
							zlevel: 1
						},
						{
							name: '中度警告', //中度预警
							type: 'effectScatter',
							coordinateSystem: 'bmap',
							data: res.data[0].data,
							symbol: 'circle',
							showEffectOn: 'render',
							rippleEffect: {
								brushType: 'stroke'
							},
							itemStyle: {
								normal: {
									color: '#ff8520',
									shadowBlur: 10,
									shadowColor: '#333'
								}
							},
						},
						{
							name: '低度警告', //低度预警
							type: 'effectScatter',
							coordinateSystem: 'bmap',
							data: res.data[2].data,
							symbol: 'circle',
							showEffectOn: 'render',
							rippleEffect: {
								brushType: 'stroke'
							},
							itemStyle: {
								normal: {
									color: '#ffed27',
									shadowBlur: 10,
									shadowColor: '#333'
								}
							}
						}
					]
				})
					
				
			}
		})
	}
	
	
	/*myChart.setOption(option = {
		title: {
			text: '交通概览图',
			textStyle: {
				color: '#fff'
			},
			top: 10,
			left: 10,
		},
		//设置右侧拦的下标
		legend: {
			data: ['严重警告', '中度警告', '低度警告'],
			textStyle: {
				color: '#fff'
			},
			orient: 'vertical',
			right: '2%',
			bottom: '5%'
		},
		bmap: {
			center: [113.366286, 23.130748], //113.366286,23.130748 天河
			zoom: 14,
			roam: true,
			mapStyle: { //设置的地图的样式
				//style:'dark'
				styleJson: [{
						'featureType': 'water',
						'elementType': 'all',
						'stylers': {
							'color': '#08233e'
						}
					},
					{
						'featureType': 'land',
						'elementType': 'all',
						'stylers': {
							'color': '#08233e'
						}
					},
					{
						'featureType': 'railway',
						'elementType': 'all',
						'stylers': {
							'visibility': 'off'
						}
					},
					{
						'featureType': 'highway', //高速
						'elementType': 'geometry',
						'stylers': {
							'color': '#227eda',
							'weight': '0.1'
						}
					},
					{
						'featureType': 'highway',
						'elementType': 'labels',
						'stylers': {
							'color': '#ffffff'
						}
					},
					{
						'featureType': 'highway',
						'elementType': 'labels.text.stroke',
						'stylers': {
							'color': 'transparent'
						}
					},
					{
						'featureType': 'arterial', //城市主路
						'elementType': 'geometry',
						'stylers': {
							'color': '#227eda',
							'weight': '0.1'
						}
					},
					{
						'featureType': 'arterial',
						'elementType': 'labels',
						'stylers': {
							'color': '#ffffff'
						}
					},
					{
						'featureType': 'arterial',
						'elementType': 'labels.text.stroke',
						'stylers': {
							'color': 'transparent'
						}
					},
					{
						'featureType': 'poi',
						'elementType': 'all',
						'stylers': {
							'visibility': 'off'
						}
					},
					{
						'featureType': 'green',
						'elementType': 'all',
						'stylers': {
							'visibility': 'off'
						}
					},
					{
						'featureType': 'subway',
						'elementType': 'all',
						'stylers': {
							'visibility': 'off'
						}
					},
					{
						'featureType': 'manmade',
						'elementType': 'all',
						'stylers': {
							'color': '#08233e'
						}
					},
					{
						'featureType': 'local',
						'elementType': 'all',
						'stylers': {
							'color': '#08233e'
						}
					},
					{
						'featureType': 'boundary',
						'elementType': 'all',
						'stylers': {
							'color': '#fefefe'
						}
					},
					{
						'featureType': 'building',
						'elementType': 'all',
						'stylers': {
							'color': '#08233e'
						}
					},
					{
						'featureType': 'label',
						'elementType': 'labels.text.fill',
						'stylers': {
							'color': '#ffffff',
							'weight': '0.1'
						}
					},
					{
						'featureType': 'label',
						'elementType': 'labels.text.stroke',
						'stylers': {
							'color': 'transparent',
							'weight': '0.1'
						}
					}
				]
			}

		},
		tooltip: {
			trigger: 'item'
		},
		series: [
			{
				//设置路标
				name: 'checkpoint',
				type: 'scatter',
				coordinateSystem: 'bmap',
				data: [
					{
						name: '天河',
						value: [113.366286, 23.132748]
					}
				],
				symbol: 'image://../image/addr.png',
				symbolSize: 20
			},
			{
				name: '严重警告', //严重预警
				type: 'effectScatter',
				coordinateSystem: 'bmap',
				data: [{
					id: 20122,
					name: '天河1',
					value: [113.366281, 23.130748]
				}, {
					id: 20122,
					name: '天河2',
					value: [113.366246, 23.130248]
				}, {
					id: 20122,
					name: '天河5',
					value: [113.366276, 23.130758]
				}, {
					id: 20122,
					name: '天河6',
					value: [113.366186, 23.130728]
				}],
				symbol: 'circle',
				showEffectOn: 'render',
				rippleEffect: {
					brushType: 'stroke'
				},
				itemStyle: {
					normal: {
						color: '#e60012',
						shadowBlur: 10,
						shadowColor: '#333'
					}
				},
				zlevel: 1
			},
			{
				name: '中度警告', //中度预警
				type: 'effectScatter',
				coordinateSystem: 'bmap',
				data: [{
						id: 20122,
						name: '上海',
						value: [113.366287, 23.130742]
					},
					{
						id: 20122,
						name: '广州',
						value: [113.366186, 23.130148]
					}
				],
				symbol: 'circle',
				showEffectOn: 'render',
				rippleEffect: {
					brushType: 'stroke'
				},
				itemStyle: {
					normal: {
						color: '#ff8520',
						shadowBlur: 10,
						shadowColor: '#333'
					}
				},
			},
			{
				name: '低度警告', //低度预警
				type: 'effectScatter',
				coordinateSystem: 'bmap',
				data: [{
					id: 20122,
					name: '天河3',
					value: [113.366186, 23.130738]
				}, {
					id: 20122,
					name: '天河4',
					value: [113.366216, 23.130248]
				}],
				symbol: 'circle',
				showEffectOn: 'render',
				rippleEffect: {
					brushType: 'stroke'
				},
				itemStyle: {
					normal: {
						color: '#ffed27',
						shadowBlur: 10,
						shadowColor: '#333'
					}
				}
			}
		]
	});
	*/

})(jQuery);