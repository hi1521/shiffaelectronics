import React, { Component } from "react";
import { MDBDataTable } from "mdbreact";
import axios from "axios";

class AllExpanses extends Component {
  componentDidMount = async () => {
    let { data } = this.state;
    let rows = data.rows;
    try {
      await axios
        .post(
          "http://ec2-3-129-60-50.us-east-2.compute.amazonaws.com/spare_parts/all_expanse.php"
        )
        .then((response) => {
          response.data.map((product, index) => {
            rows = [...rows, product];
            return null;
          });
        });
    } catch (error) {}

    data.rows = rows;
    this.setState({ data });
  };

  state = {
    data: {
      columns: [
        {
          label: "#",
          field: "id",
          sort: "asc",
          width: 100,
        },
        {
          label: "Description",
          field: "Expanse_Desc",
          sort: "asc",
          width: 500,
        },
        {
          label: "Amount",
          field: "Expanse_Amount",
          sort: "asc",
          width: 100,
        },
        {
          label: "Date",
          field: "date",
          sort: "asc",
          width: 100,
        },
      ],
      rows: [],
    },
    grossProfit: 0,
  };

  render() {
    let { columns, rows } = this.state.data;
    return (
      <div>
        <MDBDataTable
          theadColor={"blue-gradient"}
          striped
          barReverse={true}
          theadTextWhite={true}
          hover
          noBottomColumns={true}
          data={{ columns, rows }}
        />
      </div>
    );
  }
}

export default AllExpanses;
