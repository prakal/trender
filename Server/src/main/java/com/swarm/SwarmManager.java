package com.swarm;

import org.springframework.stereotype.Component;

import java.util.HashMap;

@Component
public class SwarmManager {
    HashMap<String, Swarm> userLikesSwarm = new HashMap<String, Swarm>();

    public void add(User user, String designId, Boolean isLike) {
        if (userLikesSwarm.keySet().contains(user.getUserId()))
        {
            
        }
    }
}
