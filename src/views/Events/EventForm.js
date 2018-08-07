import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import _ from 'lodash';
import 'react-datepicker/dist/react-datepicker.css';
import InputElement from '../../components/Input/';
import CardLayout from '../../components/CardLayout/';
import {
    Input, InputGroup, InputGroupText, InputGroupAddon, Row, Col,
    Card, CardBody, Button, Label, FormGroup, Container
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Redirect, Link } from 'react-router-dom';

class EventForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Event: {
                id: "",
                eventName: "",
                venue: "",
                description: "",
                startDate: moment(),
                endDate: moment()
            },
            submitted: false, inValidDates: false, updateflag: false, endDateRequired : false,
            eventNameRequired: false, venueRequired : false, startDateRequired : false,
            descriptionRequired: false
        };
        this.redirectFunction = this.redirectFunction.bind(this);
    }

    componentWillMount() {
        if (this.props.match.params.id != undefined) {
            this.setState({ updateflag: true })
            let event = this.props.events.find(o => o._id === this.props.match.params.id);
            let Event = {
                id: event._id,
                eventName: event.eventName,
                venue: event.venue,
                description: event.description,
                startDate: moment(event.startDate),
                endDate: moment(event.endDate)
            }
          
            this.setState({
                Event: Event
            })
        }
    }

    changeFunction(date, type) {
        let Event = {
            ...this.state.Event,
        }
        Event[type] = date;
        this.setState({
            Event: Event, startDateRequired : false, 
            inValidDates: false, endDateRequired : false
        })
    }

    onChangeHandler(event) {
        let eventDetailArray = {
            ...this.state.Event
        };
        eventDetailArray[event.target.name] = event.target.value;
        this.setState({ Event: eventDetailArray,eventNameRequired: false, 
                       venueRequired : false, descriptionRequired: false,
        })
    }
    
    validateForm(){
        let event = { ...this.state.Event }
         let valiDate = moment(event["startDate"]).isBefore(event["endDate"]);
         let validSameDate = moment(event["startDate"]).isSame(event["endDate"]);

            !event.eventName ? this.setState({eventNameRequired: true }) : null;
            !event.startDate ? this.setState({ startDateRequired: true }) : null;
            !event.endDate ? this.setState({ endDateRequired: true }) : null;
            !event.venue ? this.setState({ venueRequired: true }) : null;
            !event.description ? this.setState({ descriptionRequired: true }) : null;
            !valiDate ||validSameDate ? this.setState({inValidDates : true}) : null;
    }

    onSubmitHandler() {
        let compRef = this;
        let event = { ...this.state.Event }
        this.setState({ submitted: true });
        this.validateForm();
      
         if (event.eventName && !this.state.inValidDates && event.venue && event.startDate && event.endDate && event.description ) {
            this.props.createEvent(event);
             setTimeout(()=> {
                 let  eventCreated = this.props.eventCreated;
                 compRef.Toaster(compRef, eventCreated,'Created')},1000);
        }
    }

   redirectFunction() {
      this.props.history.push('/events');
  }

  Toaster(compRef, successFlag, actionName) {
        if(successFlag){
                toast.success("Event "+ actionName + "Successfully.", {
                position: toast.POSITION.BOTTOM_RIGHT,
               }); 
               setTimeout(()=> {compRef.redirectFunction()},1000);
           }
        else{
            toast.error("Something went wrong", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
       }
  }

  onUpdateHandler() {
        let event = { ...this.state.Event }
        let compRef = this;
         validateForm();
        if (event.eventName && !this.state.inValidDates && event.venue && event.startDate && event.endDate&& event.description) {
            this.props.updateEvent(event);
            setTimeout(()=> {
                let  eventUpdated = this.props.eventUpdated;
                compRef.Toaster(compRef, eventUpdated,'Updated')},1000);
        }
    }

    resetField() {
        let Event = {eventName: "", description: "", venue: "",
                    startDate: moment(), endDate: moment() }
        this.setState({
            Event: Event, endDateRequired : false, eventNameRequired: false, 
            venueRequired : false, startDateRequired : false, inValidDates: false, descriptionRequired : false
        });
    }

    render() {
        if (this.state.updateflag) 
            this.buttons = <Button type="submit" size="md" color="success" onClick={this.onUpdateHandler.bind(this)} ><i className="icon-note"></i> Update</Button>
        else 
            this.buttons = <Button type="submit" size="md" color="success" onClick={this.onSubmitHandler.bind(this)} ><i className="icon-note"></i> Submit</Button>
        
        return (
            <CardLayout name="Event">
                <FormGroup row>
                    <Col xs="12" md="6">
                        <InputElement
                            type='text'
                            placeholder='Event Name'
                            name='eventName'
                            icon='icon-user'
                            value={this.state.Event.eventName}
                            required={this.state.eventNameRequired}
                            onchanged={(event) => this.onChangeHandler(event)} />
                    </Col>
                    <Col md="6">
                        <InputGroup className="mb-3">
                                <InputGroupText>
                                    <i className="icon-user"></i>
                                </InputGroupText>
                            <DatePicker
                                selected={this.state.Event.startDate}
                                onChange={(event) => this.changeFunction(event, "startDate")}
                                placeholderText="Select start date" />
                        </InputGroup>
                        {this.state.startDateRequired ? <div style={{ color: "red", marginTop: 0 }} className="help-block">startDate is Required</div> : null}
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col xs="12" md="6">
                        <InputGroup className="mb-3">
                                <InputGroupText>
                                    <i className="icon-user"></i>
                                </InputGroupText>
                            <DatePicker
                                selected={this.state.Event.endDate}
                                onChange={(event) => this.changeFunction(event, "endDate")}
                                placeholderText="Select start date" />
                        </InputGroup>
                        {this.state.endDateRequired ? <div style={{ color: "red", marginTop: 0 }} className="help-block">endDate is Required</div> : null}
                    </Col>
                    <Col md="6">
                        <InputElement
                            type='text'
                            placeholder='Description'
                            name='description'
                            icon='icon-phone'
                            value={this.state.Event.description}
                            required={this.state.descriptionRequired}
                            onchanged={(event) => this.onChangeHandler(event)} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col xs="12" md="6">
                        <InputElement
                            type='text'
                            placeholder='Venue'
                            name='venue'
                            icon='icon-phone'
                            value={this.state.Event.venue}
                            required={this.state.venueRequired}
                            onchanged={(event) => this.onChangeHandler(event)} />
                    </Col>
                </FormGroup >
                <FormGroup row>
                    <Col xs="8" md="3">
                        {this.buttons}
                    </Col>
                    <Col md="3">
                        <Button onClick={this.resetField.bind(this)} type="reset" size="md" color="danger" > Reset</Button>
                          <ToastContainer autoClose={2000} />
                    </Col>
                     <Col md="3">
                       {this.state.inValidDates ? <div style={{ color: "red", marginTop: 0 }} className="help-block">please enter valid start Date and end Date </div> : null}
                    </Col>
                </FormGroup>
            </CardLayout>
        );
    }
}

const mapStateToProps = state => {
    return {
        events: state.event.events,
        eventCreated : state.event.eventCreated,
        eventUpdated : state.event.eventUpdated
    };
}

const mapDispatchToProps = dispatch => {
    return {
        createEvent: (event) => dispatch(actions.createEvent(event)),
        updateEvent: (event) => dispatch(actions.updateEvent(event))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);
