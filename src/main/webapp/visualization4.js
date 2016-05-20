   var graph;
   var json = {"nodes":[{"name":"one","group":1},{"name":"two","group":1},{"name":"three","group":1},{"name":"four","group":1},{"name":"five","group":1},{"name":"six","group":1},{"name":"seven","group":1},{"name":"eight","group":1},{"name":"nine","group":1},{"name":"ten","group":1},{"name":"eleven","group":2},{"name":"twelve","group":2},{"name":"thirteen","group":3},{"name":"fourteen","group":2},{"name":"fifteen","group":2},{"name":"sixteen","group":2},{"name":"seventeen","group":3},{"name":"eighteen","group":3},{"name":"nineteen","group":3},{"name":"twenty","group":3},{"name":"twenty-one","group":3},{"name":"twenty-two","group":3},{"name":"twenty-three","group":3},{"name":"twenty-four","group":3},{"name":"twenty-five","group":4}],
                "links":[{"source":1,"target":0,"value":1},{"source":2,"target":0,"value":8},{"source":3,"target":0,"value":10},{"source":3,"target":2,"value":6},{"source":4,"target":0,"value":1},{"source":5,"target":0,"value":1},{"source":6,"target":0,"value":1},{"source":7,"target":0,"value":1},{"source":8,"target":0,"value":2},{"source":6,"target":1,"value":4},{"source":24,"target":0,"value":2},{"source":19,"target":16,"value":10},{"source":23,"target":19,"value":1}]};


    function myGraph() {
        this.addInitialNodesAndLinks = function(data){
            var self = this;
            data.nodes.forEach(function(item){
                nodes.push({'id': item.name});
                update();
            });
            data.links.forEach(function(item){
                self.addLink(item.source, item.target, item.value);
                update();
            });
        };
        // Add and remove elements on the graph object
        this.addNode = function (id) {
            nodes.push({"id": id});
            update();
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
            update();
        };

        this.removeLink = function (source, target) {
            for (var i = 0; i < links.length; i++) {
                if (links[i].source.id == source && links[i].target.id == target) {
                    links.splice(i, 1);
                    break;
                }
            }
            update();
        };

        this.removeallLinks = function () {
            links.splice(0, links.length);
            update();
        };

        this.removeAllNodes = function () {
            nodes.splice(0, links.length);
            update();
        };

        this.addLink = function (source, target, value) {
            console.log(source,target,value);
            links.push({"source": findNode(source), "target": findNode(target), "value": value});
            update();
        };

        var findNode = function (id) {
            for (var i in nodes) {
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
        var w = 960,
            h = 450;

        var color = d3.scale.category10();

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

        var update = function () {
            var link = vis.selectAll("line")
                    .data(links, function (d) {
                        return d.source.id + "-" + d.target.id;
                    });

            link.enter().insert("line", "g")
                    .attr("id", function (d) {
                        return d.source.id + "-" + d.target.id;
                    })
                    .attr("stroke-width", function (d) {
                        return d.value / 10;
                    })
                    .attr("class", "link");
            link.append("title")
                    .text(function (d) {
                        return d.value;
                    });
            link.exit().remove();

            var node = vis.selectAll("g.node")
                    .data(nodes, function (d) {
                        return d.id;
                    });

            var nodeEnter = node.enter().append("g")
                    .attr("class", "node")
                    .call(force.drag);

            nodeEnter.append("svg:circle")
                    .attr("r", 12)
                    .attr("id", function (d) {
                        return "Node;" + d.id;
                    })
                    .attr("class", "nodeStrokeClass")
                    .attr("fill", function(d) { return color(d.id); });

            nodeEnter.append("svg:text")
                    .attr("class", "textClass")
                    .attr("x", 14)
                    .attr("y", ".31em")
                    .text(function (d) {
                        return d.id;
                    });

            node.exit().remove();

            force.on("tick", function () {

                node.attr("transform", function (d) {
                    return "translate(" + d.x + "," + d.y + ")";
                });

                link.attr("x1", function (d) {
                    return d.source.x;
                })
                        .attr("y1", function (d) {
                            return d.source.y;
                        })
                        .attr("x2", function (d) {
                            return d.target.x;
                        })
                        .attr("y2", function (d) {
                            return d.target.y;
                        });
            });

            // Restart force layout.
            force
                    .gravity(.001)
                    .charge(-100)
                    .friction(0)
                    .linkDistance( function(d) { return d.value * 20 } )
                    .size([w, h])
                    .start();
        };


        // Make it start
        update();
    }

    function drawGraph() {

        graph = new myGraph("#graph");
        graph.addInitialNodesAndLinks(json);

        keepNodesOnTop();

        // callback for the changes in the network
        // var step = -1;
        // function nextval()
        // {
        //     step++;
        //     return 2000 + (1500*step); // initial time, wait time
        // }
    }

    drawGraph();

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

