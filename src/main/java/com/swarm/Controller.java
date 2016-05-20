package com.swarm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {

    @Autowired
    private UserCollection userCollection;

    @Autowired
    private SwarmManager swarmManager;

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
