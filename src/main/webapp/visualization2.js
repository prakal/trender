swarmList = {
	'1': [1,2,5],
	'2': [3,5],
	'3': [1,3,4,5]
};



JSONData = [
  {"amount": 5000},
  {"amount": 2000},
  {"amount": 3000},
  {"amount": 15000},
  {"amount": 12000},
  {"amount": 1600},
  {"amount": 13000},
];

(function() {
  var data = JSONData.slice();
  var amountFn = function(d) { return d.amount }
  var dateFn = function(d, index) { 
  	return index;
  }

  var x = d3.scale.linear()
    .range([10, 680])
    .domain(d3.extent(data, dateFn))

  var y = d3.scale.linear()
    .range([400, 10])
    .domain(d3.extent(data, amountFn))
  
  var svg = d3.select("#demo").append("svg:svg")
  .attr("width", 700)
  .attr("height", 400)

  svg.selectAll("circle").data(data).enter()
   .append("svg:circle")
   .attr("r", 4)
   .attr("cx", function(d, index) { return x(dateFn(d, index)) })
   .attr("cy", function(d, index) { return y(amountFn(d, index)) })

	var text = svg.selectAll("text")
		.data(JSONData)
		.enter()
		.append("text");
    var textLabels = text
     .attr("x", function(d, index) { return x(dateFn(d, index)); })
     .attr("y", function(d, index) { return y(amountFn(d, index)); })
     .text( function (d, index) { return index; })
     .attr("font-family", "sans-serif")
     .attr("font-size", "15px")
     .attr("fill", "red");

	var refreshGraph = function() {
		x.domain(d3.extent(data, dateFn))
		y.domain(d3.extent(data, amountFn))

		var circles = svg.selectAll("circle").data(data);

		circles.transition()
			.attr("cx", function(d, index) { return x(dateFn(d, index)) })
			.attr("cy", function(d, index) { return y(amountFn(d, index)) })

		circles.enter()
			.append("svg:circle")
			.attr("r", 4)
			.attr("cx", function(d, index) { return x(dateFn(d, index)) })
			.attr("cy", function(d, index) { return y(amountFn(d, index)) })

		var textLabels = svg.selectAll("text").data(data);

		textLabels.transition()
			.attr("x", function(d, index) { return x(dateFn(d, index)) })
			.attr("y", function(d, index) { return y(amountFn(d, index)) })

		textLabels.enter()
			.append("svg:text")
			.attr("x", function(d, index) { return x(dateFn(d, index)) })
			.attr("y", function(d, index) { return y(amountFn(d, index)) })
			.text( function (d, index) { return index; })
			.attr("font-family", "sans-serif")
			.attr("font-size", "15px")
			.attr("fill", "red");
	}

  d3.selectAll(".add-data")
   .on("click", function() {
     obj = {
       'amount': Math.floor(1000 + Math.random() * 20001),
     }
     data.push(obj)
     refreshGraph()
  })

  refreshGraph()
})();


