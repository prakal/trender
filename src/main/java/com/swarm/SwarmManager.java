package com.swarm;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Random;

//think about duplicates
@Component
public class SwarmManager {
    ArrayList<String> usedSwarmIds = new ArrayList<String>();
    HashMap<String, Swarm> userLikesSwarm = new HashMap<String, Swarm>();
    HashMap<String, Swarm> userDislikesSwarm = new HashMap<String, Swarm>();
    HashMap<String, ArrayList<Swarm>> designsToSwarms = new HashMap<String, ArrayList<Swarm>>();
    HashMap<String, Integer> designWeights = new HashMap<String, Integer>();

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
                addWeight(userLikesSwarm.get(user.getUserId()), designId);
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

    //D1->D2->weight
    //user1 -> D1 D2 D3
    //user2 -> D2 D3 D4
    //D1 -> user1Likes
    //D1 D2 D3
    //D2 D3 D4
    public void addWeight(Swarm swarm, String baseDesignId) {
        for (Design design : swarm.getDesigns().values())
        {
            String designToDesignKey = baseDesignId + "-" + design.getDesignId();
            if (!designWeights.containsKey(designToDesignKey))
                designWeights.put(designToDesignKey, 1);
            else
                designWeights.put(designToDesignKey, designWeights.get(designToDesignKey) + 1);

            if (designWeights.get(designToDesignKey) > 5)
                swarmMerge(baseDesignId, design.getDesignId());
        }
    }

    public void swarmMerge(String design1, String design2)
    {
        designsToSwarms.get(design1).addAll(designsToSwarms.get(design2));
        designsToSwarms.put(design2, designsToSwarms.get(design1);
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
