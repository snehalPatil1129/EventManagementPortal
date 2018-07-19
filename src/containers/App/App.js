import React, { Component } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from '../../views/Dashboard/';
import Events from '../../views/Events/';
import Rooms from '../../views/Rooms/Rooms';
import RoomsModule from '../../views/Rooms/RoomsModule';
import Registration from '../../views/Registration/';
import DynamicForms from '../../views/FormList/DynamicForms';
import QuestionForms from '../../views/FormList/QuestionForms';
import RegistrationModule from '../../views/RegistrationList/RegistrationModule';
import Layout from '../../components/Layout/';
import Logout from '../Authentication/Logout';
import Login from '../Authentication/Login';
import { connect } from 'react-redux';
let routes;
class App extends Component {
  componentWillMount () {
       
  }
  render() {
    //if(this.props.email !== "") {
      routes = (
       <Layout>
         <Switch>
           <Route path="/dashboard" exact component={Dashboard} />
           <Route path="/events" component={Events} />
           <Route path="/rooms" component={Rooms} />
           <Route path="/roomsList" component={RoomsModule} />
           <Route path="/registration" component={Registration} />
           <Route path="/registrationList" component={RegistrationModule} />
           <Route path="/dynamicForms" component={DynamicForms} />
           <Route path="/questionForms" component={QuestionForms} />
           <Route path="/logout" component={Logout} />
           <Redirect from="/" to="/dashboard" />
           <Redirect to="/" />
         </Switch>
       </Layout>
     );
  // }
  //  else {
  //     routes = (
  //       <Switch>
  //         <Route path="/login" component={Login} />
  //         <Redirect from="/" to="/login" />
  //         <Redirect to="/" />
  //       </Switch>
  //    )
  //  }
    return (
      <div>
        {routes}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return{
    email : state.auth.email
  };
}

export default connect(mapStateToProps)(App);
