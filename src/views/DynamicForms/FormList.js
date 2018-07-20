import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link ,Redirect} from 'react-router-dom';
import * as actions from '../../store/actions/index';
import { FormGroup, Col, Button, Input, InputGroup } from 'reactstrap';
import CardLayout from '../../components/CardLayout/';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

class FormList extends Component {
    componentDidMount () {
        this.props.getFormList();
    }
    ondeleteForm (cell, row) {
        return  <Link to={this}  onClick={() => this.props.deleteForm(row._id)}>
                    <i className="fa fa-trash"></i>
                </Link>  
    }
    onEditForm (cell, row) {
        return  <Link to={`${this.props.match.url}/questionForms/${row._id}`} onClick={() => this.props.storeCurrentForm(row)}>
                    <i className="fa fa-pencil"></i>
                </Link>  
    }
    onViewForm(cell, row) {
        return <Link to={`${this.props.match.url}/renderForm/${row._id}`} onClick={() => this.props.storeCurrentForm(row)}>
            <i className="fa fa-eye"></i>
        </Link>
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
                } ], 
                sizePerPage: 250,
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
                        <TableHeaderColumn dataField='view' dataFormat={this.onViewForm.bind(this)} headerAlign='left' width='20' export={false} ></TableHeaderColumn>
                        <TableHeaderColumn dataField='edit' dataFormat={this.onEditForm.bind(this)} headerAlign='left' width='20' export={false}></TableHeaderColumn>
                        <TableHeaderColumn dataField='delete' dataFormat={this.ondeleteForm.bind(this)} headerAlign='left' width='20' export={false}></TableHeaderColumn>
                    </BootstrapTable>
                </FormGroup>
            </CardLayout>
        )
    }
}
const mapStateToProps = state => {
    return {
        error: state.registration.error,
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
