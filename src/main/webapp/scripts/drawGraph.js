function drawGraph(myGraph, json, keepNodesOnTop,swarmList, resetJSONLinks) {

    graph = new myGraph("#graph");
    graph.addInitialNodesAndLinks(json);

    keepNodesOnTop();

    // callback for the changes in the network
    $("#addNodes").on("click", function(){
       // graph.addLink(1, 6, '10');
       swarmList.push([7,25]);
       graph.addNode(x++);
       graph.addLink(25, 7, '5');

       swarmList.push([6,25]);
       graph.addLink(25, 6, '5');

       swarmList.push([5,10]);
       graph.addLink(5, 10, '5');

       swarmList.push([6,24, 18, 21, 19]);
       graph.addLink(6, 24, '5');
       graph.addLink(6, 18, '5');
       graph.addLink(18, 24, '5');
       graph.addLink(18, 21, '5');
       graph.addLink(21, 24, '5');
       graph.addLink(21, 6, '5');
       graph.addLink(19, 6, '5');
       graph.addLink(21, 19, '5');
       graph.addLink(18, 19, '5');

       resetJSONLinks(json, swarmList);

       keepNodesOnTop();
    });
}