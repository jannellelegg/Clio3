var map_width = 720;
var map_height = 425;

// Converting TopoJSON to GeoJSON in order to display
// projection = defines projection, path = generates path
var projection = d3.geo.albersUsa()
.scale(850)
.translate([map_width / 2, map_height / 2]);

var path = d3.geo.path().projection(projection);

// Create the SVGs
var map_svg = d3.select("#map")
.append("svg")
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
  .attr("transform", function(d) {return "translate(" + projection([d.lon,d.lat]) + ")";});}

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


  // Create the slider

d3.slider = function module() {
  "use strict";

  // Public variables width default settings
  var min = 1873,
      max = 1879,
      step = 1, 
      animate = true,
      orientation = "horizontal",
      axis = false,
      margin = 50,
      value,
      scale; 

  // Private variables
  var axisScale,
      dispatch = d3.dispatch("slide"),
      formatPercent = d3.format(".2%"),
      tickFormat = d3.format(".0"),
      sliderLength;

  function slider(selection) {
    selection.each(function() {

      // Create scale if not defined by user
      if (!scale) {
        scale = d3.scale.linear().domain([1873, 1879]);
      }  

      // Start value
      value = value || scale.domain()[1873]; 

      // DIV container
      var div = d3.select(this).classed("d3-slider d3-slider-" + orientation, true);

      var drag = d3.behavior.drag();

      // Slider handle
      var handle = div.append("a")
          .classed("d3-slider-handle", true)
          .attr("xlink:href", "#")
          .on("click", stopPropagation)
          .call(drag);

      // Horizontal slider
      if (orientation === "horizontal") {

        div.on("click", onClickHorizontal);
        drag.on("drag", onDragHorizontal);
        handle.style("left", formatPercent(scale(value)));
        sliderLength = parseInt(div.style("width"), 10);

      } 
      
      if (axis) {
        createAxis(div);
      }


      function createAxis(dom) {

        // Create axis if not defined by user
        if (typeof axis === "boolean") {

          axis = d3.svg.axis()
              .ticks(Math.round(sliderLength / 100))
              .tickFormat(tickFormat)
              .orient((orientation === "horizontal") ? "bottom" :  "right");

        }      

        // Copy slider scale to move from percentages to pixels
        axisScale = scale.copy().range([0, sliderLength]);
          axis.scale(axisScale);

          // Create SVG axis container
        var svg = dom.append("svg")
            .classed("d3-slider-axis d3-slider-axis-" + axis.orient(), true)
            .on("click", stopPropagation);

        var g = svg.append("g");

        // Horizontal axis
        if (orientation === "horizontal") {

          svg.style("left", -margin);

          svg.attr({ 
            width: sliderLength + margin * 2, 
            height: margin
          });  

          if (axis.orient() === "top") {
            svg.style("top", -margin);  
            g.attr("transform", "translate(" + margin + "," + margin + ")")
          } else { // bottom
            g.attr("transform", "translate(" + margin + ",0)")
          }

        } 

        g.call(axis);  

      }


      // Move slider handle on click/drag
      function moveHandle(pos) {

        var newValue = stepValue(scale.invert(pos / sliderLength));

        if (value !== newValue) {
          var oldPos = formatPercent(scale(stepValue(value))),
              newPos = formatPercent(scale(stepValue(newValue))),
              position = (orientation === "horizontal") ? "left" : "bottom";

          dispatch.slide(d3.event.sourceEvent || d3.event, value = newValue);

          if (animate) {
            handle.transition()
                .styleTween(position, function() { return d3.interpolate(oldPos, newPos); })
                .duration((typeof animate === "number") ? animate : 250);
          } else {
            handle.style(position, newPos);          
          }
        }

      }


      // Calculate nearest step value
      function stepValue(val) {

        var valModStep = (val - scale.domain()[0]) % step,
            alignValue = val - valModStep;

        if (Math.abs(valModStep) * 2 >= step) {
          alignValue += (valModStep > 0) ? step : -step;
        }

        return alignValue;

      }


      function onClickHorizontal() {
        moveHandle(d3.event.offsetX || d3.event.layerX);
      }

      function onDragHorizontal() {
        moveHandle(Math.max(0, Math.min(sliderLength, d3.event.x)));
      }    

      function stopPropagation() {
        d3.event.stopPropagation();
      }

    });

  } 

  // Getter/setter functions
  slider.min = function(_) {
    if (!arguments.length) return min;
    min = _;
    return slider;
  } 

  slider.max = function(_) {
    if (!arguments.length) return max;
    max = _;
    return slider;
  }     

  slider.step = function(_) {
    if (!arguments.length) return step;
    step = _;
    return slider;
  }   

  slider.animate = function(_) {
    if (!arguments.length) return animate;
    animate = _;
    return slider;
  } 

  slider.orientation = function(_) {
    if (!arguments.length) return orientation;
    orientation = _;
    return slider;
  }     

  slider.axis = function(_) {
    if (!arguments.length) return axis;
    axis = _;
    return slider;
  }     

  slider.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
    return slider;
  }  

  slider.value = function(_) {
    if (!arguments.length) return value;
    value = _;
    return slider;
  }  

  slider.scale = function(_) {
    if (!arguments.length) return scale;
    scale = _;
    return slider;
  }  

  d3.rebind(slider, dispatch, "on");

  return slider;

}





