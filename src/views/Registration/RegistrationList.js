import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link ,Redirect} from 'react-router-dom';
import * as actions from '../../store/actions/index';
import { FormGroup, Col, Button, Input, InputGroup } from 'reactstrap';
import CardLayout from '../../components/CardLayout/';
import * as attendeeCardMethod from '../../components/AttendeeCard/';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class RegistrationList extends Component {
    constructor(props) {
        super(props);
        this.state = {
           event : '',
           profile : ''
        }
    }
    componentDidMount () {
        let compRef = this;
        this.props.getAttendeeList();
        this.props.getProfiles();
        setTimeout(() => {
            let getAttendeeError = compRef.props.getAttendeeError;
            if(getAttendeeError) {
                toast.error("Something went wrong", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }
        }, 1000);
        this.props.getEvents();
        this.props.getProfiles();
    }

     onPrintAttendeeQRCode(cell, row) {
        let componentRef = this;
        return <Link to={this} onClick={() => attendeeCardMethod.onGenerateQRcode(row)}>
            <i className="fa fa-print"></i>
        </Link>
    }

    ondeleteAttendee (cell, row) {
        return  <Link to={this}  onClick={() =>  this.deleteAttendee(row._id)}>
                    <i className="fa fa-trash"></i>
                </Link> 
    }

    deleteAttendee (id) {
        this.props.deleteAttendee(id);
        let compRef = this;      
        setTimeout(() => {
            let deleteAttendeeError = compRef.props.deleteAttendeeError;
            compRef.Toaster(compRef, deleteAttendeeError, 'Delete')
        }, 1000);
    }

    Toaster(compRef, deleteAttendeeError, actionName) {
        if (!deleteAttendeeError) {
            toast.success("Attendee " + actionName + " Successfully.", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
        else {
            toast.error("Something went wrong", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    }

    onEditAttendee (cell, row) {
        return  <Link to={`${this.props.match.url}/registration/${row._id}`} onClick={() => this.props.storeAttendeeData(row) }>
                    <i className="fa fa-pencil"></i>
                </Link>  
    }

    getSelectedRowKeys() {
     let selectedUsersId = this.refs.table.state.selectedRowKeys;
      let users = [];
      this.props.attendeeList.forEach( attendee =>{
         selectedUsersId.forEach(userId =>{
           if(attendee._id == userId){
           users.push({userInfo :attendee})}
         })
      })
        attendeeCardMethod.generateQRcodeBulk(users, this.state.eventName, this.state.profile);
    }

    handleEventChange (value) {

        value !== null ? ( this.setState({ event : value}) , this.props.getAttendeesForEvent(value)) 
        : (this.setState ({ event : ''}) ,  this.props.getAttendeeList());
          let profileList = [], eventName;
            this.props.profiles.forEach(profile => {
                if (profile.event._id === value)
                    profileList.push({ value: profile.profileName, label: profile.profileName })
            });

         this.props.eventList.forEach(event =>{
           if(event.value == value)
             eventName = event.label
         })
            this.setState({profileList, eventName});
    }

    handleProfileChange (value) {
       this.setState({profile:value})
        this.props.getAttendeesForEventAndProfile(this.state.event, value);
    }

    render() {
          const options = {
            sizePerPageList: [{
                text: '250', value: 250
                },{
                text: '500', value: 500
                },{
                text: '1000', value: 1000
                }, {
                text: 'All', value: this.props.attendeeList.length
                } ], 
                sizePerPage: 250,
        };
          const selectRowProp = {
            mode: 'checkbox'
        };
            
        return (
            <CardLayout name="Attendee List">
                <FormGroup row>
                    <Col xs="12" md="8">
                        <Link to={`${this.props.match.url}/registration`}>
                            <Button type="button" color="primary" style ={{marginLeft : -14}} size="small"> <i className="fa fa-plus"></i>
                                Add Attendee </Button>
                        </Link> &nbsp;&nbsp;
                         <Button type="button" onClick={this.getSelectedRowKeys.bind(this)} color="success">
                                            <i className="fa fa-print"></i>
                            Print QR Code For All
                        </Button>
                    </Col>
                 </FormGroup> &nbsp;&nbsp;
                   <FormGroup row>
                    <Col md="4">
                        <Select 
                            name= "Event"
                            placeholder =  "Select Event"
                            options = {this.props.eventList}
                            value = {this.state.event}
                            simpleValue
                            onChange = {this.handleEventChange.bind(this)}
                            />
                    </Col>
                     <Col md="4">
                        <Select 
                            name= "Profile"
                            placeholder =  "Select Profile"
                            options = {this.state.profileList}
                            value = {this.state.profile}
                            simpleValue
                            onChange = {this.handleProfileChange.bind(this)}
                            />
                    </Col>
                </FormGroup>
                <FormGroup row>
                       <BootstrapTable ref='table' data={this.props.attendeeList} pagination={true} search={true}
                                            selectRow={selectRowProp} options={options} >
                        <TableHeaderColumn dataField='_id' headerAlign='left' isKey hidden>Id</TableHeaderColumn>
                        <TableHeaderColumn dataField='firstName' headerAlign='left' width='100' csvHeader='First Name'>First Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='lastName' headerAlign='left' width='100' csvHeader='Last Name'>Last Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='email' headerAlign='left' width='100' csvHeader='Email'>Email</TableHeaderColumn>
                        <TableHeaderColumn dataField='eventName' headerAlign='left' width='100' csvHeader='Event'>Event</TableHeaderColumn>
                        <TableHeaderColumn dataField='edit' dataFormat={this.onEditAttendee.bind(this)} headerAlign='left' width='40' export={false}>Edit</TableHeaderColumn>
                        <TableHeaderColumn dataField='delete' dataFormat={this.ondeleteAttendee.bind(this)} headerAlign='left' width='40' export={false}>Delete</TableHeaderColumn>
                        <TableHeaderColumn dataField='print' dataFormat={this.onPrintAttendeeQRCode.bind(this)} headerAlign='left' width='30' export={false}></TableHeaderColumn>
                    </BootstrapTable>
                </FormGroup>
                <FormGroup row>
                    <Col md="6">
                        <div style={{ color: "red" }} className="help-block">{this.props.registrationError}</div>
                    </Col>
                    <ToastContainer autoClose={2000} />
                </FormGroup>
            </CardLayout>
        )
    }
}

const mapStateToProps = state => {
    return {
        registrationError: state.registration.error,
        attendeeList : state.registration.attendeeList,
        eventList :  state.event.eventList,
        getAttendeeError : state.registration.getAttendeeError,
        deleteAttendeeError : state.registration.deleteAttendeeError,
        profiles: state.profile.profiles
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getAttendeeList : () => dispatch(actions.getAttendees()),
        storeAttendeeData : (attendee) => dispatch(actions.storeAttendeeData(attendee)),
        deleteAttendee : (id) => dispatch(actions.deleteAttendee(id)),
        getEvents : () => dispatch(actions.getEvents()),
        getAttendeesForEvent : (eventId) => dispatch(actions.getAttendeesForEvent(eventId)),
        getAttendeesForEventAndProfile : (eventId, profileName) => dispatch(actions.getAttendeesForEventAndProfile(eventId, profileName)),
        getProfiles : () => dispatch(actions.getProfiles())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationList);
