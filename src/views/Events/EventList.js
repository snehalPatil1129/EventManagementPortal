import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {
    Row, Col, Card, CardBody, CardHeader, CardFooter, FormGroup, Label, Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class EventList extends Component {

    componentWillMount() {
        this.props.getEvents();
    }

 deleteEvent(eventId) {
     let componentRef = this;
        var x = confirm("Are you sure you want to delete?");
        if (x) {
            let compRef = this;
           this.props.deleteEvent(eventId);
           setTimeout(()=> {
            let  eventDeleted = this.props.eventDeleted;
            compRef.Toaster(compRef, eventDeleted,'Deleted')},1000);
        }
        else
            return false;
    }

    Toaster(compRef, successFlag, actionName) {
        if(successFlag){
                toast.success("Event "+ actionName + "Successfully.", {
                position: toast.POSITION.BOTTOM_RIGHT,
               }); 
           }
        else{
            toast.error("Something went wrong", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
       }
  }

    onDeleteEvent(cell, row) {
        let componentRef = this;
        return <Link to={this} onClick={() => componentRef.deleteEvent(row._id)} >
            <i class="fa fa-trash"></i>
        </Link>
    }

    onEditEvent(cell, row) {
      
        let componentRef = this;
        return <Link to={`${componentRef.props.match.url}/EventForm/${row._id}`}>
            <i className="fa fa-pencil"></i>
        </Link>
    }
    render() {
        const sortingOptions = {
            defaultSortName: 'eventName',
            defaultSortOrder: 'asc',
            sizePerPageList: [{
                text: '250', value: 250
            }, {
                text: '500', value: 500
            }, {
                text: '1000', value: 1000
            }, {
                text: 'All', value: this.props.events.length
            }],
            sizePerPage: 250,
        };

        return (
            <div>
                 <ToastContainer autoClose={2000} />
                <FormGroup row className="marginBottomZero">
                    <Col xs="6" md="3">
                        <Link to={`${this.props.match.url}/EventForm`}>
                            <Button type="button" color="primary">
                                <i className="fa fa-plus"></i>
                                Add Event
                             </Button>
                        </Link> &nbsp;&nbsp;
                     </Col>
                </FormGroup>
                <br />
                <div className="animated fadeIn">
                    <Row>
                        <Col xs="12" lg="12">
                            <Card>
                                <CardHeader>
                                    <FormGroup row className="marginBottomZero">
                                        <Col xs="6" md="3">
                                            <h1 className="regHeading paddingTop8">Event List</h1>
                                        </Col>
                                    </FormGroup>
                                </CardHeader>
                                <CardBody>
                                    <BootstrapTable ref='table' data={this.props.events} pagination={true} options={sortingOptions} exportCSV={true}>
                                        <TableHeaderColumn dataField='_id' headerAlign='left' isKey hidden>ID</TableHeaderColumn>
                                        <TableHeaderColumn dataField='eventName' headerAlign='left' width='200' dataSort csvHeader='eventName'>Event Name</TableHeaderColumn>
                                        <TableHeaderColumn dataField='description' headerAlign='left' width='250' csvHeader='description'>Description</TableHeaderColumn>
                                        <TableHeaderColumn dataField='venue' headerAlign='left' width='250' csvHeader='venue'>Venue</TableHeaderColumn>
                                        <TableHeaderColumn dataField='delete' dataFormat={this.onDeleteEvent.bind(this)} headerAlign='left' width='30' export={false}></TableHeaderColumn>
                                        <TableHeaderColumn dataField='edit' dataFormat={this.onEditEvent.bind(this)} headerAlign='left' width='30' export={false}></TableHeaderColumn>
                                    </BootstrapTable>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        events: state.event.events,
        eventList : state.event.eventList,
        eventDeleted : state.event.eventDeleted
    }
}

const matchDispatchToProps = (dispatch) => {
    return {
        getEvents: () => dispatch(actions.getEvents()),
        deleteEvent: (eventId) => dispatch(actions.deleteEvent(eventId))
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(EventList);