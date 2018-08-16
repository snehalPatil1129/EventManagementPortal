import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions/index";
import {
  FormGroup,
  Col,
  Button,
  Card,
  CardHeader,
  Row,
  CardBody
} from "reactstrap";
import Select from "react-select";
import "react-select/dist/react-select.css";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import * as attendeeCardMethod from "../../components/AttendeeCard/";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/Loader/Loader";
class SpeakerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: "",
      loading: true
    };
  }
  componentDidMount() {
    this.props.getSpeakerList();
    this.props.getEvents();
    let compRef = this;
    setTimeout(() => {
      compRef.setState({ loading: false });
    }, 1000);
  }

  deleteSpeaker(id) {
    let compRef = this;
    this.props.deleteSpeaker(id);
    setTimeout(() => {
      let speakerDeleted = this.props.speakerDeleted;
      compRef.Toaster(compRef, speakerDeleted, "Deleted");
    }, 2000);
  }
  ondeleteSpeaker(cell, row) {
    return (
      <Link to={this} onClick={() => this.deleteSpeaker(row._id)}>
        <i className="fa fa-trash" />
      </Link>
    );
  }

  onEditSpeaker(cell, row) {
    return (
      <Link
        to={`${this.props.match.url}/speakerForm/${row._id}`}
        onClick={() => this.props.storeSpeakerData(row)}
      >
        <i className="fa fa-pencil" title="Edit" />
      </Link>
    );
  }
  handleEventChange(value) {
    if (value !== null) {
      this.setState({ event: value });
      this.props.getSpeakersForEvent(value);
    } else {
      this.setState({ event: "" });
      this.props.getSpeakerList();
    }
  }

  Toaster(compRef, successFlag, actionName) {
    if (successFlag) {
      toast.success("Speaker " + actionName + " Successfully.", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    } else {
      toast.error("Something went wrong", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  }

  getSelectedRowKeys() {
    let selectedUsersId = this.refs.table.state.selectedRowKeys;
    let users = [];
    this.props.speakerList.forEach(speaker => {
      selectedUsersId.forEach(userId => {
        if (speaker._id === userId) {
          users.push({ userInfo: speaker });
        }
      });
    });
    attendeeCardMethod.generateQRcodeBulk(users);
  }

  onPrintSpeakerQRCode(cell, row) {
    return (
      <Link to={this} onClick={() => attendeeCardMethod.onGenerateQRcode(row)}>
        <i className="fa fa-print" />
      </Link>
    );
  }

  render() {
    const options = {
      sizePerPageList: [
        {
          text: "250",
          value: 250
        },
        {
          text: "500",
          value: 500
        },
        {
          text: "1000",
          value: 1000
        },
        {
          text: "All",
          value: this.props.speakerList.length
        }
      ],
      sizePerPage: 250
    };
    const selectRowProp = {
      mode: "checkbox"
    };
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <div>
        <ToastContainer autoClose={2000} />
        <FormGroup row className="marginBottomZero">
          <Col xs="6" md="3">
            <Link to={`${this.props.match.url}/speakerForm`}>
              <Button type="button" color="primary" size="small">
                <i className="fa fa-plus" />
                Add Speaker
              </Button>
            </Link>
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
                      <h1 className="regHeading paddingTop8">Speaker List</h1>
                    </Col>
                  </FormGroup>
                </CardHeader>
                <CardBody>
                  <FormGroup row>
                    <Col md="4">
                      <Select
                        name="Event"
                        placeholder="Select event"
                        options={this.props.eventList}
                        value={this.state.event}
                        simpleValue
                        onChange={this.handleEventChange.bind(this)}
                      />
                    </Col>
                    <Col md="3">
                      <Button
                        type="button"
                        onClick={this.getSelectedRowKeys.bind(this)}
                        color="success"
                      >
                        <i className="fa fa-print" />
                        Print QR Code For All
                      </Button>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <BootstrapTable
                      ref="table"
                      data={this.props.speakerList}
                      pagination={true}
                      search={true}
                      selectRow={selectRowProp}
                      options={options}
                      exportCSV={true}
                    >
                      <TableHeaderColumn
                        dataField="_id"
                        headerAlign="left"
                        isKey
                        hidden
                      >
                        Id
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="firstName"
                        headerAlign="left"
                        width="100"
                        csvHeader="First Name"
                      >
                        First Name
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="lastName"
                        headerAlign="left"
                        width="100"
                        csvHeader="Last Name"
                      >
                        Last Name
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="email"
                        headerAlign="left"
                        width="100"
                        csvHeader="Email"
                      >
                        Email
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="eventName"
                        headerAlign="left"
                        width="100"
                        csvHeader="Event"
                      >
                        Event
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="edit"
                        dataFormat={this.onEditSpeaker.bind(this)}
                        headerAlign="left"
                        width="40"
                        export={false}
                      >
                        Edit
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="delete"
                        dataFormat={this.ondeleteSpeaker.bind(this)}
                        headerAlign="left"
                        width="40"
                        export={false}
                      >
                        Delete
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="print"
                        dataFormat={this.onPrintSpeakerQRCode.bind(this)}
                        headerAlign="left"
                        width="30"
                        export={false}
                      >
                        Print
                      </TableHeaderColumn>
                    </BootstrapTable>
                  </FormGroup>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    speakerError: state.speaker.error,
    speakerList: state.speaker.speakerList,
    eventList: state.event.eventList,
    speakerDeleted: state.speaker.speakerDeleted
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSpeakerList: () => dispatch(actions.getSpeakers()),
    storeSpeakerData: attendee => dispatch(actions.storeSpeakerData(attendee)),
    deleteSpeaker: id => dispatch(actions.deleteSpeaker(id)),
    getEvents: () => dispatch(actions.getEvents()),
    getSpeakersForEvent: eventId =>
      dispatch(actions.getSpeakersForEvent(eventId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpeakerList);
