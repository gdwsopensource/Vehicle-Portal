/*
 * File Name：RestController.java
 *
 * Copyrighe：copyright@2017 GZSW Company. All Rights Reserved
 *
 * Create Time: 2017年6月23日 上午11:17:53
 */
package com.gdws.vehicle.controller.rest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;

/**
 *
 * @author lcc (nplcclin@gmail.com)
 * @version 1.0, 2017年6月23日 上午11:17:53
 */
@RestController
public class ProxyController {
    @RequestMapping(value = {"data/test"}, method = RequestMethod.GET)
    public JSONObject helloWorld() {
        JSONObject obj = new JSONObject();
        obj.put("code", 200);
        obj.put("message", "success");
        return obj;
    }
}

