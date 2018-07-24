import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { FormGroup, Col, Button, Input, InputGroup } from 'reactstrap';
import InputElement from '../../components/Input/';
import CardLayout from '../../components/CardLayout/';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import _ from 'lodash';

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Registration: {
                firstName: '', lastName: '', email: '', contact: '', profiles: [],
                briefInfo: '', profileImageURL: '', event: ''
            },
            firstNameRequired: false, lastNameRequired: false, emailRequired: false, contactRequired: false, eventRequired: false,
            editAttendee: false  , profileList : []
        }
    }
    componentDidMount() {
        let isEmpty = !Object.keys(this.props.attendeeData).length;
        if (this.props.match.params.id !== undefined &&  !isEmpty) {
            let Attendee = _.pick(this.props.attendeeData , ['firstName', 'lastName', 'email', 'contact', 'briefInfo', 'profileImageURL']);
            Attendee.event = this.props.attendeeData.event._id;
            Attendee.profiles = this.props.attendeeData.profiles;
            Attendee._id = this.props.attendeeData._id;
            let profiles = [];
            this.props.profiles.forEach(profile => {
                if (profile.eventId == this.props.attendeeData.event._id)
                    profiles.push({ value: profile._id, label: profile.profileName })
            });
            this.setState({
                Registration: Attendee,
                editAttendee: true,
                profileList : profiles
            });
        }
    }
    onChangeInput(event) {
        const { Registration } = { ...this.state };
        Registration[event.target.name] = event.target.value;
        this.setState({ Registration: Registration });
    }
    onSubmit() {
        let attendee = { ...this.state.Registration };
        if (attendee.firstName && attendee.lastName && attendee.email && attendee.contact && attendee.event) {
            let editedAttendee = _.pick(attendee, ['firstName', 'lastName', 'email', 'contact', 'briefInfo', 'profileImageURL', 'event', 'profiles']);
            this.state.editAttendee ? this.props.editAttendeeData(attendee._id, editedAttendee) : this.props.createAttendee(attendee);
            this.onReset();
            this.props.history.push('/registrationList');
        }
        else {
            !attendee.firstName ? this.setState({ firstNameRequired: true }) : null;
            !attendee.lastName ? this.setState({ lastNameRequired: true }) : null;
            !attendee.email ? this.setState({ emailRequired: true }) : null;
            !attendee.contact ? this.setState({ contactRequired: true }) : null;
            !attendee.event ? this.setState({ eventRequired: true }) : null;
        }
    }
    onReset() {
        let Registration = { ...this.state.Registration };
        Registration.firstName = ''; Registration.lastName = ''; Registration.email = ''; Registration.contact = '';
        Registration.profiles = []; Registration.briefInfo = ''; Registration.profileImageURL = ''; Registration.event = '';
        this.setState({ Registration: Registration });
    }
    handleEventSelectChange(value) {
        if (value !== null) {
            let Registration = { ...this.state.Registration };
            Registration.event = value;
            let profiles = [];
            this.props.profiles.forEach(profile => {
                if (profile.eventId === value)
                    profiles.push({ value: profile._id, label: profile.profileName })
            });
            this.setState({ Registration: Registration ,profileList : profiles });
        }
        else{
            let Registration = { ...this.state.Registration };
            Registration.event = '';
            this.setState({ Registration: Registration });
        }
    }
    handleSelectChange(value) {
        if (value !== null) {
            let profileArray = this.state.Registration.profiles;
            profileArray.push(value);
            let len = profileArray.length;
            let { Registration } = this.state;
            if (len) {
                let lastEle = Registration.profiles[len - 1]
                let profilesArray = lastEle.split(',');
                Registration.profiles = profilesArray;
                this.setState({ Registration: Registration });
            }
        }
    }
    getAttendeeDetails() {
        let Registration = { ...this.state.Registration };
        Registration = this.props.attendeeData;
        this.setState({
            Registration: Registration
        });
    }
    render() {
        const { Registration } = { ...this.state };
        const eventOptions = this.props.eventList;
        return (
            <CardLayout name="Registration">
                <FormGroup row>
                    <Col xs="12" md="6">
                        <InputElement
                            type='text'
                            placeholder='First Name'
                            name='firstName'
                            icon='icon-user'
                            value={Registration.firstName}
                            required={this.state.firstNameRequired}
                            onchanged={(event) => this.onChangeInput(event)}
                        />
                    </Col>
                    <Col md="6">
                        <InputElement
                            type='text'
                            placeholder='Last Name'
                            name='lastName'
                            icon='icon-user'
                            value={Registration.lastName}
                            required={this.state.lastNameRequired}
                            onchanged={(event) => this.onChangeInput(event)}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col xs="12" md="6">
                        <InputElement
                            type='email'
                            placeholder='Email'
                            name='email'
                            icon='icon-envelope'
                            value={Registration.email}
                            required={this.state.emailRequired}
                            onchanged={(event) => this.onChangeInput(event)}
                        />
                    </Col>
                    <Col md="6">
                        <InputElement
                            type='number'
                            placeholder='Contact Number'
                            name='contact'
                            icon='icon-phone'
                            value={Registration.contact}
                            required={this.state.emailRequired}
                            onchanged={(event) => this.onChangeInput(event)}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col xs="12" md="6">
                        <Select
                            placeholder="Select Event"
                            value={Registration.event}
                            options={eventOptions}
                            simpleValue
                            onChange={this.handleEventSelectChange.bind(this)}
                        />
                        {this.state.eventRequired ? <div style={{ color: "red", marginTop: 0 }} className="help-block">*Required</div> : null}
                    </Col>
                    <Col md="6">
                        <InputElement
                            type='text'
                            placeholder='Brief Info'
                            name='briefInfo'
                            icon='icon-info'
                            value={Registration.briefInfo}
                            onchanged={(event) => this.onChangeInput(event)}
                        />
                    </Col>
                </FormGroup >
                <FormGroup row>
                    <Col xs="12" md="6">
                        <InputElement
                            type='text'
                            placeholder='Profile Image URL'
                            name='profileImageURL'
                            icon='icon-link'
                            value={Registration.profileImageURL}
                            onchanged={(event) => this.onChangeInput(event)}
                        />
                    </Col>
                    <Col md="6">
                        <Select
                            multi
                            placeholder="Select Profiles"
                            value={Registration.profiles}
                            options={this.state.profileList}
                            simpleValue
                            onChange={this.handleSelectChange.bind(this)}
                        />
                        {this.state.Registration.event === '' ? <div style={{ color: "red", marginTop: 0 }} className="help-block">*Please select event first !!</div> : null}
                    </Col>
                </FormGroup >
                <FormGroup row>
                    <Col xs="12" md="3">
                        <Button type="button" size="md" color="success" onClick={() => this.onSubmit()} >Submit</Button>
                    </Col>
                    <Col md="3">
                        <Button type="button" size="md" color="danger" style={{ marginLeft: -150 }} onClick={() => this.onReset()} >Reset</Button>
                    </Col>
                    <Col md="6">
                        <div style={{ color: "red" }} className="help-block">{this.props.registrationError}</div>
                    </Col>
                </FormGroup >
            </CardLayout>
        )
    }
}
const mapStateToProps = state => {
    return {
        registrationError: state.registration.error,
        attendeeData: state.registration.attendeeData,
        eventList: state.event.eventList,
        profiles : state.profile.profiles
    };
}
const mapDispatchToProps = dispatch => {
    return {
        createAttendee: (attendee) => dispatch(actions.createAttendee(attendee)),
        getAttendeeData: (id) => dispatch(actions.getAttendeeData(id)),
        editAttendeeData: (id, attendee) => dispatch(actions.editAttendeeData(id, attendee))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Registration);
