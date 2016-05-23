function resetJSONLinks(json, swarmListLast, graph){
    // takes swarmList and sets the links property in JSON to reflect swarmList
    json.links = [];
    swarmListLast.forEach(function(item){
        swarmListLast.forEach(function(innerElement){
            if (item !== innerElement){
                // source, target, value
                graph.addLink(item, innerElement, 5);
            }
        });
    });
};