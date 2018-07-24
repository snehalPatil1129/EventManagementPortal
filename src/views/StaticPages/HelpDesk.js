import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { FormGroup, Col, Button } from 'reactstrap';
import InputElement from '../../components/Input/';
import CardLayout from '../../components/CardLayout/';
import Select from 'react-select';

class HelpDesk extends Component {
  constructor(props) {
    super(props);
    this.state = {
      helpDesk: {
        event: '',
        eventSupportEmail: '',
        eventSupportContact: '',
        techSupportEmail: '',
        techSupportContact: '',
      }
    }
  }
  componentWillMount () {
    this.props.getEvents();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.helpDesk !== this.props.helpDesk) {
      let isEmpty = !Object.keys(this.props.helpDesk).length;
      if(!isEmpty){
        this.setState({
          helpDesk: this.props.helpDesk
        })
      }else{
        this.setState(prevState => ({
          helpDesk: {
            ...prevState.helpDesk,
            eventSupportEmail: '',
            eventSupportContact: '',
            techSupportEmail: '',
            techSupportContact: '',
          }
        }))
      }
    }
  }
  onChangeInput(event) {
    let helpDesk = { ...this.state.helpDesk };
    helpDesk[event.target.name] = event.target.value;
    this.setState({
      helpDesk: helpDesk
    });
  }
  handleEventChange (value) {
    if(value !== null){
     let helpDesk = {...this.state.helpDesk};
     helpDesk.event = value;
     this.setState({ helpDesk : helpDesk});
     this.props.getHelpDeskForEvent(value);
    }
    else{
      this.onReset();
    }
  }
  onSubmit () {
    let isEmpty = !Object.keys(this.props.helpDesk).length;
    if (isEmpty) { //post
      let helpDesk = _.pick(this.state.helpDesk , ['event', 'eventSupportEmail','eventSupportContact','techSupportEmail','techSupportContact']);
      this.props.createHelpDeskInfo(helpDesk);
      this.onReset();
    }
    else { //put
      let helpDesk = _.pick(this.state.helpDesk , ['event', 'eventSupportEmail','eventSupportContact','techSupportEmail','techSupportContact']);      
      let id = this.props.helpDesk._id;
      this.props.editHelpDeskInfo(id, helpDesk);
      this.onReset();
    }
  } 
  onReset(){
    this.setState(prevState => ({
      helpDesk: {
        ...prevState.helpDesk,
        event : '',
        eventSupportEmail: '',
        eventSupportContact: '',
        techSupportEmail: '',
        techSupportContact: '',
      }
    }))
  }
  render() {
    const { helpDesk } = {...this.state}
    return (
      <CardLayout name="Help Desk">
        <FormGroup row>
          <Col xs="12" md="4">
            <Select
              placeholder="Select Event"
              value={helpDesk.event}
              options={this.props.eventList}
              simpleValue
              onChange={this.handleEventChange.bind(this)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col xs="12" md="6">
            <InputElement
              icon="icon-envelope"
              type="email"
              placeholder="Event Support Email"
              name="eventSupportEmail"
              value={helpDesk.eventSupportEmail}
              onchanged={(event) => this.onChangeInput(event)}
            />
          </Col>
          <Col md="6">
            <InputElement
              icon="icon-phone"
              type="number"
              placeholder="Technical Support Contact"
              name="eventSupportContact"
              value={helpDesk.eventSupportContact}
              onchanged={(event) => this.onChangeInput(event)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col xs="12" md="6">
            <InputElement
              icon="icon-envelope"
              type="email"
              placeholder="Technical Support Email"
              name="techSupportEmail"
              value={helpDesk.techSupportEmail}
              onchanged={(event) => this.onChangeInput(event)}
            />
          </Col>
          <Col md="6">
            <InputElement
              icon="icon-phone"
              type="number"
              placeholder="Technical Support Contact"
              name="techSupportContact"
              value={helpDesk.techSupportContact}
              onchanged={(event) => this.onChangeInput(event)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col xs="12" md="3">
            <Button type="button" size="md" color="success" onClick={() => this.onSubmit()}>Submit</Button>
          </Col>
          <Col md="3">
            <Button type="button" size="md" color="danger" style={{ marginLeft: -160 }} >Reset</Button>
          </Col>
          <Col md="6">

          </Col>
        </FormGroup >
      </CardLayout>
    )
  }
}
const mapStateToProps = state => {
  return {
      eventList : state.event.eventList,
      helpDesk : state.staticPages.helpDesk
  };
}
const mapDispatchToProps = dispatch => {
  return {
    getEvents : () => dispatch(actions.getEvents()),
    getHelpDeskForEvent : (id) => dispatch(actions.getHelpDeskForEvent(id)),
    createHelpDeskInfo : (helpDesk) => dispatch(actions.createHelpDeskInfo(helpDesk)),
    editHelpDeskInfo : (id , helpDesk) => dispatch(actions.editHelpDeskInfo(id, helpDesk))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(HelpDesk);
