import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class SponsorForm extends Component {
  componentWillMount () {
      //this.props.getEvents()
}
  render() {
    return (
      <div className="animated fadeIn">
        Hello World rm SponsorForm
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
      //getEvents : () => dispatch(actions.getEvents())
  };
}
export default connect(null, mapDispatchToProps)(SponsorForm);
