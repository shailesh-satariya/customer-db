import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Login from "./login";
import Register from "./register";
import MyProfile from "./my-profile";
import Customer from "./customer";
import Customers from "./customers";
import Logout from "./logout";
import NotFound from "./not-found";
import {ProtectedRoute} from "../components/common";

/**
 * Loader component
 *
 * @constructor
 *
 * @return JSX.Element
 */
const Pages: React.FC = (): JSX.Element => {
    return (
        <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <ProtectedRoute path="/profile" component={MyProfile}/>
            <ProtectedRoute path="/customers/:customerId" component={Customer}/>
            <Route path="/customers" component={Customers}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/not-found" component={NotFound}/>
            <Redirect from="/" exact to="/customers"/>
            <Redirect to="/not-found"/>
        </Switch>
    );
};

export default Pages;
