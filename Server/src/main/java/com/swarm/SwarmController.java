package com.swarm;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class SwarmController {

    @RequestMapping("/")
    public String postDesign()
    {
        return "hi";
    }

}
