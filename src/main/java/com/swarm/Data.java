package com.swarm;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class Data {
    String userId;
    Boolean isLike;
    String designId;
    List<String> tags;
    String imageURL;

    public Data()
    {
        userId = "1234";
        isLike = true;
        designId = "5678";
        tags = new ArrayList<>();
        imageURL = "";
    }
}
