package com.swarm;


import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class DesignCollection {
    Map<String,DesignData> data = new HashMap<>();

    public void add(String designId, String imageURL, Boolean isLike, List<String> tags) {

        if (data.get(designId) == null) {
            data.put(designId,DesignData.of(designId,imageURL,isLike,tags));
        }

        DesignData designData = data.get(designId);

        designData.update(isLike);
    }

    public Collection<DesignData> get() {
        return data.values();
    }
}
