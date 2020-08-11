import React, { Component } from "react";
import MapContainer from "./components/MapContainer/MapContainer";
import Facts from "./components/Facts/Facts";
import DataTable from "./components/Table/Table";

import Children from "./assets/children.jpg";

import "./App.scss";

import bangaloreBoundaries from "./utils/bangalore_boundaries_2.geo.json";
import busStops from "./utils/bus_stops.geo.json";
import routes from "./utils/routes.json";
import schools from "./utils/schools.json";

class App extends Component {
  render() {
    return (
      <div className="main-container">
        <header>
          <nav className="navbar">
            <a className="navbar-brand" href="#">
              <span className="heading">Open City | </span>
              <span className="sub-text">for every child</span>
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

          <section className="bangalore-facts py-5">
            <h2 className="text-center exo">Bangalore School Facts</h2>
            <hr className="end-line" />
            <Facts
              bangaloreBoundaries={bangaloreBoundaries}
              busStops={busStops}
              routes={routes}
              schools={schools}
            />
          </section>

          <section className="bangalore-map py-5">
            <h2 className="text-center exo">Bangalore Schools Map</h2>
            <hr className="end-line" />
            <div className="mt-5">
              <MapContainer
                bangaloreBoundaries={bangaloreBoundaries}
                busStops={busStops}
                routes={routes}
                schools={schools}
              />
            </div>
          </section>

          <section className="bangalore-school-list py-5">
            <h2 className="text-center exo">Bangalore Schools List</h2>
            <hr className="end-line" />
            <div className="list-container mt-5">
              <DataTable />
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
