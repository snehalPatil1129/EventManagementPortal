import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link ,Redirect} from 'react-router-dom';
import * as actions from '../../store/actions/index';
import { FormGroup, Col, Button, Input, InputGroup } from 'reactstrap';
import CardLayout from '../../components/CardLayout/';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

class FormList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Registration : {
            }
        }
    }
    componentDidMount () {
        this.props.getFormList();
    }
    ondeleteForm (cell, row) {
        return  <Link to={this}  onClick={() => this.deleteFormData(row)}>
                    <i className="fa fa-trash"></i>
                </Link>  
    }
    deleteFormData (row) {
       this.props.deleteForm(row._id);
    }
    onEditForm (cell, row) {
        return  <Link to={`${this.props.match.url}/questionForms/${row._id}`} onClick={() => this.getFormToEdit(row)}>
                    <i className="fa fa-pencil"></i>
                </Link>  
    }
    getFormToEdit (row) {
        this.props.storeCurrentForm(row);  
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
                text: 'All', value: this.props.formList.length
                } ], // you can change the dropdown list for size per page
                sizePerPage: 250,  // which size per page you want to locate as default
        };
        return (
            <CardLayout name="Forms List">
                <FormGroup row>
                    <Link to={`${this.props.match.url}/questionForms`}>
                        <Button type="button" color="primary" size="small"> <i className="fa fa-plus"></i>
                            Create Form </Button>
                    </Link>
                </FormGroup>
                <FormGroup row>
                    <BootstrapTable ref='table' data={this.props.formList} pagination={true} search={true} options={options} >
                        <TableHeaderColumn dataField='_id' headerAlign='left' isKey hidden>Id</TableHeaderColumn>
                        <TableHeaderColumn dataField='eventName' headerAlign='left' width='100' >Event Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='sessionName' headerAlign='left' width='100' >Session Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='formType' headerAlign='left' width='100' >Form Type</TableHeaderColumn>
                         <TableHeaderColumn dataField='edit' dataFormat={this.onEditForm.bind(this)} headerAlign='left' width='30' export={false}></TableHeaderColumn>
                         <TableHeaderColumn dataField='delete' dataFormat={this.ondeleteForm.bind(this)} headerAlign='left' width='30' export={false}></TableHeaderColumn> 
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
        //attendeeList : state.registration.attendeeList
        formList  : state.questionForm.forms
    };
}

const mapDispatchToProps = dispatch => {
    return {
       getFormList : () => dispatch(actions.getForms()),
       storeCurrentForm : (form) => dispatch(actions.storeCurrentForm(form)),
       deleteForm : (id) => dispatch(actions.deleteForm(id))
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormList);
