/*
 * File Name：BehaviorAnalysisOneDayController.java
 *
 * Copyrighe：copyright@2017 GZSW Company, All Rights Reserved
 *
 * Create Time: 2017年7月11日 下午2:03:05
 */
package com.gdws.vehicle.controller.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.gdws.vehicle.config.Systemconfigs;
import com.gdws.vehicle.utils.HttpClientUtils;

/**
 *
 * @author vous (shinena_deng@163.com)
 * @version 1.0, 2017年7月11日 下午2:03:05
 */
@RestController
public class allQueryController {
	@Autowired
	private Systemconfigs conf;

	@RequestMapping("allQuery")
	public JSONObject allQuery(String crossName, String plateNo, String startTime, String endTime, String alertType,
			String plateType) {
		String url = "http://" + conf.getDomain() + ":" + conf.getPort();
		return JSONObject.parseObject(HttpClientUtils.doGet(url + "/multipleQuery?crossName=" + crossName + "&plateNo="
				+ plateNo + "&startTime=" + startTime + "&endTime=" + endTime+"&alertType="+alertType+"&plateType="+plateType, null));
	}
}
