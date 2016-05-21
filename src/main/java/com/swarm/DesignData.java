package com.swarm;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class DesignData {
    private Design design;
    private int likes;
    private int dislikes;

    public static DesignData of(String designId, String imageURL, Boolean isLike, List<String> tags) {
        int likes =  isLike ? 1 : 0;
        int dislikes =  isLike ? 0 : 1;

        return new DesignData(new Design(designId,imageURL,tags),likes,dislikes);
    }

    public void update(Boolean isLike) {
        if(isLike){
            likes++;
        }else {
            dislikes++;
        }
    }
}
