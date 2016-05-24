var update = function (vis, links, nodes, force, w, h, findSwarmColor, swarmList) {
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
            .attr("r", 22)
            .attr("id", function (d) {
                return "Node;" + d.id;
            })
            .attr("class", "nodeStrokeClass")
            // .attr("fill", function(d, index) { 
            //     return findSwarmColor(index); 
            // });

    nodeEnter.append("svg:text")
            .attr("class", "textClass")
            .attr("x", 26)
            .attr("y", ".31em")
            .text(function (d) {
                return d.id;
            });

    node.exit().remove();

    // update all colours:
    var allDesigns = d3.selectAll("g.node")
    allDesigns
        .attr("fill", function(d, index) { 
                return findSwarmColor(index, swarmList); 
            });

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
        .gravity(.007)
        .charge(-100)
        .friction(0.9)
        .linkDistance( function(d) { return d.value * 20 } )
        .size([w, h])
        .start();
};