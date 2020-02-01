import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
  Redirect
} from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Company from "./components/pages/Company";
import Modals from "./components/modals/Modals"
import Spinner from "./components/layout/Spinner";
import PrivateRoute from "./routing/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Suppliers from "./components/suppliers/Suppliers";
import Customers from "./components/customers/Customers";
import Products from "./components/products/Products";
import Sales from "./components/sales/Sales";
import Purchases from "./components/purchases/Purchases";
import Settings from "./components/settings/Settings";
import setAuthToken from "./utils/setAuthToken";
import NotFound from './components/pages/NotFound'

if (localStorage.inventoryAppToken) {
  setAuthToken(localStorage.inventoryAppToken);
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/company" component={Company} />
          <Route exact path="/company" component={Company} />
          <Route exact component={Dashboard} path="/dashboard" />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/sales" component={Sales} />
          <Route exact path="/purchases" component={Purchases} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/suppliers" component={Suppliers} />
          <Route exact path="/customers" component={Customers} />

          <Route component={NotFound}/>
        </Switch>
        <Modals />
      </Router>
    </Provider>
  );
}

export default App;
