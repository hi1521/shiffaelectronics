import { result } from "lodash";
import React, { Component } from "react";
import InsertCategoryForm from "./forms/insert_category_form";
const axios = require("axios");

class InsertCategory extends Component {
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
    } catch (e) {}
  };

  onInsertCategory = (name, status) => {
    let result = false;
    try {
      axios
        .post(
          "http://ec2-3-129-60-50.us-east-2.compute.amazonaws.com/spare_parts/create_category.php",
          {
            Category_Name: name,
            Category_Status: status,
          }
        )
        .then((_response) => {
          result = true;
          console.log("yes");
        });
    } catch (error) {
      result = false;
    }
    return result;
  };
  render() {
    return <InsertCategoryForm onAdd={this.onInsertCategory} />;
  }
}

export default InsertCategory;
