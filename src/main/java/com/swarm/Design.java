package com.swarm;

public class Design {
    String designId;
    int likeWeight = 0;
    int dislikeWeight = 0;

    public Design(String designId, Boolean isLike) {
        this.designId = designId;
        if (isLike)
        {
            likeWeight += 1;
        }
        else
        {
            dislikeWeight += 1;
        }
    }
}
