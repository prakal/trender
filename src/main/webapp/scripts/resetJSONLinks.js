function resetJSONLinks(json, swarmList){
    // takes swarmList and sets the links property in JSON to reflect swarmList
    json.links = [];
    swarmList.forEach(function(item){
        item.forEach(function(element){
            item.forEach(function(innerElement){
                if (element !== innerElement){
                    json.links.push({'source':element, "target":innerElement, "value":5});
                }
            })
        });
    });
};