package com.swarm;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by igorsorokin on 5/19/16.
 */
@RestController
public class SwarmController {

    @RequestMapping("/")
    public String test()
    {
        return "hi";
    }

    /*

     */
}
