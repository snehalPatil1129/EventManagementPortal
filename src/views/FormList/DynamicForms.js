import FormList from './FormList.js';
import QuestionForms  from './QuestionForms.js';
import React, { Component } from 'react';
import {BrowserRouter as Router,Link, Switch, Route, Redirect} from 'react-router-dom';

class DynamicForms extends Component { 
    render() {
      return <div>
        <Route exact path={this.props.match.path} component={FormList} />
        <Route path={`${this.props.match.path}/questionForms/:id?`} component={QuestionForms} />
      </div>
    }
}

export default DynamicForms;