import React, { Component } from "react";
import FactContainer from "./FactContainer";
import "./Facts.scss";

class Facts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      facts: [
        {
          title: "Schools in Banglore",
          value: "",
        },
        {
          title: "Bus stands near school",
          value: "",
        },
        {
          title: "Literacy Rate",
          value: "88.48%",
        },
        {
          title: "Total Libraries",
          value: "170",
        },
      ],
    };
  }

  componentDidMount() {
    const { schools, busStops } = this.props;
    const tempSchools = schools.features.length;
    const tempBusStands = busStops.features.length;

    const { facts } = { ...this.state };
    const tempFacts = facts;
    tempFacts[0].value = tempSchools;
    tempFacts[1].value = tempBusStands;

    this.setState({
      facts: tempFacts,
    });
  }

  render() {
    const { facts } = this.state;

    let factsContainer = facts.map((item, index) => {
      return <FactContainer key={index} title={item.title} fact={item.value} />;
    });

    return (
      <div className="container text-center">
        <div className="facts-container d-flex justify-content-between">
          {factsContainer}
        </div>
      </div>
    );
  }
}

export default Facts;
