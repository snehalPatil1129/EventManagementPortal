import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Dashboard extends Component {
  componentWillMount () {
      this.props.getEvents()
}
  render() {
    return (
      <div className="animated fadeIn">
        Hello World
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
      getEvents : () => dispatch(actions.getEvents())
  };
}
export default connect(null, mapDispatchToProps)(Dashboard);
