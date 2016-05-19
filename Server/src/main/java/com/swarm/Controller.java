package com.swarm;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {

    UserCollection userCollection = new UserCollection();
    SwarmManager swarmManager = new SwarmManager();

    @RequestMapping("/")
    public String test()
    {
        Data data = new Data();
        userCollection.addUser(data.userId, data.designId, data.isLike);
        swarmManager.add(userCollection.getUser(data.userId), data.designId, data.isLike);
        /*
        Swarm -> designs
        users -> designs ->
         */
        return "hi";
    }
}
