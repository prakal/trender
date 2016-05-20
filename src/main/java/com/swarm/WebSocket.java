package com.swarm;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;


@Component
public class WebSocket {

    private SimpMessagingTemplate template;

    @Autowired
    public WebSocket(SimpMessagingTemplate template) {
        this.template = template;
    }

    public void send(String swarmId,String designId,String command) throws Exception {
        DisplayUpdate displayUpdate = new DisplayUpdate(swarmId, designId, command);
        template.convertAndSend("/swarm/update",displayUpdate);
    }
}
