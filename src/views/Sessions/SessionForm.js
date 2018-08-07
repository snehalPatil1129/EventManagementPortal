import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import InputElement from "../../components/Input/";
import CardLayout from "../../components/CardLayout/";
import { Row, Col, Button, FormGroup } from "reactstrap";
import moment from "moment";
import Select from "react-select";
import "react-select/dist/react-select.css";
import Calendar from "../../components/Calendar/";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class SessionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Session: {
        sessionId: "",
        sessionName: "",
        room: "",
        event: "",
        description: "",
        extraServices: "",
        speakers: [],
        volunteers: [],
        startTime: "",
        endTime: "",
        sessionCapacity: "",
        sessionType: "test",
        isBreak: false,
        isRegistrationRequired: false
      },
      submitted: false,
      calendarSessionList: [],
      eventValue: "",
      roomValue: "",
      speakerValue: "",
      volunteerValue: "",
      updateFlag: false,
      sessionCapacityRequired: false,
      sessionNameRequired: false,
      roomRequired: false,
      eventRequired: false,
      startTimeRequired: false,
      descriptionRequired: false,
      speakersRequired: false,
      volunteersRequired: false,
      endTimeRequired: false
    };
  }

  componentDidMount() {
    this.props.getEvents();
    this.props.getAttendees();
    this.props.getRooms();
    this.props.getSessions();
    this.props.getSpeakerList();
  }

  onChangeHandler(session) {
    let sessionDetails = { ...this.state.Session };
    sessionDetails[session.target.name] = session.target.value;
    this.setState({
      Session: sessionDetails,
      sessionNameRequired: false,
      descriptionRequired: false,
      sessionCapacityRequired: false
    });
  }

  changeRoom(roomValue) {
    let Session = { ...this.state.Session };
    Session["room"] = roomValue;
    let calendarSessionList = [];
    this.setState({
      roomValue,
      Session: Session,
      calendarSessionList: [],
      roomRequired: false
    });
    if (this.state.eventValue && roomValue) {
      this.props.sessions.forEach(session => {
        if (
          session.event._id === this.state.eventValue &&
          session.room === roomValue
        ) {
          let sessionObj = Object.assign({}, session);
          let sessionTimeDetails = {
            start: moment(session.startTime).toDate(),
            end: moment(session.endTime).toDate(),
            title: session.sessionName
          };
          calendarSessionList.push(
            Object.assign({}, sessionObj, sessionTimeDetails)
          );
          this.setState({ calendarSessionList: calendarSessionList });
        }
      });
    }
  }

  changeEvent(eventValue) {
    let volunteerList = [],
      speakerList = [],
      roomList = [];
    let attendees = this.props.attendees;
    let rooms = this.props.rooms;
    let speakers = this.props.speakers;
    let events = this.props.events;
    let eventStartDate;
    let Session = { ...this.state.Session };
    Session["event"] = eventValue;

    this.setState({ eventValue, Session: Session, eventRequired: false });

    rooms.forEach(room => {
      if (room.event._id == eventValue) {
        roomList.push({ label: room.roomName, value: room._id });
      }
    });

    events.forEach(event => {
      if (event._id === eventValue) {
        eventStartDate = moment(event.startDate).toDate();
      }
    });

    speakers.forEach(speaker => {
      if (speaker.event._id === eventValue) {
        speakerList.push({
          label: speaker.firstName + " " + speaker.lastName,
          value: speaker._id
        });
      }
    });

    attendees.forEach(attendee => {
      if (attendee.event != null) {
        if (attendee.event._id === eventValue) {
          attendee.profiles.forEach(profile => {
            if (profile === "Volunteer") {
              volunteerList.push({
                label: attendee.firstName + " " + attendee.lastName,
                value: attendee._id
              });
            }
          });
        }
      }
    });
    this.setState({ roomList, volunteerList, speakerList, eventStartDate });
  }

  changeSpeakers(speakerValue) {
    if (speakerValue !== null) {
      let Session = { ...this.state.Session };
      let speakerArray = [];
      speakerArray.push(speakerValue);
      let len = speakerArray.length;
      if (len) {
        let lastEle = speakerArray[len - 1];
        Session.speakers = lastEle.split(",");
        this.setState({
          Session: Session,
          speakerValue,
          speakersRequired: false
        });
      }
    }
  }

  changeVolunteers(volunteerValue) {
    if (volunteerValue !== null) {
      let Session = { ...this.state.Session };
      let volunteerArray = [];
      volunteerArray.push(volunteerValue);
      let len = volunteerArray.length;
      if (len) {
        let lastEle = volunteerArray[len - 1];
        Session.volunteers = lastEle.split(",");
        this.setState({
          Session: Session,
          volunteerValue,
          volunteersRequired: false
        });
      }
    }
  }

  Toaster(successFlag, actionName) {
    if (successFlag) {
      toast.success("Session " + actionName + "Successfully.", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    } else {
      toast.error("Something went wrong", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  }

  validateForm() {
    let session = { ...this.state.Session };
    !session.sessionName ? this.setState({ sessionNameRequired: true }) : null;
    !session.event ? this.setState({ eventRequired: true }) : null;
    !session.room ? this.setState({ roomRequired: true }) : null;
    !session.startTime ? this.setState({ startTimeRequired: true }) : null;
    !session.endTime ? this.setState({ endTimeRequired: true }) : null;
    !session.startTime ? this.setState({ startTimeRequired: true }) : null;
    !session.description ? this.setState({ descriptionRequired: true }) : null;
    !session.sessionCapacity
      ? this.setState({ sessionCapacityRequired: true })
      : null;
    session.speakers.length == 0
      ? this.setState({ speakersRequired: true })
      : null;
    session.volunteers.length == 0
      ? this.setState({ volunteersRequired: true })
      : null;
  }

  onSubmitHandler() {
    let session = { ...this.state.Session };
    this.setState({ submitted: true });
    let compRef = this;
    this.validateForm();
    if (session.sessionName) {
      this.props.createSession(session);
      setTimeout(() => {
        let sessionCreated = this.props.sessionCreated;
        compRef.Toaster(sessionCreated, "Created");
      }, 1000);
    }
  }

  onUpdateHandler() {
    let compRef = this;
    let session = { ...this.state.Session };
    if (session.sessionName) {
      this.props.updateSession(session);
      setTimeout(() => {
        let sessionUpdated = this.props.sessionUpdated;
        compRef.Toaster(sessionUpdated, "Updated");
      }, 1000);
    }
  }

  onDeleteHandler() {
    let compRef = this;
    let session = { ...this.state.Session };
    this.props.deleteSession(session._id);
    setTimeout(() => {
      let sessionDeleted = this.props.sessionDeleted;
      compRef.Toaster(sessionDeleted, "Deleted");
    }, 1000);
  }

  selectSlot(slotInfo) {
    alert(
      `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
        `\nend: ${slotInfo.end.toLocaleString()}`
    );
    let Session = { ...this.state.Session };
    Session["startTime"] = slotInfo.start.toString();
    Session["endTime"] = slotInfo.end.toString();
    this.setState({
      Session: Session,
      startTimeRequired: false,
      endTimeRequired: false
    });
  }

  selectSession(session) {
    let sessionObj = { ...this.state.Session };
    sessionObj = Object.assign({}, session);
    this.setState({
      Session: sessionObj,
      updateFlag: true,
      speakerValue: sessionObj.speakers,
      volunteerValue: sessionObj.volunteers
    });
  }

  resetField() {
    let Session = {
      sessionId: "",
      sessionName: "",
      description: "",
      extraServices: "",
      speakers: [],
      volunteers: [],
      startTime: "",
      endTime: "",
      sessionCapacity: ""
    };
    this.setState({
      Session: Session,
      speakerValue: "",
      volunteerValue: "",
      updateFlag: false,
      sessionCapacityRequired: false,
      sessionNameRequired: false,
      roomRequired: false,
      eventRequired: false,
      startTimeRequired: false,
      descriptionRequired: false,
      speakersRequired: false,
      volunteersRequired: false,
      endTimeRequired: false
    });
  }

  render() {
    this.deleteButton = "";
    if (this.state.updateFlag) {
      this.buttons = (
        <Button
          type="submit"
          size="md"
          color="success"
          onClick={this.onUpdateHandler.bind(this)}
        >
          <i className="icon-note" /> Update
        </Button>
      );
      this.deleteButton = (
        <Button
          type="submit"
          size="md"
          color="danger"
          onClick={this.onDeleteHandler.bind(this)}
        >
          <i className="icon-trash" /> Delete
        </Button>
      );
    } else
      this.buttons = (
        <Button
          type="submit"
          size="md"
          color="success"
          onClick={this.onSubmitHandler.bind(this)}
        >
          <i className="icon-note" /> Submit
        </Button>
      );

    return (
      <div>
        <FormGroup row>
          <Col xs="12" md="6">
            <Select
              onChange={this.changeEvent.bind(this)}
              placeholder="--Select Event--"
              simpleValue
              value={this.state.eventValue}
              options={this.props.eventList}
            />
            {this.state.eventRequired ? (
              <div
                style={{ color: "red", marginTop: 0 }}
                className="help-block"
              >
                *Required
              </div>
            ) : null}
          </Col>
          <Col xs="12" md="6">
            <Select
              onChange={this.changeRoom.bind(this)}
              placeholder="--Select Room--"
              simpleValue
              value={this.state.roomValue}
              options={this.state.roomList}
            />
            {this.state.roomRequired ? (
              <div
                style={{ color: "red", marginTop: 0 }}
                className="help-block"
              >
                *Required
              </div>
            ) : null}
          </Col>
        </FormGroup>
        <br />
        <br />
        {this.state.startTimeRequired ? (
          <div style={{ color: "red", marginTop: 0 }} className="help-block">
            *Please select slot
          </div>
        ) : null}
        <br /> <br />
        <Row>
          <Col md="8">
            <Calendar
              events={this.state.calendarSessionList}
              onSelectSlot={slotInfo => this.selectSlot(slotInfo)}
              selectSession={event => this.selectSession(event)}
              eventStartDate={this.state.eventStartDate}
            />
          </Col>

          <Col md="4">
            <CardLayout name="">
              <FormGroup row>
                <Col xs="12">
                  <InputElement
                    type="text"
                    placeholder="Session Name"
                    name="sessionName"
                    icon="icon-user"
                    required={this.state.sessionNameRequired}
                    value={this.state.Session.sessionName}
                    onchanged={session => this.onChangeHandler(session)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col xs="12">
                  <Select
                    multi
                    onChange={this.changeSpeakers.bind(this)}
                    placeholder="--Select Speakers--"
                    simpleValue
                    value={this.state.speakerValue}
                    options={this.state.speakerList}
                  />
                  {this.state.speakersRequired ? (
                    <div
                      style={{ color: "red", marginTop: 0 }}
                      className="help-block"
                    >
                      *Required
                    </div>
                  ) : null}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col xs="12">
                  <Select
                    multi
                    placeholder="--Select Volunteers-- "
                    simpleValue
                    value={this.state.volunteerValue}
                    options={this.state.volunteerList}
                    onChange={this.changeVolunteers.bind(this)}
                  />
                  {this.state.volunteersRequired ? (
                    <div
                      style={{ color: "red", marginTop: 0 }}
                      className="help-block"
                    >
                      *Required
                    </div>
                  ) : null}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col xs="12">
                  <InputElement
                    type="text"
                    placeholder="Description"
                    name="description"
                    icon="icon-phone"
                    required={this.state.descriptionRequired}
                    value={this.state.Session.description}
                    onchanged={session => this.onChangeHandler(session)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col xs="12">
                  <InputElement
                    type="number"
                    placeholder="Session Capacity"
                    name="sessionCapacity"
                    icon="icon-phone"
                    required={this.state.sessionCapacityRequired}
                    value={this.state.Session.sessionCapacity}
                    onchanged={session => this.onChangeHandler(session)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col xs="8" md="3">
                  {" "}
                  {this.buttons}{" "}
                </Col>
                <Col xs="8" md="3">
                  {" "}
                  {this.deleteButton}
                </Col>
                <Col md="3">
                  <Button
                    onClick={this.resetField.bind(this)}
                    type="reset"
                    size="md"
                    color="danger"
                  >
                    {" "}
                    Reset
                  </Button>
                  <ToastContainer autoClose={2000} />
                </Col>
              </FormGroup>
            </CardLayout>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    eventList: state.event.eventList,
    rooms: state.room.rooms,
    attendees: state.registration.attendeeList,
    speakers: state.speaker.speakerList,
    sessions: state.session.sessions,
    events: state.event.events,
    sessionDeleted: state.session.sessionDeleted,
    sessionUpdated: state.session.sessionUpdated,
    sessionCreated: state.session.sessionCreated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getEvents: () => dispatch(actions.getEvents()),
    getAttendees: () => dispatch(actions.getAttendees()),
    getRooms: () => dispatch(actions.getRooms()),
    getSpeakerList: () => dispatch(actions.getSpeakers()),
    createSession: session => dispatch(actions.createSession(session)),
    getSessions: () => dispatch(actions.getSessions()),
    deleteSession: sessionId => dispatch(actions.deleteSession(sessionId)),
    updateSession: session => dispatch(actions.updateSession(session))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
