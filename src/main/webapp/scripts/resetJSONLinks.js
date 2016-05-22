function resetJSONLinks(json, swarmList, graph, len){
    // takes swarmList and sets the links property in JSON to reflect swarmList
    json.links = [];
    swarmList.forEach(function(item){
        item.forEach(function(element){
            item.forEach(function(innerElement){
                if (element !== innerElement){
                    // source, target, value
                    graph.addLink(element, innerElement, 5);
                }
            })
        });
    });
};