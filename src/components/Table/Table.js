import React from "react";
import BangloreSchoolList from "../../utils/bangalore_schools_list.json";
import { MDBDataTable } from "mdbreact";

import "./Table.scss";

const DatatablePage = () => {
  const data = {
    columns: [
      {
        label: "DISE id",
        field: "DISE id",
        sort: "asc",
      },
      {
        label: "School Name",
        field: "School Name",
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
  };

  return (
    <div className="table-container quicksand">
      <MDBDataTable
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
};

export default DatatablePage;
