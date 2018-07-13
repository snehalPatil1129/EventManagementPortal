import React, { Component } from 'react';
import axios from 'axios';
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
            Registration : {
                firstName : '',
                lastName :'',
                email : '',
                contact : '',
                profiles : [],
                briefInfo : '',
                profileImageURL : '',
                eventId : ''
            },
            existingAttendee : false
        }
    }
    componentDidMount () {
        if(this.props.match.params.id !== undefined) {
            this.setState({
                Registration: this.props.attendeeData,
                existingAttendee :  true
            });
        }
    }
    onChangeInput(event) {
        const { Registration } = { ...this.state };
        Registration[event.target.name] = event.target.value;
        this.setState ({Registration : Registration});
    }
    onSubmit() {
        let attendee = {...this.state.Registration};
        if(attendee.firstName && attendee.lastName && attendee.email &&attendee.contact){
                if(this.state.existingAttendee){
                    let editedAttendee = _.pick(attendee , ['firstName' , 'lastName' , 'email' , 'contact' , 'briefInfo' , 'profileImageURL']);
                    this.props.editAttendeeData(attendee._id , editedAttendee);
                    this.onReset();
                }
                else{
                    this.props.createAttendee(attendee);
                    this.onReset();
                }
       }
       else{
            alert("plz fill required fields");
       }   
    }
    onReset() {
        let Registration = { ...this.state.Registration };
        Registration.firstName = ''; Registration.lastName = ''; Registration.email = ''; Registration.contact = '';
        Registration.profiles = []; Registration.briefInfo = ''; Registration.profileImageURL = ''; Registration.event = '';
        this.setState({ Registration: Registration });
    }
    handleSelectChange(value) {
        if(value !== null){
            let profileArray = this.state.Registration.profiles;
            profileArray.push(value);
            let len = profileArray.length;
            let { Registration } = this.state;
            if (len) {
              let lastEle = Registration.profiles[len - 1]
              let profilesArray = lastEle.split(',');
              Registration.profiles = profilesArray;
              this.setState({Registration : Registration});
            }
        }
    }
    getAttendeeDetails () {
        let Registration = { ...this.state.Registration };
        Registration = this.props.attendeeData;
        this.setState({
            Registration: Registration
        });
    }
    render() {
        return (
            <CardLayout name="Registration">
                <FormGroup row>
                    <Col xs="12" md="6">
                        <InputElement
                            type= 'text'
                            placeholder = 'First Name'
                            name = 'firstName'
                            icon = 'icon-user'
                            value = {this.state.Registration.firstName}
                            onchanged = {(event) => this.onChangeInput(event)}
                        />
                    </Col>
                    <Col md="6">
                        <InputElement
                            type= 'text'
                            placeholder = 'Last Name'
                            name = 'lastName'
                            icon = 'icon-user'
                            value = {this.state.Registration.lastName}
                            onchanged = {(event) => this.onChangeInput(event)}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col xs="12" md="6">
                        <InputElement
                            type= 'email'
                            placeholder = 'Email'
                            name = 'email'
                            icon = 'icon-envelope'
                            value = {this.state.Registration.email}
                            onchanged = {(event) => this.onChangeInput(event)}
                        />
                    </Col>
                    <Col md="6">
                        <InputElement
                            type= 'number'
                            placeholder = 'Contact Number'
                            name = 'contact'
                            icon = 'icon-phone'
                            value = {this.state.Registration.contact}
                            onchanged = {(event) => this.onChangeInput(event)}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col xs="12" md="6">
                        <Select
                            multi
                            placeholder="Select Profiles"
                            //value={value}
                            //options={options}
                            simpleValue
                            onChange={this.handleSelectChange.bind(this)}
                        />
                    </Col>
                    <Col md="6">
                        <InputElement
                            type= 'text'
                            placeholder = 'Brief Info'
                            name = 'briefInfo'
                            icon = 'icon-info'
                            value = {this.state.Registration.briefInfo}
                            onchanged = {(event) => this.onChangeInput(event)}
                        />
                    </Col>
                </FormGroup >
                <FormGroup row>
                    <Col xs="12" md="6">
                    <InputElement
                            type= 'text'
                            placeholder = 'Profile Image URL'
                            name = 'profileImageURL'
                            icon = 'icon-link'
                            value = {this.state.Registration.profileImageURL}
                            onchanged = {(event) => this.onChangeInput(event)}
                        />
                    </Col>
                    <Col md="6">
                        <InputElement
                            type= 'text'
                            placeholder = 'Event'
                            name = 'eventId'
                            icon = 'icon-calendar'
                            value = {this.state.Registration.eventId}
                            onchanged = {(event) => this.onChangeInput(event)}

                        />
                    </Col>
                </FormGroup >
                <FormGroup row>
                <Col xs="12" md="6">
                <Button type="button" size="md" color="success" onClick={() => this.onSubmit()} >SUBMIT</Button>
                </Col>
                    <Col  md="6">
                        <div style={{ color: "red" }} className="help-block">{this.props.error}</div>
                    </Col>
                </FormGroup >
            </CardLayout>
        )
    }
}

const mapStateToProps = state => {
    return {
        error: state.registration.error,
        attendeeData : state.registration.attendeeData
    };
}

const mapDispatchToProps = dispatch => {
    return {
        createAttendee : (attendee) => dispatch(actions.createAttendee(attendee)),
        getAttendeeData : (id) => dispatch(actions.getAttendeeData(id)),
        editAttendeeData : (id , attendee) => dispatch(actions.editAttendeeData(id ,attendee)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
