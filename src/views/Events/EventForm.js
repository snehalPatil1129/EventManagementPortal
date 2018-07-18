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
            submitted: false,
            inValidDates: false,
            updateflag: false
        };
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
            Event: Event,
            inValidDates: false
        })
    }

    onChangeHandler(event) {
        let eventDetailArray = {
            ...this.state.Event
        };
        eventDetailArray[event.target.name] = event.target.value;
        this.setState({
            Event: eventDetailArray
        })
    }

    onSubmitHandler() {
        let event = {
            ...this.state.Event
        }
        this.setState({
            submitted: true
        });
        let valiDate = moment(event["startDate"]).isBefore(event["endDate"]);
        //let validSameDate = moment(event["startDate"]).isSame(event["endDate"]);
        if (!valiDate) {
            this.setState({
                inValidDates: true
            });
        }
        if (event.eventName && valiDate && event.description) {
            this.props.createEvent(event);
        }

    }

    onUpdateHandler() {
        let event = {
            ...this.state.Event
        }
        if (event.eventName && event.description) {
            this.props.updateEvent(event);
        }
    }

    resetField() {
        let Event = {
            eventName: "",
            description: "",
            venue: "",
            startDate: moment(),
            endDate: moment()
        }
        this.setState({
            Event: Event
        });
    }

    render() {
        //const purchasedRedirect = this.props.eventCreated ?  <Link to={'/events'}/> : null;
        this.headerText = '';
        if (this.state.updateflag) {
            this.headerText = "Event";
            this.buttons = <Button type="submit" size="md" color="success" onClick={this.onUpdateHandler.bind(this)} ><i className="icon-note"></i> Update</Button>
        }
        else {
            this.headerText = "Event Form";
            this.buttons = <Button type="submit" size="md" color="success" onClick={this.onSubmitHandler.bind(this)} ><i className="icon-note"></i> Register</Button>
        }
        return (
            <div>
                <ToastContainer autoClose={2000} />
                <div className="animated fadeIn">
                    <Container>
                        <Row className="justify-content-left">
                            <Col md="8">
                                <Card className="mx-6">
                                    <CardBody className="p-4">
                                        <h1>{this.headerText}</h1>
                                        <FormGroup row>
                                            <Col xs="12" >
                                                <InputGroup className="mb-3">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="icon-user"></i>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                        type="text"
                                                        placeholder="Event Name"
                                                        name="eventName"
                                                        value={this.state.Event.eventName}
                                                        onChange={this.onChangeHandler.bind(this)} />
                                                    {this.state.submitted && !this.state.Event.eventName &&
                                                        <div className="help-block" style={{ color: "red" }}>*Required</div>
                                                    }
                                                </InputGroup>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Col xs="12" md="6" >
                                                <InputGroup className="mb-3">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="icon-user"></i>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <DatePicker
                                                        id="start"
                                                        selected={this.state.Event.startDate}
                                                        onChange={(event) => this.changeFunction(event, "startDate")}
                                                        placeholderText="Select start date"
                                                    />
                                                    {this.state.submitted && this.state.inValidDates &&
                                                        <div className="help-block" style={{ color: "red" }}>*Invalid date</div>
                                                    }
                                                </InputGroup>
                                            </Col>
                                            <Col md="6" >
                                                <InputGroup className="mb-6">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="icon-user"></i>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <DatePicker
                                                        selected={this.state.Event.endDate}
                                                        onChange={(event) => this.changeFunction(event, "endDate")}
                                                        placeholderText="Select End date"
                                                    />
                                                    {this.state.submitted && this.state.inValidDates &&
                                                        <div className="help-block" style={{ color: "red" }}>*Invalid date</div>
                                                    }
                                                </InputGroup>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Col xs="12" md="6" >
                                                <InputGroup className="mb-3">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="icon-user"></i>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                        type="text"
                                                        placeholder="Description"
                                                        name="description"
                                                        value={this.state.Event.description}
                                                        onChange={this.onChangeHandler.bind(this)} />
                                                    {this.state.submitted && !this.state.Event.description &&
                                                        <div className="help-block" style={{ color: "red" }}>*Required</div>
                                                    }
                                                </InputGroup>
                                            </Col>
                                            <Col md="6" >
                                                <InputGroup className="mb-3">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="icon-user"></i>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                        type="text"
                                                        placeholder="Venue"
                                                        name="venue"
                                                        value={this.state.Event.venue}
                                                        onChange={this.onChangeHandler.bind(this)} />
                                                    {this.state.submitted && !this.state.Event.venue &&
                                                        <div className="help-block" style={{ color: "red" }}>*Required</div>
                                                    }
                                                </InputGroup>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Col xs="8" md="3">
                                                {this.buttons}
                                            </Col>
                                            <Col md="3">
                                                <Button onClick={this.resetField.bind(this)} type="reset" size="md" color="danger" > Reset</Button>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            {/* {purchasedRedirect}  */}
                                        </FormGroup>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        events: state.event.events
    };
}

const mapDispatchToProps = dispatch => {
    return {
        createEvent: (event) => dispatch(actions.createEvent(event)),
        updateEvent: (event) => dispatch(actions.updateEvent(event))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);
