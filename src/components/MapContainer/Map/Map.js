import React, { Component } from "react";
import * as d3 from "d3";
import Draggable from "react-draggable";

import "./Map.scss";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDraggablePopUp: false,
      textDraggablePopUp: null,
      positionDraggablePopUp: { x: 0, y: 0 },
    };
    this.mapWrapper = React.createRef();
    this.tooltip = React.createRef();
  }

  componentDidMount() {
    this.createMap();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.mergedGeoJSON !== this.props.mergedGeoJSON) {
      this.removeMap();
      this.createMap();
    }
  }

  createMap = () => {
    const that = this;
    const mapWrapper = this.mapWrapper.current;
    const tooltipWrapper = this.tooltip.current;

    const mergedGeoJSON = this.props.mergedGeoJSON;

    const { width, height } = mapWrapper.getBoundingClientRect();

    const svg = d3
      .select(mapWrapper)
      .append("svg")
      .attr("class", "map")
      .attr("id", "map")
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
                return `<div>${d.properties.name}  <strong>School </strong> </div>`;
              });
          });
          d3.select(this).on("mouseout", function (d) {
            tooltip.classed("hidden", true);
          });

          d3.select(this).on("click", function (d) {
            const mouse = d3.mouse(svg.node()).map(function (d) {
              return parseInt(d);
            });
            that.handleDraggablePopOver(d.properties, mouse[0], mouse[1]);
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
                return `<div> ${d.properties.name} <strong>Bus Stop </strong></div>`;
              });
          });
          d3.select(this).on("mouseout", function (d) {
            tooltip.classed("hidden", true);
          });

          d3.select(this).on("click", function (d) {
            const mouse = d3.mouse(svg.node()).map(function (d) {
              return parseInt(d);
            });
            that.handleDraggablePopOver(d.properties, mouse[0], mouse[1]);
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
              .html(function () {
                return `<div> ${d.properties.origin} <strong>Route </strong></div>`;
              });
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
  };

  removeMap = () => {
    const el = document.getElementById("map");
    el.remove();
  };

  handleDraggablePopOver = (properties, x, y) => {
    console.log("handleDraggablePopOver");
    this.setState({
      showDraggablePopUp: true,
      textDraggablePopUp: properties,
      positionDraggablePopUp: {
        x: x,
        y: y,
      },
    });
  };

  render() {
    const {
      showDraggablePopUp,
      textDraggablePopUp,
      positionDraggablePopUp,
    } = this.state;

    let draggableContainer =
      textDraggablePopUp &&
      Object.keys(textDraggablePopUp).map((key) => {
        if (typeof textDraggablePopUp[key] !== "object") {
          return (
            <tr>
              <td>{key}</td>
              <td>{textDraggablePopUp[key]}</td>
            </tr>
          );
        } else {
          return <tr></tr>;
        }
      });

    console.log("textDraggablePopUp: ", textDraggablePopUp);

    return (
      <div className="position-relative">
        <div className="map-wrapper" ref={this.mapWrapper}></div>
        <div ref={this.tooltip}></div>
        <div
          style={{
            left: positionDraggablePopUp.x,
            top: positionDraggablePopUp.y,
          }}
          className={!showDraggablePopUp && "hide-popup"}
        >
          <Draggable>
            <div className="box">{JSON.stringify(textDraggablePopUp)}</div>
            {/* <div className="box">
              
              <table className="table table-striped">
                <tbody>{draggableContainer}</tbody>
              </table>
            </div> */}
          </Draggable>
        </div>
      </div>
    );
  }
}

export default Map;
