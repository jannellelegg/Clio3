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

//var hoverDetail = new Rickshaw.Graph.HoverDetail( {
   /* graph: graph,
    xFormatter: function(x) { return x + "seconds" },
    yFormatter: function(y) { return Math.floor(y) + " percent" }*/
/*} );

var legend = new Rickshaw.Graph.Legend({
    graph: graph,
    element: document.querySelector('#graph')
});*/

queue()
.defer(d3.json, "state_1870.json")
.defer(d3.csv, "cleanCMDM.csv")
.await(ready);

function ready(error, state_1870, location) {
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
  .data(location)
  .enter()
  .append("circle")

  // .attr("r", function(d) {return 2 * Math.sqrt(d.converts)}) Don't know what this part does:
  .attr("r", 3)
  .attr("class","mission")
  .attr("transform", function(d) {return "translate(" + projection([d.lon,d.lat]) + ")";});

  // Create the slider

  d3.select('#slider7').call(d3.slider().axis(true).min(1873).max(1879).step(1));

  

  $("#year-selector").slider({
    min: 1873,
    max: 1879,
    step: 1,
    slide: function ( event, ui ) {
      $("#current-year").text(ui.value);
      $("#all-checkbox").attr("checked", false);

      map_svg.selectAll(".mission")
      .data(location)
      .classed("hidden", true)
      .filter(function(d) {
        return +d.year === ui.value;
      })
      .classed("hidden", false);
    }
  });

  $("#all-checkbox").click( function() {
    if ($("#all-checkbox").prop('checked')) {
      $("#current-year").text("1873-1879");
      map_svg.selectAll(".mission")
      .data(location)
      .classed("hidden", false);
    } else {
      var current_year = $('#year-selector').slider("option", "value");
      $("#current-year").text(current_year);
      map_svg.selectAll(".mission")
      .data(location)
      .classed("hidden", true)
      .filter(function(d) {
        return +d.year === current_year;
      })
      .classed("hidden", false);
    }
  });

}



