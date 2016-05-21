package com.swarm;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class Design {
    String designId;
    String url;
    List<String> tags;
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

    public Design(String designId, String url,List<String> tags) {
        this.designId = designId;
        this.url = url;
        this.tags = tags;
    }
}
