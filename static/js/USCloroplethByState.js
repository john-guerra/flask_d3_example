/*
Requirements:

<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>
<script src="https://d3js.org/topojson.v2.min.js"></script>

CSS

.states :hover {
  fill: red;
}

.state-borders {
  fill: none;
  stroke: #fff;
  stroke-width: 0.5px;
  stroke-linejoin: round;
  stroke-linecap: round;
  pointer-events: none;
}
*/

/* global d3, topojson */

function USCloroplethByState() {

  var margin = {top: 20, right: 20, bottom: 20, left: 20},
    width = 960,
    height = 600,
    innerWidth = width - margin.left - margin.right,
    innerHeight = height - margin.top - margin.bottom,
    color = function(d) { return d.value; },
    id = function(d) { return d.id; },
    usShapes = null,
    updateDomain = true,
    path = d3.geoPath(),
    colorScale = d3.scaleThreshold()
      .range(d3.schemeBlues[9]);
    // dicValues = d3.map();

  function update(sel, data) {
    // Select the svg element, if it exists.
    var svg = d3.select(sel).selectAll("svg").data([data]);

    // Otherwise, create the skeletal chart.
    var svgEnter = svg.enter().append("svg");
    var gEnter = svgEnter.append("g");
    gEnter.append("g").attr("class", "states");
    gEnter.append("path").attr("class", "state-borders");

    // Update the outer dimensions.
    svg.merge(svgEnter).attr("width", width)
      .attr("height", height);

    innerWidth = width - margin.left - margin.right;
    innerHeight = height - margin.top - margin.bottom;

    // Update the inner dimensions.
    var g = svg.merge(svgEnter).select("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top +
          "), scale("+ Math.min(innerWidth/960, innerHeight/600) + ")");

    if (updateDomain) {
      // this a threshold scale with 9 steps, so the domain needs to be 9 steps
      //
      var domain = d3.extent(data.map(color));
      colorScale.domain(d3.range(domain[0], domain[1], (domain[1]-domain[0])/9));
    }


    // Draw the shapes
    var states = g.select(".states")
      .selectAll("path")
      .data(topojson.feature(usShapes, usShapes.objects.states).features, function (d) { return d.id; });

    states
      .enter()
        .append("path")
      .merge(states)
        .attr("d", path)
        .style("fill", "white"); //default value

    var statesValues = g.select(".states")
      .selectAll("path")
      .data(data, id);

    statesValues
      .style("fill", function (d) {
        return colorScale(color(d));
      })
      .on("mouseenter", function (d) {
        console.log(color(d));
        console.log(d);
      });


    g.select(".state-borders")
      .attr("d", path(topojson.mesh(usShapes, usShapes.objects.states, function(a, b) { return a !== b; })));


  }

  function chart(selection) {
    selection.each(function (data) {
      var sel = this;
      if (usShapes===null) {
        // If we don't have the geo shapes, load them
        d3.json("static/data/us-10m.v1.json", function(error, _us) {
          if (error) throw error;
          usShapes = _us;

          update(sel, data);
        });
      } else {

        // Do we already have the geo shapes? then just draw
        update(sel, data);
      }
    });

  }

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.id = function(_) {
    if (!arguments.length) return id;
    id = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = _;
    return chart;
  };

  chart.colorScale = function(_) {
    if (!arguments.length) return colorScale;
    colorScale = _;
    return chart;
  };

  chart.updateDomain = function(_) {
    if (!arguments.length) return updateDomain;
    updateDomain = _;
    return chart;
  };


  return chart;
}

