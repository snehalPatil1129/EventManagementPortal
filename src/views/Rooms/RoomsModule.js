import RoomsList from './RoomsList.js';
import Rooms  from './Rooms.js';
import React, { Component } from 'react';
import {BrowserRouter as Router,Link, Switch, Route, Redirect} from 'react-router-dom';

class RoomsModule extends Component { 
    render() {
      return <div>
        <Route exact path={this.props.match.path} component={RoomsList} />
        <Route path={`${this.props.match.path}/rooms/:id?`} component={Rooms} />
      </div>
    }
}

export default RoomsModule;