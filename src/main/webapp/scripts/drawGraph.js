function drawGraph(myGraph, json, keepNodesOnTop,swarmList, resetJSONLinks) {
    function setTimedInterval(callback, delay, timeout){
        var id=window.setInterval(callback, delay);
        window.setTimeout(function(){
            window.clearInterval(id);
        }, timeout);
    }
    graph = new myGraph("#graph");
    graph.addInitialNodesAndLinks(json);

    keepNodesOnTop();

    function addRandomLink(){
        var randomNode1 = Math.floor(Math.random() * json.nodes.length);
        var randomNode2 = Math.floor(Math.random() * json.nodes.length);
        while (randomNode1 == randomNode2){
            randomNode2 = Math.floor(Math.random() * swarmList.length);
        }
        // console.log(randomNode1,randomNode2, json.nodes.length);
        swarmList.push([randomNode1,randomNode2]);
        resetJSONLinks(json, swarmList[swarmList.length-1], graph);
    }

    function changeRandomLink(){
        var randomSwarm = Math.floor(Math.random() * swarmList.length);
        var randomTimes = 1 + Math.floor(Math.random() * 1.5);
        console.log(randomSwarm, swarmList[randomSwarm], randomTimes);
        for (var i = 0; i < randomTimes; i++){
            var randomNode1 = Math.floor(Math.random() * json.nodes.length);
            // console.log('randomNode1', randomNode1);
            if (swarmList[randomSwarm].indexOf(randomNode1) === -1){
                swarmList[randomSwarm].push(randomNode1);
            }
        }
        resetJSONLinks(json, swarmList[randomSwarm], graph);
    }

    // callback for the changes in the network
    $("#addNodes").on("click", function(){


      // var len = json.nodes.length++
       // graph.addNode(len++);
       // make random connection to newly added node x
       // swarmList.push([6,len-1]);
       //setTimedInterval(addRandomLink, 1500, 10000);
       //setTimedInterval(changeRandomLink, 2000, 10000);

        addRandomLink();
        changeRandomLink();

       keepNodesOnTop();
    });

    var socket = new SockJS('/trender');
    var stompClient = Stomp.over(socket);
    stompClient.connect({}, function(frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/swarm/update', function(greeting){
            addRandomLink();
            changeRandomLink();
        });
    });
}