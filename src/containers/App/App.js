import React, { Component } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from '../../views/Dashboard/';
import Events from '../../views/Events/';
import Rooms from '../../views/Rooms/';
import Registration from '../../views/Registration/';
import RegistrationModule from '../../views/RegistrationList/RegistrationModule';
import Layout from '../../components/Layout/';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/events" component={Events} />
          <Route path="/rooms" component={Rooms} />
          <Route path="/registration" component={Registration} />
          <Route path="/registrationList" component={RegistrationModule} />
          <Redirect from="/" to="/dashboard" />
          <Redirect to="/" />
        </Switch>
      </Layout>
    );
  }
}

export default App;
