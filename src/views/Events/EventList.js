import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {
    Row, Col, Card, CardBody, CardHeader, CardFooter, FormGroup, Label, Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
class EventList extends Component {

    componentWillMount() {
        this.props.getEvents();
    }

 deleteEvent(eventId) {
        var x = confirm("Are you sure you want to delete?");
        if (x) {
            let compRef = this;
           this.props.deleteEvent(eventId);
        }
        else
            return false;
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
        events: state.event.events
    }
}

const matchDispatchToProps = (dispatch) => {
    return {
        getEvents: () => dispatch(actions.getEvents()),
        deleteEvent: (eventId) => dispatch(actions.deleteEvent(eventId))
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(EventList);