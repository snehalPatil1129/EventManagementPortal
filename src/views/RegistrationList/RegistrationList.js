import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link ,Redirect} from 'react-router-dom';
import * as actions from '../../store/actions/index';
import { FormGroup, Col, Button, Input, InputGroup } from 'reactstrap';
import CardLayout from '../../components/CardLayout/';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

class RegistrationList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Registration : {
            }
        }
    }
    componentDidMount () {
        this.props.getAttendeeList();
    }
    ondeleteAttendee (cell, row) {
        return  <Link to={this}  onClick={() => this.deleteAttendeeData(row)}>
                    <i className="fa fa-trash"></i>
                </Link>  
    }
    deleteAttendeeData (row) {
       this.props.deleteAttendee(row._id);
    }
    onEditAttendee (cell, row) {
        return  <Link to={`${this.props.match.url}/registration/${row._id}`} onClick={() => this.getAttendeeToEdit(row)}>
                    <i className="fa fa-pencil"></i>
                </Link>  
    }
    getAttendeeToEdit (row) {
         this.props.storeAttendeeData(row);  
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
                } ], // you can change the dropdown list for size per page
                sizePerPage: 250,  // which size per page you want to locate as default
        };
        return (
            <CardLayout name="Attendee List">
                <FormGroup row>
                    <Link to={`${this.props.match.url}/registration`}>
                        <Button type="button" color="primary" size="small"> <i className="fa fa-plus"></i>
                            Add Attendee </Button>
                    </Link>
                </FormGroup>
                <FormGroup row>
                    <BootstrapTable ref='table' data={this.props.attendeeList} pagination={true} search={true} options={options} exportCSV={true}>
                        <TableHeaderColumn dataField='_id' headerAlign='left' isKey hidden>Id</TableHeaderColumn>
                        <TableHeaderColumn dataField='firstName' headerAlign='left' width='100' csvHeader='First Name'>First Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='lastName' headerAlign='left' width='100' csvHeader='Last Name'>Last Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='email' headerAlign='left' width='100' csvHeader='Email'>Email</TableHeaderColumn>
                        <TableHeaderColumn dataField='edit' dataFormat={this.onEditAttendee.bind(this)} headerAlign='left' width='40' export={false}>Edit</TableHeaderColumn>
                        <TableHeaderColumn dataField='delete' dataFormat={this.ondeleteAttendee.bind(this)} headerAlign='left' width='40' export={false}>Delete</TableHeaderColumn>
                        {/* <TableHeaderColumn dataField='sessionId' headerAlign='left' export={false} hidden></TableHeaderColumn> */}
                    </BootstrapTable>
                </FormGroup>
            </CardLayout>
        )
    }
}

const mapStateToProps = state => {
    return {
        error: state.registration.error,
        attendeeList : state.registration.attendeeList
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getAttendeeList : () => dispatch(actions.getAttendees()),
        storeAttendeeData : (attendee) => dispatch(actions.storeAttendeeData(attendee)),
        deleteAttendee : (id) => dispatch(actions.deleteAttendee(id))
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationList);
