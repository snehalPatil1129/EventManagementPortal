import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Events extends Component {

  componentDidMount () {
        this.props.getEvents();
    }

  render() {
    return (
      <div className="animated fadeIn">
       Events
      </div>
    )
  }
}

const mapStateToProps = state => {
    return {
       
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getEvents: () => dispatch(actions.getEvents()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)( Events);
