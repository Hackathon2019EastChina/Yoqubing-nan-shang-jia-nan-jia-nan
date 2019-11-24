import React from "react";
import { Route } from "react-router-dom";

import Main from "../container/Main";
import Resource from "../container/Resource";
import Order from "../container/Order";
import User from "../container/User";
import Wall from "../container/Wall";
import Login from "../container/User/Login";
import MyOrder from "../container/MyOrder";

export default [
  <Route component={ Main } exact path="/" />,
  <Route component={ User } exact path="/user" />,
  <Route component={ Login } exact path="/user/login" />,
  <Route component={ Wall } exact path="/wall" />,
  <Route component={ Resource } exact path="/resource" />,
  <Route component={ Order } exact path="/order" />,
  <Route component={ MyOrder } exact path="/myorder" />
];