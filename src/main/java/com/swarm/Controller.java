package com.swarm;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {

    UserCollection userCollection = new UserCollection();
    SwarmManager swarmManager = new SwarmManager();

    @RequestMapping(value = "/postDesign",method = RequestMethod.POST)
    public ResponseEntity postDesign(@RequestBody Data dataBody)
    {
        Data data = new Data();
        userCollection.addUser(data.userId, data.designId, data.isLike);
        swarmManager.add(userCollection.getUser(data.userId), data.designId, data.isLike);
        /*
        Swarm -> designs
        users -> designs ->
         */

        return ResponseEntity.ok().build();
    }
}
