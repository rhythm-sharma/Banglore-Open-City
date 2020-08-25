import React, { Component } from "react";
import { MDBDataTable } from "mdbreact";
import routes from "../../utils/routes.json";


class RouteTable extends Component {
    constructor() {
        super();
        this.state = {
            data: {
                columns: [
                    {
                        label: "Destination",
                        field: "destination",
                        sort: "asc"
                    },
                    {
                        label: "Distance",
                        field: "distance",
                        sort: "asc"
                    },
                    {
                        label: "Duration",
                        field: "duration",
                        sort: "asc"
                    },
                    {
                        label: "First arrival",
                        field: "first_arrival",
                        sort: "asc"
                    },
                    {
                        label: "First departure",
                        field: "first_departure",
                        sort: "asc"
                    },
                    {
                        label: "Last arrival",
                        field: "last_arrival",
                        sort: "asc"
                    },
                    {
                        label: "Last departure",
                        field: "last_departure",
                        sort: "asc"
                    },
                    {
                        label: "Origin",
                        field: "origin",
                        sort: "asc"
                    },
                    {
                        label: "Route",
                        field: "route",
                        sort: "asc"
                    },
                    {
                        label: "Speed",
                        field: "speed",
                        sort: "asc"
                    },
                    {
                        label: "Trips",
                        field: "trips",
                        sort: "asc"
                    },
                ],
                rows: []
            }
        }
    }

    componentDidMount() {
        // extract the data from routes.json and assign the value to row in data 
        const {data} = this.state

        //  extracting the data
        let tempRoute = [];
        routes.features.forEach((item) => {
            tempRoute.push(item.properties)
        })

        //  append the needed data into data state (row)

        let tempData  = data
        tempData.rows = tempRoute;

        this.setState({
            data: tempData
        })
    }


    render() {
        const { data } = this.state
        return (
        <div className="">
        {data.rows.length > 0 &&
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
        }
        </div>
    )
    }
}

export default RouteTable;