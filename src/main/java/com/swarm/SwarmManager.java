package com.swarm;

import java.util.ArrayList;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Random;

@Component
public class SwarmManager {
    ArrayList<String> usedSwarmIds = new ArrayList<String>();
    HashMap<String, Swarm> userLikesSwarm = new HashMap<String, Swarm>();
    HashMap<String, Swarm> userDislikesSwarm = new HashMap<String, Swarm>();
    HashMap<String, ArrayList<Swarm>> designsToSwarms = new HashMap<String, ArrayList<Swarm>>();

    public SwarmManager()
    {
        usedSwarmIds.add("");
    }

    //add weighs in terms of how many users like the same two items
    public void add(User user, String designId, Boolean isLike) {
        if (isLike)
        {
            if (userLikesSwarm.containsKey(user.getUserId()))
            {
                userLikesSwarm.get(user.getUserId()).addDesign(designId, isLike);
            }
            else userLikesSwarm.put(user.getUserId(), new Swarm(getRandomUnusedSwarmId(), designId, isLike));
        }
        else
        {
            if (userDislikesSwarm.containsKey(user.getUserId()))
            {
                userDislikesSwarm.get(user.getUserId()).addDesign(designId, isLike);
            }
            else userDislikesSwarm.put(user.getUserId(), new Swarm(getRandomUnusedSwarmId(), designId, isLike));
        }

        if (!designsToSwarms.containsKey(designId))
        {
            designsToSwarms.put(designId, new ArrayList<Swarm>());
        }
        if (isLike) designsToSwarms.get(designId).add(userLikesSwarm.get(user.getUserId()));
        else designsToSwarms.get(designId).add(userDislikesSwarm.get(user.getUserId()));
    }

    public String pranavSent()
    {
        return "";
    }

    String getRandomUnusedSwarmId()
    {
        String result = "";
        Random rand = new Random();
        while (!usedSwarmIds.contains(result))
            result = "";
            for (int i = 0; i < 3; i++)
                result += Character.toString((char) (rand.nextInt(26) + 65));
        return result;
    }
}
