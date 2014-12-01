var map_width = 720;
var map_height = 425;

// Converting TopoJSON to GeoJSON in order to display
// projection = defines projection, path = generates path
var projection = d3.geo.albersUsa()
.scale(850)
.translate([map_width / 2, map_height / 2]);

var path = d3.geo.path()
.projection(projection);

// Create the SVGs
var map_svg = d3.select("#map").append("svg")
.attr("width", map_width)
.attr("height", map_height);



queue()
.defer(d3.json, "state_1870.json")
.defer(d3.csv, "cleanCMDM.csv")
.await(ready);

function ready(error, state_1870, cleanCMDM) {
  console.log(state_1870);
  map_svg.selectAll(".states")
  .data(topojson.feature(state_1870, state_1870.objects.state_1870).features)
  .enter().append("path")
  .attr("class", function(d) { return "state " + d.id; })
  .attr("d", path);

  map_svg.append("path")
  .datum(topojson.mesh(state_1870, state_1870.objects.state_1870))
  .attr("d", path)
  .attr("class", "border");

  map_svg.selectAll("circles.points")
  .data(cleanCMDM)
  .enter()
  .append("circle")
  .attr("r", function(d) {
    if (d.frequency >= 50) {
      return (7);
    }
    else if (d.frequency >= 12) {
      return (5);
    }
    else {
      return (3);
    }
  })
  .attr("class","mission")
  .attr("transform", function(d) {return "translate(" + projection([d.lon,d.lat]) + ")";});}



