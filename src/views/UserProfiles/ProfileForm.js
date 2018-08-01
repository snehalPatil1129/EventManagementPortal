import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputElement from '../../components/Input/';
import CardLayout from '../../components/CardLayout/';
import { Input, Row, Col, Button, Label, FormGroup } from 'reactstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import * as actions from '../../store/actions/index';
import _ from 'lodash';

class ProfileForm extends Component {
   constructor(props) {
        super(props);
        this.state = {
            Profile:
            {
                profileId : '',
                profileName: '',
                eventValue: ''
            },
            updateflag : false,
            submitted : false
        }
    }
    componentWillMount(){
        this.props.getEvents();

        let profileId = this.props.match.params.id;

            if (profileId!= undefined) {
            this.setState({ updateflag: true })
            let profile = this.props.profiles.find(o => o._id === profileId);
           
            let ProfileObj  = {
              profileId : profile._id,
              profileName: profile.profileName,
              eventValue: profile.eventId 
            }

            this.setState({
             Profile : ProfileObj
            })
        }
    }

  handleEventSelectChange(value) {
    let eventValue = value;
    let Profile = {
        ...this.state.Profile
    }
    Profile['eventValue'] = eventValue;
    this.setState({
      Profile : Profile
    });
  }

    onChangeHandler(event) {
        let Profile = {
            ...this.state.Profile
        };
        Profile[event.target.name] = event.target.value;
        this.setState({
            Profile: Profile
        })
    }

    onSubmitHandler() {
        let profile = {
            ...this.state.Profile
        }
        this.setState({
            submitted: true
        });
    
        if (profile.profileName &&  profile.eventValue){
         this.props.createProfile(profile);
          this.props.history.push('/profiles');
        }
    }

    onUpdateHandler() {
        let profile = {
            ...this.state.Profile
        }
          if (profile.profileName &&  profile.eventValue){
         this.props.updateProfile(profile);
          this.props.history.push('/profiles');
        }
    }

    resetField() {
        let Profile = {
            profileName: '',
            eventValue: ''
        }
        this.setState({
            Profile: Profile
        });
    }

    render() {
        const eventList = this.props.eventList;
        const {eventValue} = this.state.Profile;
        this.headerText = '';

        if (this.state.updateflag) {
            this.headerText = "Profile";
            this.buttons = <Button type="submit" size="md" color="success" onClick={this.onUpdateHandler.bind(this)} ><i className="icon-note"></i> Update</Button>
        }
        else {
            this.headerText = "Profile Form";
            this.buttons = <Button type="submit" size="md" color="success" onClick={this.onSubmitHandler.bind(this)} ><i className="icon-note"></i> Add Profile</Button>
        }
        
        return (
            <CardLayout name="Profile">
                 <FormGroup row>
                    <Col xs="12" md="6">
                  <Select
                   placeholder="Select Event Name"
                   value={eventValue}
                   options={eventList}
                   simpleValue
                  onChange={this.handleEventSelectChange.bind(this)}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="6">
                        <InputElement
                            type='text'
                            placeholder='Profile Name'
                            name='profileName'
                            icon='icon-user'
                            value={this.state.Profile.profileName}
                            onchanged={(profile) => this.onChangeHandler(profile)} />
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
            </CardLayout>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      eventList : state.event.eventList,
      profiles : state.profile.profiles
    }
}

const matchDispatchToProps = (dispatch) => {
    return {
    getEvents: () => dispatch(actions.getEvents()),
    createProfile: (profile) => dispatch(actions.createProfile(profile)),
    updateProfile: (profile) => dispatch(actions.updateProfile(profile)),
    }
}
export default connect(mapStateToProps, matchDispatchToProps)(ProfileForm);