
var data = [];
for (i=0; i<=300; i++) {
	data.push({xloc: 0, yloc: 0, xvel: 0, yvel: 0});
}

var w = 800,
	h = 600,
	spacing = 1,
	xmin = d3.min(data, function(d) { return d.xloc; }) - spacing,
	xmax = d3.max(data, function(d) { return d.xloc; }) + spacing,
	ymin = d3.min(data, function(d) { return d.yloc; }) - spacing,
	ymax = d3.max(data, function(d) { return d.yloc; }) + spacing,				
	x = d3.scale.linear()
		.domain([xmin, xmax])
		.range([0, w]),
	y = d3.scale.linear()
		.domain([ymin, ymax])
		.range([0, h]);		
		
var latest = new Date(),
	last = latest,
	fps = [];
					
for (i=0; i<=100; i++) {
	fps.push(30);
}
			
var chart = d3.select("body").append("svg")
	.attr("class", "chart")
	.attr("width", w)
	.attr("height", h);
	
chart.selectAll("circle")
	.data(data)
	.enter().append("circle")
	.attr("class", "little")
	.attr("cx", function(d) { 
		return x(d.xloc); 
	})
	.attr("cy", function(d) { 
		return y(d.yloc); 
	})
	.attr("r", function(d) {
		return 1+50*Math.abs(d.xvel * d.yvel);
	});	
	
function xmean() {
	d3.mean(data, function(d) { return d.xloc; });
}

function ymean() {
	d3.mean(data, function(d) { return d.yloc; });
}      		
				  
function motion(e, index, array) { 
	e.xloc = e.xloc + e.xvel; 
	e.yloc = e.yloc + e.yvel; 			      	
	e.xvel = e.xvel + 0.04*Math.random() - 0.05*e.xvel - 0.0005*e.xloc;
	e.yvel = e.yvel + 0.04*Math.random() - 0.05*e.yvel - 0.0005*e.yloc;   			
}      			      	     
									  
d3.timer(function() {
					
	data.forEach(motion);	
	xmin = d3.min(data, function(d) { return d.xloc; }) - spacing;
	xmax = d3.max(data, function(d) { return d.xloc; }) + spacing;
	ymin = d3.min(data, function(d) { return d.yloc; }) - spacing;
	ymax = d3.max(data, function(d) { return d.yloc; }) + spacing;				
	x = d3.scale.linear()
		.domain([xmin, xmax])
		.range([0, w]);
	y = d3.scale.linear()
		.domain([ymin, ymax])
		.range([0, h]);		
					
	chart.selectAll("circle")
		.attr("cx", function(d) { 
			return x(d.xloc); 
		})
		.attr("cy", function(d) { 
			return y(d.yloc); 
		})
		.attr("r", function(d) {
			return d3.min([1+1000*Math.abs(d.xvel * d.yvel),10]);
		});	
		
	latest = new Date();
	fps.push(1/(latest-last)*1000);
	fps.shift();
	last = latest;
	d3.select("#fps span").text(Math.round(d3.mean(fps)));

});
