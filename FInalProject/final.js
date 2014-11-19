var map_width = $("#map").width();
var map_height = 425;
var chart_margin = {top: 10, right: 50, bottom: 10, left: 0};
var chart_width = $("#chart-1").width() - chart_margin.left - chart_margin.right;
var chart_height = 180 - chart_margin.top - chart_margin.bottom;

var projection = d3.geo.albersUsa()
.scale(850)
.translate([map_width / 2, map_height / 2]);

var path = d3.geo.path().projection(projection);

// Create the SVGs
var map_svg = d3.select("#map")
.append("svg")
.attr("width", map_width)
.attr("height", map_height);

queue()
.defer(d3.json, "state_1870.json")
.defer(d3.csv, "cleanCMDM.csv")
.await(ready);

function ready(error, state_1870, missions, summary) {
  map_svg.selectAll(".states")
  .data(topojson.feature(state_1870, state_1870.objects.states).features)
  .enter().append("path")
  .attr("class", function(d) { return "state " + d.id; })
  .attr("d", path);

  map_svg.append("path")
  .datum(topojson.mesh(state_1870, state_1870.objects.states))
  .attr("d", path)
  .attr("class", "border");

  map_svg.selectAll("circles.points")
  .data(missions)
  .enter()
  .append("circle")
  // .attr("r", function(d) {return 2 * Math.sqrt(d.converts)})
  .attr("r", 3)
  .attr("class","mission")
  .attr("transform", function(d) {return "translate(" + projection([d.long,d.lat]) + ")";});



  // Setup the slider to select the year
  $("#year-selector").slider({
    min: 1873,
    max: 1879,
    step: 1,
    slide: function ( event, ui ) {
      $("#current-year").text(ui.value);
      $("#all-checkbox").attr("checked", false);

      map_svg.selectAll(".mission")
      .data(missions)
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
      .data(missions)
      .classed("hidden", false);


    } else {
      var current_year = $('#year-selector').slider("option", "value");
      $("#current-year").text(current_year);
      map_svg.selectAll(".mission")
      .data(missions)
      .classed("hidden", true)
      .filter(function(d) {
        return +d.year === current_year;
      })
      .classed("hidden", false);
    }
  });

}
