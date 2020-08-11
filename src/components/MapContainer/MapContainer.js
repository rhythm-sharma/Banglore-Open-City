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
    const { bangaloreBoundaries, busStops, routes, schools } = this.props;
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
    const { bangaloreBoundaries, busStops, routes, schools } = this.props;

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
    const { bangaloreBoundaries, busStops, routes, schools } = this.props;
    const { showMapAttr, mergedGeoJSON } = this.state;
    return (
      <div>
        <div className="d-flex justify-content-end map-data-checkbox-container">
          <Form.Check
            checked={showMapAttr[0].show}
            type="checkbox"
            label="Show Schools"
            onChange={() => this.handleMapAttrLayout("school")}
          />
          <Form.Check
            checked={showMapAttr[1].show}
            type="checkbox"
            label="Show Bus Stops"
            onChange={() => this.handleMapAttrLayout("busstop")}
          />
          <Form.Check
            checked={showMapAttr[2].show}
            type="checkbox"
            label="Show Routes"
            onChange={() => this.handleMapAttrLayout("route")}
          />
        </div>
        {mergedGeoJSON && <Map mergedGeoJSON={mergedGeoJSON} />}
      </div>
    );
  }
}

export default MapContainer;
