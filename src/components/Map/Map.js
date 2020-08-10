import React, { Component } from "react";
import * as d3 from "d3";

import geojsonMerge from "@mapbox/geojson-merge";

import "./Map.scss";

class Map extends Component {
  constructor(props) {
    super(props);
    this.mapWrapper = React.createRef();
    this.tooltip = React.createRef();
  }

  componentDidMount() {
    const { bangaloreBoundaries, busStops, routes, schools } = this.props;

    const mapWrapper = this.mapWrapper.current;
    const tooltipWrapper = this.tooltip.current;

    const mergedGeoJSON = geojsonMerge.merge([
      routes,
      // bangaloreBoundaries,
      busStops,
      schools,
    ]);

    const { width, height } = mapWrapper.getBoundingClientRect();

    const svg = d3
      .select(mapWrapper)
      .append("svg")
      .attr("class", "map")
      .attr("width", width)
      .attr("height", height);

    const tooltip = d3
      .select(tooltipWrapper)
      .attr("class", "hidden tooltip-wrapper");

    const projection = d3.geoAlbers();
    projection.fitExtent(
      [
        [0, 0],
        [width, height],
      ],
      mergedGeoJSON
    );

    const path = d3.geoPath().projection(projection);

    // const Boundaries = svg.append("p").selectAll("path").data(mergedGeoJSON.features)

    const mergedMap = svg
      .append("g")
      .selectAll("path")
      .data(mergedGeoJSON.features)
      .enter()
      .append("path")
      .attr("d", (feature) => path(feature))
      .style("fill", "#fff")
      .style("stroke", "black")
      .style("stroke-width", 0.5)
      .each(function (d) {
        const length = Object.keys(d.properties).length;

        if (length === 5) {
          // only works for school data
          d3.select(this).attr("class", "map-school");

          d3.select(this).on("mousemove", function (d) {
            const mouse = d3.mouse(svg.node()).map(function (d) {
              return parseInt(d);
            });
            tooltip
              .classed("hidden", false)
              .attr(
                "style",
                "left:" + (mouse[0] + 15) + "px; top:" + (mouse[1] - 35) + "px"
              )
              .html(function () {
                return `<div> <strong>School </strong> ${d.properties.name} </div>`;
              });
          });
          d3.select(this).on("mouseout", function (d) {
            tooltip.classed("hidden", true);
          });
        } else if (length === 4) {
          // only works for bus stop data
          d3.select(this).attr("class", "map-bus-stops");
          d3.select(this).on("mousemove", function (d) {
            const mouse = d3.mouse(svg.node()).map(function (d) {
              return parseInt(d);
            });

            tooltip
              .classed("hidden", false)
              .attr(
                "style",
                "left:" + (mouse[0] + 15) + "px; top:" + (mouse[1] - 35) + "px"
              )
              .html(function () {
                return `<div> <strong>Bus Stop </strong> ${d.properties.name} </div>`;
              });
          });
          d3.select(this).on("mouseout", function (d) {
            tooltip.classed("hidden", true);
          });
        } else if (length === 11) {
          // only works for routes data
          d3.select(this).on("mousemove", function (d) {
            d3.select(this).style("fill", "#000").style("fill-opacity", 0.1);

            const mouse = d3.mouse(svg.node()).map(function (d) {
              return parseInt(d);
            });
            tooltip
              .classed("hidden", false)
              .attr(
                "style",
                "left:" + (mouse[0] + 15) + "px; top:" + (mouse[1] - 35) + "px"
              )
              .html(d.properties.origin);
          });
          d3.select(this).on("mouseout", function (d) {
            tooltip.classed("hidden", true);
            d3.selectAll("path").style("fill", "#fff").style("fill-opacity", 1);
          });
        }
      });

    let zoom = d3.zoom().on("zoom", function () {
      let t = d3.event.transform; // get current zoom state
      projection.scale(t.k).translate([t.x, t.y]); // set scale and translate of projection.
      mergedMap.attr("d", path); // redraw the features
    });

    svg.call(zoom);

    // Initial Zoom setup
    svg.call(
      zoom.transform,
      d3.zoomIdentity
        .translate(-197905.53913436, 203642.97999083705)
        .scale(118270.34915599221)
    );
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="position-relative">
        <div className="map-wrapper" ref={this.mapWrapper}></div>
        <div ref={this.tooltip}></div>
      </div>
    );
  }
}

export default Map;
