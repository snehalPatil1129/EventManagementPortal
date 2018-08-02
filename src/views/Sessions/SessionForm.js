import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import InputElement from '../../components/Input/';
import CardLayout from '../../components/CardLayout/';
import {
    Input, InputGroup, InputGroupText, InputGroupAddon, Row,
    Col, Card, CardBody, Button, Label, FormGroup, Container
} from 'reactstrap';
import moment from 'moment';
import _ from 'lodash'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Calendar from '../../components/Calendar/'

class SessionForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Session: {
                sessionId: '', sessionName: '', room: '', event: '',
                description: '', extraServices: '', speakers: [], volunteers: [],
                startTime: '', endTime: '', sessionCapacity: '',
                sessionType: 'test', isBreak: false, isRegistrationRequired: false
            },
            submitted: false, calendarSessionList: [], eventValue: '',
            roomValue: '', speakerValue: '', volunteerValue: '', updateFlag: false
        }
    }

    componentDidMount () {
        this.props.getEvents();
        this.props.getAttendees();
        this.props.getRooms();
        this.props.getSessions();
    }

    onChangeHandler(session) {
        let sessionDetails = {
            ...this.state.Session
        };
        sessionDetails[session.target.name] = session.target.value;
        this.setState({
            Session: sessionDetails
        })
    }

    changeRoom(roomValue) {
        let Session = { ...this.state.Session };
        Session['room'] = roomValue;
        let calendarSessionList = [];
        this.setState({ roomValue, Session: Session });

        if (this.state.eventValue && roomValue) {
            this.props.sessions.forEach(session => {
                if (session.event == this.state.eventValue && session.room == roomValue) {
                    let sessionObj = Object.assign({}, session)
                    let sessionTimeDetails = ({ start: moment(session.startTime).toDate(), end: moment(session.endTime).toDate(), title: session.sessionName })
                    calendarSessionList.push(Object.assign({}, sessionObj, sessionTimeDetails));

                    this.setState({ calendarSessionList: calendarSessionList })
                }
            })
        }
    }

    changeEvent(eventValue) {
        let volunteerList = [], speakerList = [], roomList = [];
        let attendees = this.props.attendees;
        let rooms = this.props.rooms;
        let Session = { ...this.state.Session };
        Session['event'] = eventValue;

        this.setState({
            eventValue,
            Session: Session
        })

        rooms.forEach(room => {
            if (room.event._id == eventValue) {
                roomList.push({ label: room.roomName, value: room._id })
            }
        })

        attendees.forEach(attendee => {
            if(attendee.event !== null){
                if (attendee.event._id == eventValue) {
                    attendee.profiles.forEach(profile => {
                        if (profile == 'Volunteer') {
                            volunteerList.push({ label: attendee.firstName + ' ' + attendee.lastName, value: attendee._id })
                        }
                        if (profile == 'Speaker') {
                            speakerList.push({ label: attendee.firstName + ' ' + attendee.lastName, value: attendee._id })
                        }
                    })
                }
            } 
        });
        this.setState({
            roomList, volunteerList, speakerList
        })
    }

    changeSpeakers(speakerValue) {
        if (speakerValue !== null) {
            let Session = { ...this.state.Session };
            let speakerArray = [];
            speakerArray.push(speakerValue);
            let len = speakerArray.length;

            if (len) {
                let lastEle = speakerArray[len - 1];
                Session.speakers = lastEle.split(',');
                this.setState({ Session: Session, speakerValue });
            }
        }
    }

    changeVolunteers(volunteerValue) {
        if (volunteerValue !== null) {
            let Session = { ...this.state.Session };
            let volunteerArray = [];
            volunteerArray.push(volunteerValue);
            let len = volunteerArray.length;

            if (len) {
                let lastEle = volunteerArray[len - 1]
                Session.volunteers = lastEle.split(',');
                this.setState({ Session: Session, volunteerValue });
            }
        }
    }

    onSubmitHandler() {
        let session = { ...this.state.Session }
        this.setState({ submitted: true });

        if (session.sessionName) {
            this.props.createSession(session);
        }
    }

    onUpdateHandler() {
        let session = { ...this.state.Session }
        if (session.sessionName) {
            this.props.updateSession(session);
        }
    }

    onDeleteHandler() {
        let session = { ...this.state.Session }
        this.props.deleteSession(session._id);
    }

    selectSlot(slotInfo) {
        alert(
            `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
            `\nend: ${slotInfo.end.toLocaleString()}` +
            `\naction: ${slotInfo.action}`
        )
        let Session = { ...this.state.Session }

        Session['startTime'] = slotInfo.start.toString();
        Session['endTime'] = slotInfo.end.toString();
        this.setState({ Session: Session });
    }

    selectSession(session) {
        let sessionObj = ({ ...this.state.Session })
        sessionObj = Object.assign({}, session);

        this.setState({
            Session: sessionObj, updateFlag: true,
            speakerValue: sessionObj.speakers, volunteerValue: sessionObj.volunteers
        })
    }

    resetField() {
        let Session = {
            sessionId: '', sessionName: '', 
            description: '', extraServices: '', speakers: [],
            volunteers: [], startTime: '', endTime: '', sessionCapacity: ''
        }
        this.setState({
            Session: Session, speakerValue: '', volunteerValue: '', updateFlag: false
        });
    }
    render() {
        this.deleteButton = '';
        if (this.state.updateFlag) {
            this.buttons = <Button type="submit" size="md" color="success" onClick={this.onUpdateHandler.bind(this)} ><i className="icon-note"></i> Update</Button>
            this.deleteButton = <Button type="submit" size="md" color="danger" onClick={this.onDeleteHandler.bind(this)} ><i className="icon-trash"></i> Delete</Button>
        }
        else
            this.buttons = <Button type="submit" size="md" color="success" onClick={this.onSubmitHandler.bind(this)} ><i className="icon-note"></i> Register</Button>

        return (
            <div>
                <FormGroup row>
                    <Col xs="12" md="6">
                        <Select
                            onChange={this.changeEvent.bind(this)}
                            placeholder="--Select Event--"
                            simpleValue value={this.state.eventValue}
                            options={this.props.eventList} />
                    </Col>
                    <Col xs="12" md="6">
                        <Select onChange={this.changeRoom.bind(this)}
                            placeholder="--Select Room--"
                            simpleValue value={this.state.roomValue}
                            options={this.state.roomList} />
                    </Col>
                </FormGroup>
                <Row>
                    <Col md='8'>
                        <Calendar events={this.state.calendarSessionList} onSelectSlot={(slotInfo) => this.selectSlot(slotInfo)}
                            selectSession={event => this.selectSession(event)} />
                    </Col>
                    <Col md='4'>
                        <CardLayout name="">
                            <FormGroup row>
                                <Col xs="12">
                                    <InputElement
                                        type='text' placeholder='Session Name'
                                        name='sessionName' icon='icon-user'
                                        value={this.state.Session.sessionName}
                                        onchanged={(session) => this.onChangeHandler(session)} />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col xs="12">
                                    <Select multi onChange={this.changeSpeakers.bind(this)} placeholder="--Select Speakers--" simpleValue value={this.state.speakerValue} options={this.state.speakerList} />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col xs="12">
                                    <Select multi placeholder="--Select Volunteers-- "
                                        simpleValue value={this.state.volunteerValue}
                                        options={this.state.volunteerList}
                                        onChange={this.changeVolunteers.bind(this)} />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col xs="12">
                                    <InputElement
                                        type='text' placeholder='Description'
                                        name='description' icon='icon-phone'
                                        value={this.state.Session.description}
                                        onchanged={(session) => this.onChangeHandler(session)} />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col xs="12">
                                    <InputElement
                                        type='number' placeholder='Session Capacity'
                                        name='sessionCapacity' icon='icon-phone'
                                        value={this.state.Session.sessionCapacity}
                                        onchanged={(session) => this.onChangeHandler(session)} />
                                </Col>
                            </FormGroup >

                            <FormGroup row>
                                <Col xs="8" md="3">
                                    {this.buttons}
                                </Col>
                                <Col xs="8" md="3">
                                    {this.deleteButton}
                                </Col>
                                <Col md="3">
                                    <Button onClick={this.resetField.bind(this)} type="reset" size="md" color="danger" > Reset</Button>
                                </Col>
                            </FormGroup>
                        </CardLayout>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        eventList: state.event.eventList,
        rooms: state.room.rooms,
        attendees: state.registration.attendeeList,
        sessions: state.session.sessions,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getEvents: () => dispatch(actions.getEvents()),
        getAttendees: () => dispatch(actions.getAttendees()),
        getRooms: () => dispatch(actions.getRooms()),
        createSession: (session) => dispatch(actions.createSession(session)),
        getSessions: () => dispatch(actions.getSessions()),
        deleteSession: (sessionId) => dispatch(actions.deleteSession(sessionId)),
        updateSession: (session) => dispatch(actions.updateSession(session))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);