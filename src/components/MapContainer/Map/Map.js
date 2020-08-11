import React, { Component } from "react";
import * as d3 from "d3";

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

    // Adding drag popover element into the DOM
    this.dragElement(document.getElementById("dragWrapper"));
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
            that.handleDraggablePopOver(
              d.properties,
              mouse[0],
              mouse[1],
              "School"
            );
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
            that.handleDraggablePopOver(
              d.properties,
              mouse[0],
              mouse[1],
              "Bus Stop"
            );
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

  handleDraggablePopOver = (properties, x, y, title) => {
    const dragElement = document.getElementById("dragWrapper");
    const dragTitleElement = document.getElementById("dragWrapperTitle");
    dragElement.style.left = x + "px";
    dragElement.style.top = y + "px";
    dragTitleElement.innerHTML = title;
    this.setState({
      showDraggablePopUp: true,
      textDraggablePopUp: properties,
      positionDraggablePopUp: {
        x: x,
        y: y,
      },
    });
  };

  dragElement = (elmnt) => {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  };

  handleDraggablePopOverClose = () => {
    this.setState({
      showDraggablePopUp: false,
    });
  };

  render() {
    const { showDraggablePopUp, textDraggablePopUp } = this.state;

    let draggableContainer =
      textDraggablePopUp &&
      Object.keys(textDraggablePopUp).map((key) => {
        if (typeof textDraggablePopUp[key] !== "object") {
          return (
            <tr className="quicksand">
              <td>{key}</td>
              <td>{textDraggablePopUp[key]}</td>
            </tr>
          );
        } else {
          return null;
        }
      });

    return (
      <div className="position-relative">
        <div className="map-wrapper" ref={this.mapWrapper}></div>
        <div ref={this.tooltip}></div>
        <div
          id="dragWrapper"
          className={
            "position-absolute " + (!showDraggablePopUp && "hide-popup")
          }
        >
          <div className="box">
            <div className="modal-header p-0 pb-2">
              <h6 id="dragWrapperTitle" className="modal-title">
                {""}
              </h6>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.handleDraggablePopOverClose}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <table className="table table-striped">
              <tbody>{draggableContainer}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Map;
