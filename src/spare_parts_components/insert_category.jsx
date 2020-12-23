import React, { Component } from "react";
import InsertCategoryForm from "./forms/insert_category_form";
const axios = require("axios");

class InsertCategory extends Component {
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

  onInsertCategory = (name, status) => {
    axios
      .post("http://localhost/spare_parts/create_category.php", {
        Category_Name: name,
        Category_Status: status,
      })
      .then((response) => console.log(response.data));
  };
  render() {
    return <InsertCategoryForm onAdd={this.onInsertCategory} />;
  }
}

export default InsertCategory;
