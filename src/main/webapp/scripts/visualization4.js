var socket = new SockJS('http://localhost:8080/trender');
           stompClient = Stomp.over(socket);
           stompClient.connect({}, function(frame) {
               setConnected(true);
               console.log('Connected: ' + frame);
               stompClient.subscribe('/swarm/update', function(greeting){
                   showGreeting(JSON.parse(greeting.body).content);
               });
           });

var graph, json;
// local
d3.json("data/data.json", function(error, json) {
 if (error) return console.warn(error);
 restOfTheProgram(json);
});

// when socket starts working

function restOfTheProgram(json){
var swarmList = [
    [1,2,3,4],
    [1,7,8,9],
    [10,11,12,13],
    [11,1,14,15]
];

resetJSONLinks(json, swarmList);

function myGraph() {
    function updateAll(){
        update(vis, links, nodes, force, w, h, findSwarmColor, swarmList)
    }

    this.addInitialNodesAndLinks = function(data){
        var self = this;
        data.nodes.forEach(function(item){
            nodes.push({'id': item.name});
            updateAll();
        });
        data.links.forEach(function(item){
            self.addLink(item.source, item.target, item.value);
            updateAll();
        });
    };
    // Add and remove elements on the graph object
    this.addNode = function (id) {
        nodes.push({"id": id});
        updateAll();
    };

    this.removeNode = function (id) {
        var i = 0;
        var n = findNode(id);
        while (i < links.length) {
            if ((links[i]['source'] == n) || (links[i]['target'] == n)) {
                links.splice(i, 1);
            }
            else i++;
        }
        nodes.splice(findNodeIndex(id), 1);
        updateAll();
    };

    this.removeLink = function (source, target) {
        for (var i = 0; i < links.length; i++) {
            if (links[i].source.id == source && links[i].target.id == target) {
                links.splice(i, 1);
                break;
            }
        }
        updateAll();
    };

    this.removeallLinks = function () {
        links.splice(0, links.length);
        updateAll();
    };

    this.removeAllNodes = function () {
        nodes.splice(0, links.length);
        updateAll();
    };

    this.addLink = function (source, target, value) {
        links.push({"source": findNode(source), "target": findNode(target), "value": value});
        updateAll();
    };

    var findNode = function (id) {
        for (var i in nodes) {
            // find node by index
            if (parseInt(i) === id) return nodes[i];
        };
    };

    var findNodeIndex = function (id) {
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].id == id) {
                return i;
            }
        };
    };

    // set up the D3 visualisation in the specified element
    var w = 1800,
        h = 1000;

    var vis = d3.select("body")
            .append("svg:svg")
            .attr("width", w)
            .attr("height", h)
            .attr("id", "svg")
            .attr("pointer-events", "all")
            .attr("viewBox", "0 0 " + w + " " + h)
            .attr("perserveAspectRatio", "xMinYMid")
            .append('svg:g');

    var force = d3.layout.force();

    var nodes = force.nodes(),
            links = force.links();




    // Make it start
    updateAll();
}
x = 0;

// in drawGraph.js
drawGraph(myGraph, json, keepNodesOnTop, swarmList, resetJSONLinks);

// because of the way the network is created, nodes are created first, and links second,
// so the lines were on top of the nodes, this just reorders the DOM to put the svg:g on top
function keepNodesOnTop() {
    $(".nodeStrokeClass").each(function( index ) {
        var gnode = this.parentNode;
        gnode.parentNode.appendChild(gnode);
    });
}
function addNodes() {
    d3.select("svg")
            .remove();
     drawGraph();
}


}
