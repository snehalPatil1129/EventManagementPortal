import SpeakerList from './SpeakerList.js';
import SpeakerForm  from './SpeakerForm.js';
import React, { Component } from 'react';
import {BrowserRouter as Router,Link, Switch, Route, Redirect} from 'react-router-dom';

class Speakers extends Component { 
    render() {
      return <div>
        <Route exact path={this.props.match.path} component={SpeakerList}/>
        <Route path={`${this.props.match.path}/speakerForm/:id?`} component={SpeakerForm} />
      </div>
    }
}

export default Speakers;