import React, { Component } from "react";
import MapContainer from "./components/MapContainer/MapContainer";
import Facts from "./components/Facts/Facts";
import DataTable from "./components/Table/Table";

import Children from "./assets/children.jpg";

import "./App.scss";

import busStops from "./utils/bus_stops.geo.json";
import routes from "./utils/routes.json";
import schools from "./utils/schools.json";

class App extends Component {
  constructor() {
    super();
    this.state = {
      busNumber: "",
      busNumberMatchRoute: null,
    };
  }

  handleBusNumber = (busNumber) => {
    this.setState({
      busNumber: busNumber,
    });
  };

  handleBusNumberMatchRoute = (busNumberMatchRoute) => {
    this.setState({
      busNumberMatchRoute: busNumberMatchRoute,
    });
  };

  render() {
    const { busNumber, busNumberMatchRoute } = this.state;
    return (
      <div className="main-container">
        <header>
          <nav className="navbar">
            <a className="navbar-brand" href="#">
              <span className="heading">Open City</span>
            </a>
          </nav>
        </header>

        <div className="body-container">
          <section className="img-section">
            <img className="img-fluid" src={Children} alt="Children" />
          </section>

          <section className="what-we-do-section pb-5">
            <div className="card shadow-lg p-3 mb-5 bg-white rounded">
              <div className="card-body">
                <h2 className="exo text-center">Open City</h2>
                <p className="exo mt-3 text-center sub-text">
                  The platform helps citizens and civil society by bringing
                  visibility and transparency into local governance and enabling
                  data-driven decision making.
                </p>
                <hr className="end-line" />
              </div>
            </div>
          </section>

          <section className="what-are-we-working py-5">
            <h2 className="text-center exo">What we are working on</h2>
            <hr className="end-line" />
            <p className="exo m-auto mt-3 text-center sub-text">
              Open City works with a goal to use data, tech and design to helps
              citizens and civil society by bringing visibility and transparency
              into local governance and enabling data-driven decision making.
              The data visualized through the online platform will help identify
              where the gaps and information needs are, serve as evidence when
              advocating for connectivity and help citizens to analyze the
              connectivity between education organizations and the transport
              system.
            </p>
          </section>

          <section className="bangalore-facts py-5">
            <h2 className="text-center exo">Bangalore Facts</h2>
            <hr className="end-line" />
            <Facts busStops={busStops} schools={schools} />
          </section>

          <section className="bangalore-map py-5">
            <h2 className="text-center exo">Bangalore Schools Map</h2>
            <hr className="end-line" />
            <div className="mt-5">
              <MapContainer
                busStops={busStops}
                routes={routes}
                schools={schools}
                busNumber={busNumber}
                busNumberMatchRoute={busNumberMatchRoute}
                handleBusNumberMatchRoute={this.handleBusNumberMatchRoute}
              />
            </div>
          </section>

          <section className="bangalore-school-list py-5">
            <h2 className="text-center exo">Bangalore Schools List</h2>
            <hr className="end-line" />
            <div className="list-container mt-5">
              <DataTable
                handleBusNumber={this.handleBusNumber}
                busNumberMatchRoute={busNumberMatchRoute}
              />
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
