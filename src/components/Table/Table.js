import React, { Component } from "react";
import BangloreSchoolList from "../../utils/bangalore_schools_list.json";
import { MDBDataTable } from "mdbreact";

import "./Table.scss";

class DatatablePage extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        columns: [
          {
            label: "DISE id",
            field: "DISE id",
            sort: "asc",
          },
          {
            label: "School Name",
            sort: "asc",
          },
          {
            label: "Pincode",
            field: "Pincode",
            sort: "asc",
          },
          {
            label: "Address",
            field: "Address",
            sort: "asc",
          },
          {
            label: "Landmark",
            field: "Landmark",
            sort: "asc",
          },
          {
            label: "Bus Number",
            field: "Bus Number",
            sort: "asc",
          },
        ],
        rows: BangloreSchoolList,
      },
      selectedTableRowRef: null,
    };
    this.MDBDataTableWrapper = React.createRef();
  }

  componentDidMount = () => {
    const table = document.getElementsByClassName("table")[0];
    const tBody = table.childNodes[1];
    const that = this;

    tBody.addEventListener("click", function (event) {
      let tempSelectedTableRowRef = that.state.selectedTableRowRef;

      if (
        tempSelectedTableRowRef &&
        tempSelectedTableRowRef.target &&
        tempSelectedTableRowRef.target.parentElement &&
        tempSelectedTableRowRef.target.parentElement.classList
      ) {
        tempSelectedTableRowRef.target.parentElement.classList.remove(
          "table-select-border",
          "table-select-not-found-border"
        );
        that.setState({
          selectedTableRowRef: tempSelectedTableRowRef,
        });
      }

      that.setState({
        selectedTableRowRef: event,
      });

      if (
        event &&
        event.target &&
        event.target.parentElement &&
        event.target.parentElement.childNodes[5] &&
        event.target.parentElement.childNodes[5].innerText
      ) {
        that.props.handleBusNumber(
          event.target.parentElement.childNodes[5].innerText
        );
      }

      if (that.props.busNumberMatchRoute) {
        event.target.parentElement.classList.add("table-select-border");
      } else {
        event.target.parentElement.classList.add(
          "table-select-not-found-border"
        );
      }
    });
  };

  render() {
    const { data } = this.state;

    return (
      <div className="table-container quicksand">
        <MDBDataTable
          ref={this.MDBDataTableWrapper}
          responsiveSm
          responsiveMd
          responsiveLg
          responsiveXl
          striped
          bordered
          small
          data={data}
          infoLabel={["Showing", "to", "of", "entries"]}
          paginationLabel={["Prev", "Next"]}
          pagesAmount={5}
        />
      </div>
    );
  }
}

export default DatatablePage;
