import React from "react";
import {Provider} from 'react-redux'
import store from './store'
import {BrowserRouter as Router, Route, Switch, useParams} from 'react-router-dom'
import Home from './components/home/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import About from './components/pages/About'
import Company from './components/pages/Company'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/about" component={About} />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register}/>
          <Route exact path="/company" component={Company} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
