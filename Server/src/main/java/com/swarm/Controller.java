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

    @Autowired
    private WebSocket webSocket;

    @RequestMapping(value = "/postDesign",method = RequestMethod.POST)
    public ResponseEntity postDesign(@RequestBody Data data)  {
        userCollection.addUser(data.userId, data.designId, data.isLike);
        swarmManager.add(userCollection.getUser(data.userId), data.designId, data.isLike);

        try
        {
            webSocket.send(swarmManager.getRandomUnusedSwarmId(), data.designId, "add");
        }
        catch(Exception e){

        }

        return ResponseEntity.ok().build();
    }
}
