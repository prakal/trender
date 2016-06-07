package com.swarm;

import lombok.Getter;

import java.util.HashMap;

@Getter
public class Swarm {
    String swarmId;
    HashMap<String, Design> designs = new HashMap<String, Design>();

    public Swarm(String swarmId, String designId, Boolean isLike)
    {
        this.swarmId = swarmId;
        designs.put(designId, new Design(designId, isLike));
    }

    void addDesign(String designId, Boolean isLike)
    {
        if (designs.containsKey(designId))
        {
            //think about this in terms of weight
            designs.put(designId, new Design(designId, isLike));
        }
        else
        {
            //same thing as above
        }
    }
}
