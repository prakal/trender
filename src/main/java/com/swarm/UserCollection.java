package com.swarm;

import org.springframework.stereotype.Component;

import java.util.HashMap;


@Component
public class UserCollection {
    HashMap<String, User> users = new HashMap<String, User>();

    void addUser(String userId, String designId, Boolean isLike)
    {
        if (users.containsKey(userId))
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
