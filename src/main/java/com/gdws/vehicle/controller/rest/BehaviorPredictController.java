/*
 * File Name：BehaviorPredictController.java
 *
 * Copyrighe：copyright@2017 GZSW Company, All Rights Reserved
 *
 * Create Time: 2017年7月11日 上午11:50:14
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
 * @version 1.0, 2017年7月11日 上午11:50:14
 */
@RestController
public class BehaviorPredictController {
	@Autowired
	private Systemconfigs conf;

	@RequestMapping("behaviorPredict")
	public JSONObject behaviorPredict(String plateNo) {
		String url = "http://" + conf.getDomain() + ":" + conf.getPort();
		return JSONObject.parseObject(HttpClientUtils.doGet(url + "/behaviorPredict?plateNo=" + plateNo, null));
	}
}
