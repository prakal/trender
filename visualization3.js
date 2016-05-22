var width = 960,
    height = 400

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var force = d3.layout.force()
    .gravity(0.05)
    .distance(100)
    .charge(-100)
    .size([width, height]);
var json = {"nodes":[{"name":"one","group":1},{"name":"two","group":1},{"name":"three","group":1},{"name":"four","group":1},{"name":"five","group":1},{"name":"six","group":1},{"name":"seven","group":1},{"name":"eight","group":1},{"name":"nine","group":1},{"name":"ten","group":1},{"name":"eleven","group":2},{"name":"twelve","group":2},{"name":"thirteen","group":3},{"name":"fourteen","group":2},{"name":"fifteen","group":2},{"name":"sixteen","group":2},{"name":"seventeen","group":3},{"name":"eighteen","group":3},{"name":"nineteen","group":3},{"name":"twenty","group":3},{"name":"twenty-one","group":3},{"name":"twenty-two","group":3},{"name":"twenty-three","group":3},{"name":"twenty-four","group":3},{"name":"twenty-five","group":4}],
            "links":[{"source":1,"target":0,"value":1},{"source":2,"target":0,"value":8},{"source":3,"target":0,"value":10},{"source":3,"target":2,"value":6},{"source":4,"target":0,"value":1},{"source":5,"target":0,"value":1},{"source":6,"target":0,"value":1},{"source":7,"target":0,"value":1},{"source":8,"target":0,"value":2},{"source":6,"target":1,"value":4},{"source":24,"target":0,"value":2},{"source":19,"target":16,"value":10},{"source":23,"target":19,"value":1}]};

var refreshGraph = function() {
  var node = svg.selectAll(".node")
    .data(json.nodes)
  .enter().append("g")
    .attr("class", "node")
    .call(force.drag);
  node.append("image")
    .attr("xlink:href", "https://www.salesforce.com/favicon.ico")
    .attr("x", -8)
    .attr("y", -8)
    .attr("width", 16)
    .attr("height", 16);
  node.append("text")
    .attr("dx", 12)
    .attr("dy", ".35em")
    .text(function(d) { return d.name });
var link = svg.selectAll(".link")
    .data(json.links)
  .enter().append("line")
    .attr("class", "link");
node.exit().remove();
force.on("tick", function() {
  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
});

  force
    .nodes(json.nodes)
    .links(json.links)
    .start();


};
// force
//     .nodes(json.nodes)
//     .links(json.links)
//     .start();

// var link = svg.selectAll(".link")
//     .data(json.links)
//   .enter().append("line")
//     .attr("class", "link");

// var node = svg.selectAll(".node")
//     .data(json.nodes)
//   .enter().append("g")
//     .attr("class", "node")
//     .call(force.drag);

// node.append("image")
//     .attr("xlink:href", "https://www.salesforce.com/favicon.ico")
//     .attr("x", -8)
//     .attr("y", -8)
//     .attr("width", 16)
//     .attr("height", 16);

// node.append("text")
//     .attr("dx", 12)
//     .attr("dy", ".35em")
//     .text(function(d) { return d.name });

// force.on("tick", function() {
//   link.attr("x1", function(d) { return d.source.x; })
//       .attr("y1", function(d) { return d.source.y; })
//       .attr("x2", function(d) { return d.target.x; })
//       .attr("y2", function(d) { return d.target.y; });

//   node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
// });

// button add to add entry
d3.selectAll(".add")
.on("click",function(){
  json.nodes.push({"name":"COOOL","group":1});
  console.log("clicked")
  refreshGraph();
});

refreshGraph();
