import React, { Component } from "react";
import InsertProductForm from "./forms/insert_product_form";
import {Redirect} from "react-router-dom";
const axios = require("axios");

class InsertProduct extends Component {
  state = {};


  componentWillMount = () => {
    axios.post("http://localhost/spare_parts/session_checker.php")
        .then(value => {
          if (value.data === "no record found") return null;
          else if(value.data[0].status !== '1') {
            this.props.history.push("/login");
          }
        })
  }

  onInsertProduct = (product) => {
    axios
      .post("http://localhost/spare_parts/insert_product.php", product)
      .then((response) => console.log(response));
  };

  render() {
    return <InsertProductForm onAdd={this.onInsertProduct} />;
  }
}

export default InsertProduct;
