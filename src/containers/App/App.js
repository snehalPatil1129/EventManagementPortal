import React, { Component } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from '../../views/Dashboard/';
import Events from '../../views/Events/';
import Layout from '../../components/Layout/';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/dashboard" exact component={Dashboard} />
          <Redirect from="/" to="/dashboard" />
          <Route path="/events" component={Events} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    );
  }
}

export default App;
