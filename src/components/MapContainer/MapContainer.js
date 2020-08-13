import React, { Component } from "react";
import geojsonMerge from "@mapbox/geojson-merge";
import Map from "./Map/Map";
import { Form } from "react-bootstrap";

import "./MapContainer.scss";

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMapAttr: [
        {
          name: "school",
          show: true,
        },
        {
          name: "busstop",
          show: true,
        },
        {
          name: "route",
          show: true,
        },
      ],
      mergedGeoJSON: null,
    };
  }

  componentDidMount() {
    // intializing the mergedGeoJSON with all 4 files data
    const { busStops, routes, schools } = this.props;
    const tempMergedGeoJSON = geojsonMerge.merge([
      routes,
      // bangaloreBoundaries,
      busStops,
      schools,
    ]);
    this.setState({
      mergedGeoJSON: tempMergedGeoJSON,
    });
  }

  handleMapAttrLayout = (mapAttr) => {
    const { showMapAttr } = this.state;
    const { busStops, routes, schools } = this.props;

    if (mapAttr === "school") {
      let tempShowMapAttr = showMapAttr;

      tempShowMapAttr[0].show = !tempShowMapAttr[0].show;
      this.setState({
        showMapAttr: tempShowMapAttr,
      });
    } else if (mapAttr === "busstop") {
      let tempShowMapAttr = showMapAttr;
      tempShowMapAttr[1].show = !tempShowMapAttr[1].show;
      this.setState({
        showMapAttr: tempShowMapAttr,
      });
    } else if (mapAttr === "route") {
      let tempShowMapAttr = showMapAttr;
      tempShowMapAttr[2].show = !tempShowMapAttr[2].show;
      this.setState({
        showMapAttr: tempShowMapAttr,
      });
    }

    let tempMergeArr = [routes, busStops, schools];

    const tempShowSchool = showMapAttr[0].show;
    const tempShowBusStop = showMapAttr[1].show;
    const tempShowRoutes = showMapAttr[2].show;

    if (!tempShowSchool) {
      tempMergeArr.splice(2, 1);
    }
    if (!tempShowBusStop) {
      tempMergeArr.splice(1, 1);
    }
    if (!tempShowRoutes) {
      tempMergeArr.splice(0, 1);
    }

    const tempMergedGeoJSON = geojsonMerge.merge(tempMergeArr);
    this.setState({
      mergedGeoJSON: tempMergedGeoJSON,
    });
  };

  render() {
    const { showMapAttr, mergedGeoJSON } = this.state;
    return (
      <div className="map-container">
        <p className="exo m-auto mt-3 text-center sub-text">
          The map is visual representation of schools and bus stops along with
          the bus routes of the Banglore city. It helps citizens to analyse the
          connectivity of schools with the bus routes and bus stops across
          Bangalore.
        </p>
        <div className="map-card mt-5">
          <div className="map-header">
            <div className="d-flex map-data-checkbox-container align-items-center">
              <p className="exo mr-auto mb-0">
                The <span className="dot yellow"></span> <strong>Yellow</strong>{" "}
                dot represents <strong>bus stops</strong> and{" "}
                <span className="dot violet"></span> <strong>Violet</strong> dot
                represents <strong>schools</strong> on the map
              </p>
              <div className="d-flex map-checkbox-options">
                <Form.Check
                  checked={showMapAttr[0].show}
                  type="checkbox"
                  label="Schools"
                  onChange={() => this.handleMapAttrLayout("school")}
                />
                <Form.Check
                  checked={showMapAttr[1].show}
                  type="checkbox"
                  label="Bus Stops"
                  onChange={() => this.handleMapAttrLayout("busstop")}
                />
                <Form.Check
                  checked={showMapAttr[2].show}
                  type="checkbox"
                  label="Bus Routes"
                  onChange={() => this.handleMapAttrLayout("route")}
                />
              </div>
            </div>
          </div>
          {mergedGeoJSON && <Map mergedGeoJSON={mergedGeoJSON} />}
        </div>
      </div>
    );
  }
}

export default MapContainer;
