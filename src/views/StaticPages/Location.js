import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { FormGroup, Col, Button } from 'reactstrap';
import InputElement from '../../components/Input/';
import CardLayout from '../../components/CardLayout/';

class EventLocation extends Component {
  componentWillMount () {
      //this.props.getEvents()
}
  render() {
    return (
      <CardLayout name="Event Location">
                <FormGroup row>
                    <Col xs="12" md="6">
                        <InputElement
                            icon="icon-info"
                            type="textarea"
                            placeholder="Information about Eternus..."
                            name="info"
                            //value={Room.capacity}
                           // required= {this.state.capacityRequired}
                           // onchanged={(event) => this.onChangeInput(event)}
                        />
                    </Col>
                    <Col md="6">
                        <InputElement
                            icon="icon-link"
                            type="text"
                            placeholder="Link to Eternus"
                            name="url"
                            //value={Room.bufferCapacity}
                            //onchanged={(event) => this.onChangeInput(event)}
                        />
                    </Col>
                </FormGroup>        
                <FormGroup row>
                    <Col xs="12" md="3">
                        <Button type="button" size="md" color="success" >Submit</Button>
                    </Col>
                    <Col  md="3">
                        <Button type="button" size="md" color="danger" style={{marginLeft : -160}} >Reset</Button>
                    </Col>
                    <Col md="6">
                       
                    </Col>
                </FormGroup >
            </CardLayout>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
      //getEvents : () => dispatch(actions.getEvents())
  };
}
export default connect(null, mapDispatchToProps)(EventLocation);
