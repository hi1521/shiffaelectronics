import React, { Component } from "react";
import { MDBDataTable, MDBBtn, MDBRow, MDBContainer, MDBCol } from "mdbreact";
import "./all_product.css";
import axios from "axios";

class AllProducts extends Component {
  quantityComponent = (index, value = null) => {
    const { rows } = this.state.data;
    const quantity =
      rows.length > 0 ? rows[index].Product_Quantity : parseInt(value);
    return (
      <div className="md-form" style={{ margin: 0 }}>
        <input
          // style={{width:"150px"}}
          type="number"
          id={index + 1}
          onChange={(event) => this.onQuantityChange(index, event.target.value)}
          min={0}
          value={quantity}
          className="form-control"
        />
      </div>
    );
  };

  onQuantityChange = (index, value) => {
    let quantity = 0;
    if (value !== "") quantity = parseInt(value);
    let { data, grossProfit } = this.state;
    grossProfit -= data.rows[index].Profit;
    data.rows[index].Product_Quantity = quantity;
    const { Product_Retail_Price, Product_PurchasePrice } = data.rows[index];
    data.rows[index].Profit =
      (Product_Retail_Price - Product_PurchasePrice) * quantity;
    grossProfit += data.rows[index].Profit;
    this.setState({ data, grossProfit });
  };

  state = {
    data: {
      columns: [
        {
          label: "Name",
          field: "Product_Name",
          sort: "asc",
          width: 150,
        },
        {
          label: "C.Name",
          field: "Category_Name",
          sort: "asc",
          width: 270,
        },
        {
          label: "P.Brand",
          field: "Product_Brand",
          sort: "asc",
          width: 200,
        },
        {
          label: "P.Code",
          field: "Product_Code",
          sort: "asc",
          width: 100,
        },
        {
          label: "Qty",
          field: "qty",
          sort: "asc",
          width: 150,
        },
        {
          label: "R.Price",
          field: "Product_Retail_Price",
          sort: "asc",
          width: 350,
        },
        {
          label: "Profit",
          field: "Profit",
          sort: "asc",
          width: 350,
        },
      ],
      rows: [],
    },
    grossProfit: 0,
  };

  componentDidMount = async () => {
    let { data, grossProfit } = this.state;
    let rows = data.rows;

    try {
      await axios
        .post(
          "http://ec2-3-129-60-50.us-east-2.compute.amazonaws.com/spare_parts/allproducts.php"
        )
        .then((response) => {
          response.data.map((product, index) => {
            const {
              Product_Retail_Price,
              Product_PurchasePrice,
              Product_Quantity,
            } = product;
            product["qty"] = this.quantityComponent(
              index,
              product.Product_Quantity
            );
            product["Profit"] =
              (Product_Retail_Price - Product_PurchasePrice) * Product_Quantity;
            grossProfit += product["Profit"];
            rows = [...rows, product];
            return null;
          });
        });
    } catch (error) {}
    data.rows = rows;
    this.setState({ data, grossProfit });
  };

  onSave = () => {
    const products = this.state.data.rows.map((value) => {
      delete value.qty;
      return value;
    });

    const data = {
      items: products,
    };

    console.log(data);
    try {
      axios
        .post(
          "http://ec2-3-129-60-50.us-east-2.compute.amazonaws.com/spare_parts/update_product.php",
          data
        )
        .then((value) => console.log(value));
    } catch (error) {}
  };

  render() {
    const { grossProfit } = this.state;
    let { columns, rows } = this.state.data;
    if (rows.length > 0)
      rows.map((value, index) => {
        rows[index].qty = this.quantityComponent(index);
        // rows[index].Product_PurchasePrice;
        // rows[index].Product_Retail_Price;
        return null;
      });
    return (
      <div>
        <MDBDataTable
          // className="form-header blue-gradient rounded"
          theadColor={"blue-gradient"}
          striped
          barReverse={true}
          theadTextWhite={true}
          hover
          noBottomColumns={true}
          data={{ columns, rows }}
        />
        <MDBContainer style={{ paddingTop: 50 }}>
          <MDBRow className="d-flex justify-content-center">
            <MDBCol sm={8}>
              <MDBBtn color={"success"} onClick={this.onSave}>
                Save
              </MDBBtn>
            </MDBCol>
            <MDBCol sm={4}>
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                Gross Profit:{" "}
              </span>
              <div style={{ display: "inline-block" }}>
                <h4 style={{ color: "#00C851" }}>{`Rs.${grossProfit}`}</h4>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

export default AllProducts;
