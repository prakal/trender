package com.swarm;

import java.util.HashMap;

public class User {
    String userId;
    HashMap<String, Design> designs = new HashMap<String, Design>();

    String getUserId()
    {
        return userId;
    }

    public User(String userId)
    {
        this.userId = userId;
    }

    void addDesign(String designId, Boolean isLike)
    {
        Design newDesign = new Design(designId, isLike);
        designs.put(designId, newDesign);
    }
}
