import React, { Component } from 'react';
import {BrowserRouter as Router,Link, Switch, Route, Redirect} from 'react-router-dom';
import EventReports from './EventReports';
import SessionReports from './SessionReports';
import AttendeeReports from './AttendeeReports';

class Reports extends Component {
  render() {
      return (
          <div>
              <Route path={`${this.props.match.path}/eventReports`} component={EventReports} />
              <Route path={`${this.props.match.path}/sessionReports`} component={SessionReports} />
              <Route path={`${this.props.match.path}/attendeeReports`} component={AttendeeReports} />
          </div>
      )
  }
}
export default Reports;
