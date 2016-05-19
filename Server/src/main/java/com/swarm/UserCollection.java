package com.swarm;

import java.util.HashMap;

/**
 * Created by igorsorokin on 5/19/16.
 */
public class UserCollection {
    HashMap<String, User> users = new HashMap<String, User>();

    void addUser(String userId, String designId, Boolean isLike)
    {
        if (users.keySet().contains(userId))
        {
            users.get(userId).addDesign(designId, isLike);
        }
        else
        {
            User newUser = new User(userId);
            newUser.addDesign(designId, isLike);
            users.put(userId, newUser);
        }
    }

    User getUser(String userId)
    {
        return users.get(userId);
    }
}
