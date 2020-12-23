import React from "react";
import { Route, Switch } from "react-router-dom";

import InsertProduct from "../spare_parts_components/insert_product";
import InsertCategory from "../spare_parts_components/insert_category";
import AllProducts from "../spare_parts_components/all_product"
import AddExpanses from "../spare_parts_components/Expanses/add_expanses"
import AllExpanses from "../spare_parts_components/Expanses/all_expanses"


const fourtOFour = () => <h1 className="text-center">Under Construction</h1>;

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={InsertProduct} />
        <Route path="/insertproduct" component={InsertProduct} />
        <Route path="/insertcategory" component={InsertCategory} />
        <Route path="/allproducts" component={AllProducts} />
        <Route path="/addexpanses" component={AddExpanses} />
        <Route path="/allexpanses" component={AllExpanses} />
        <Route component={fourtOFour} />
      </Switch>
    );
  }
}

export default Routes;
