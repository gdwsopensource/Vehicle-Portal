/*
 * File Name：PortalController.java
 *
 * Copyrighe：copyright@2017 GZSW Company. All Rights Reserved
 *
 * Create Time: 2017年6月23日 上午11:17:18
 */
package com.gdws.vehicle.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author lcc (nplcclin@gmail.com)
 * @version 1.0, 2017年6月23日 上午11:17:18
 */
@Controller
public class PortalController {
    @RequestMapping("index")
    String frequentBusines() {
        return "index";
    }
    @RequestMapping("behavior-analysis")
    String behaviorAnalysis() {
        return "behavior-analysis";
    }
    
    @RequestMapping("behavior-prediction")
    String behaviorPrediction() {
        return "behavior-prediction";
    }
    @RequestMapping("first-analysis")
    String firstAnalysis() {
        return "first-analysis";
    }
    @RequestMapping("frequency-analysis")
    String frequencyAnalysis() {
        return "frequency-analysis";
    }
    @RequestMapping("deck-analysis")
    String deckAnalysis() {
        return "deck-analysis";
    }
    @RequestMapping("od-analysis")
    String odAnalysis() {
        return "od-analysis";
    }
    @RequestMapping("daynight-analysis")
    String daynightAnalysis() {
        return "daynight-analysis";
    }
    @RequestMapping("all-analysis")
    String allAnalysis() {
        return "all-analysis";
    }
    
    @RequestMapping("mv")
    ModelAndView test() {
        ModelAndView mv = new ModelAndView();
        
        return mv;
    }
}

