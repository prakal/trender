function drawGraph(myGraph, json, keepNodesOnTop,swarmList, resetJSONLinks) {

    graph = new myGraph("#graph");
    graph.addInitialNodesAndLinks(json);

    keepNodesOnTop();
    // callback for the changes in the network
    $("#addNodes").on("click", function(){
      var len = json.nodes.length++
       graph.addNode(len++);
       // make random connection to newly added node x
       swarmList.push([6,len-1]);
       resetJSONLinks(json, swarmList, graph);

       // swarmList.push([6,25]);
       // graph.addLink(25, 6, '5');

       // swarmList.push([5,10]);
       // graph.addLink(5, 10, '5');

       // swarmList.push([6,24, 18, 21, 19]);
       keepNodesOnTop();
    });
}