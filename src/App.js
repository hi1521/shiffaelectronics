import React from "react";
import "./App.css";
import {Redirect, Route, Switch} from "react-router-dom";

import RoutesWithNavigation from "./components/RoutesWithNavigation";

import LoginPage from "./spare_parts_components/pages/login";

import SalePage from "./spare_parts_components/pages/sale";

import Invoice from "./spare_parts_components/pages/billInvoice/invoice";


const App = () => {
    return (
        <Switch>
            <Route path="/login" exact component={LoginPage}/>
            <Route path="/sale" exact component={SalePage}/>
            <Route path="/invoice" exact component={Invoice}/>
            <RoutesWithNavigation/>
            <Redirect to="/login"/>
        </Switch>
    );
};

export default App;
