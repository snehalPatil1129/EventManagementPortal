import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link ,Redirect} from 'react-router-dom';
import * as actions from '../../store/actions/index';
import { FormGroup, Col, Button, Input, InputGroup } from 'reactstrap';
import CardLayout from '../../components/CardLayout/';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class FormList extends Component {
    componentDidMount () {
        this.props.getFormList();
        let compRef = this;      
        setTimeout(() => {
            let getFormError = compRef.props.getFormError;
            if(getFormError) {
                toast.error("Something went wrong", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }
        }, 1000);
    }
    ondeleteForm (cell, row) {
        return  <Link to={this}  onClick={() => this.deleteForm(row._id)}>
                    <i className="fa fa-trash"></i>
                </Link>  
    }
    deleteForm (id) {
        this.props.deleteForm(id);
        let compRef = this;      
        setTimeout(() => {
            let deleteFormError = compRef.props.deleteFormError;
            compRef.Toaster(compRef, deleteFormError, 'Delete')
        }, 1000);
    }
    Toaster(compRef, deleteFormError, actionName) {
        if (!deleteFormError) {
            toast.success("Form " + actionName + " Successfully.", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
        else {
            toast.error("Something went wrong", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
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
                <Col>
                <ToastContainer autoClose={2000} />
                </Col>
            </CardLayout>
        )
    }
}
const mapStateToProps = state => {
    return {
        error: state.registration.error,
        formList  : state.questionForm.forms,
        getFormError : state.questionForm.getFormError,
        deleteFormError : state.questionForm.deleteFormError
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
