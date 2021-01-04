import React, { Component } from "react";
import InsertProductForm from "./forms/insert_product_form";
const axios = require("axios");

class InsertProduct extends Component {
  state = {};

  componentWillMount = () => {
    try {
      axios
        .post(
          "http://ec2-3-129-60-50.us-east-2.compute.amazonaws.com/spare_parts/session_checker.php"
        )
        .then((value) => {
          if (value.data === "no record found") return null;
          else if (value.data[0].status !== "1") {
            this.props.history.push("/login");
          }
        });
    } catch (error) {}
  };

  onInsertProduct = (product) => {
    try {
      axios
        .post(
          "http://ec2-3-129-60-50.us-east-2.compute.amazonaws.com/spare_parts/insert_product.php",
          product
        )
        .then((_response) => {
          console.log(_response);
        });
    } catch (error) {
      console.log(error, "Error while Adding Product");
    }
  };

  render() {
    return <InsertProductForm onAdd={this.onInsertProduct} />;
  }
}

export default InsertProduct;
