import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import InputElement from "../../components/Input/";
import CardLayout from "../../components/CardLayout/";
import SessionTypeIndicator from "../../components/SessionTypeIndicator/SessionTypeIndicator";
import {
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody
} from "reactstrap";
import moment from "moment";
import Select from "react-select";
import "react-select/dist/react-select.css";
import Calendar from "../../components/Calendar/";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ValidationError from "../../components/ValidationError/ValidationError";
import Rectangle from "react-rectangle";

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
        sessionType: "",
        isRegistrationRequired: false
      },
      submitted: false,
      isBreakOut: true,
      calendarSessionList: [],
      sessionTypeValue: "",
      eventValue: "",
      roomValue: "",
      speakerValue: "",
      volunteerValue: "",
      updateFlag: false,
      sessionTypeRequired: false,
      sessionCapacityRequired: false,
      sessionNameRequired: false,
      roomRequired: false,
      eventRequired: false,
      startTimeRequired: false,
      speakersRequired: false,
      volunteersRequired: false,
      endTimeRequired: false,
      editDeleteFlag: false,
      createFlag: true,
      slotPopupFlag: false
    };
  }

  componentDidMount() {
    this.props.getEvents();
    this.props.getAttendees();
    this.props.getRooms();
    this.props.getSessions();
    this.props.getSpeakerList();
    this.props.getSessionTypeList();
  }

  onChangeHandler(session) {
    let sessionDetails = { ...this.state.Session };
    sessionDetails[session.target.name] = session.target.value;
    this.setState({
      Session: sessionDetails,
      sessionNameRequired: false
    });
  }

  ChangeCapacityHandler(session) {
    if (session.target.value >= 0) {
      let sessionDetails = { ...this.state.Session };
      sessionDetails[session.target.name] = session.target.value;
      this.setState({
        Session: sessionDetails,
        sessionCapacityRequired: false
      });
    } else return;
  }

  eventDaysStyleGetter(date) {
    let calendarDate = new Date(date).setHours(0, 0, 0, 0);
    if (
      this.state.eventStartDate <= calendarDate &&
      calendarDate <= this.state.eventEndDate
    )
      return {
        className: "special-day",
        style: {
          backgroundColor:
            this.state.eventStartDate <= calendarDate &&
            calendarDate <= this.state.eventEndDate
              ? "#A0E1B8"
              : "#B2BCC1"
        }
      };
    else
      return {
        style: {
          backgroundColor: "#B2BCC1"
        }
      };
  }
  eventStyleGetter(event) {
    if (event.sessionType === "breakout") var backgroundColor = "#" + "f44250";
    else if (event.sessionType === "keynote")
      var backgroundColor = "#" + "800000";
    else if (event.sessionType === "deepdive")
      var backgroundColor = "#" + "81C4E5";
    else if (event.sessionType === "panel")
      var backgroundColor = "#" + "0F2E3E";
    else {
      var backgroundColor = "#" + "c3db2b";
    }
    var style = {
      backgroundColor: backgroundColor,
      borderRadius: "0px",
      opacity: 0.8,
      color: "black",
      border: "0px",
      display: "block",
      maxWidth : "100%"
    };
    return {
      style: style
    };
  }

  navigateEventDate(date) {
    let eventDate = moment(date).startOf("day");
    this.setState({ eventDate: date });
  }

  changeRoom(roomValue) {
    let Session = { ...this.state.Session };
    Session["room"] = roomValue;

    let calendarSessionList = [];
    this.setState({
      isBreakOut: false,
      roomValue,
      Session: Session,
      calendarSessionList: [],
      roomRequired: false
    });
    if (this.state.eventValue && roomValue) {
      this.props.getSessions();
      setTimeout(() => {
        this.props.sessions.forEach(session => {
          if (session.event._id === this.state.eventValue) {
            if (
              session.room === roomValue ||
              session.sessionType === "breakout"
            ) {
              this.displaySessions(session, calendarSessionList);
            }
          }
        });
      }, 1000);
    }
    if (this.state.eventValue && roomValue == null) {
      this.props.getSessions();
      setTimeout(() => {
        this.props.sessions.forEach(session => {
          if (
            session.event._id === this.state.eventValue &&
            session.sessionType === "breakout"
          ) {
            this.displaySessions(session, calendarSessionList);
          }
        });
      }, 1000);
    }
  }

  changeEvent(eventValue) {
    let volunteerList = [],
      speakerList = [],
      roomList = [];
    let calendarSessionList = [];
    let attendees = this.props.attendees;
    let rooms = this.props.rooms;
    let speakers = this.props.speakers;
    let events = this.props.events;
    let Session = { ...this.state.Session };
    Session["event"] = eventValue;
    this.setState({
      eventValue,
      Session: Session,
      eventRequired: false,
      calendarSessionList: []
    });

    if (eventValue) {
      this.props.getSessions();
      setTimeout(() => {
        this.props.sessions.forEach(session => {
          if (
            session.event._id === eventValue &&
            session.sessionType === "breakout"
          ) {
            this.displaySessions(session, calendarSessionList);
          }
        });
      }, 1000);
    }
    rooms.forEach(room => {
      if (room.event._id === eventValue) {
        roomList.push({ label: room.roomName, value: room._id });
      }
    });

    events.forEach(event => {
      if (event._id === eventValue) {
        new Date(event["startDate"]).setHours(0, 0, 0, 0);
        let eventDate = moment(event.startDate).startOf("day");
        let eventStartDate = new Date(event.startDate).setHours(0, 0, 0, 0);
        let eventEndDate = new Date(event.endDate).setHours(0, 0, 0, 0);
        this.setState({ eventDate, eventStartDate, eventEndDate });
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
    this.setState({ roomList, volunteerList, speakerList });
  }

  updateCalendarForBreakout(eventId) {
    let calendarSessionList = [];
    let compRef = this;
    compRef.props.sessions.forEach(session => {
      if (session.event._id === eventId && session.sessionType === "breakout") {
        this.displaySessions(session, calendarSessionList);
       }
      // else {
      //   this.setState({ calendarSessionList: [] });
      // }
    });
  }

  updateCalendar(eventId, room) {
    let calendarSessionList = [];
    let compRef = this;
    compRef.props.sessions.forEach(session => {
      if (session.event._id === eventId) {
        if(session.room === room || session.sessionType === "breakout"){
          this.displaySessions(session, calendarSessionList);
        }
      } 
      // else {
      //   this.setState({ calendarSessionList: [] });
      // }
    });
  }
  displaySessions(session, calendarSessionList) {
    let sessionObj = Object.assign({}, session);
    let sessionTimeDetails = {
      start: moment(session.startTime).toDate(),
      end: moment(session.endTime).toDate(),
      title: session.sessionName
    };
    calendarSessionList.push(Object.assign({}, sessionObj, sessionTimeDetails));
    this.setState({ calendarSessionList: calendarSessionList });
  }

  changeSessionType(value) {
    if (value != null) {
      let Session = { ...this.state.Session };
      if (value === "breakout") {
        Session["room"] = "";
        this.setState({ isBreakOut: true, Session: Session, roomValue: "" });
      } else this.setState({ isBreakOut: false });

      Session["sessionType"] = value;
      this.setState({
        Session: Session,
        sessionTypeRequired: false,
        sessionTypeValue: value
      });
    }
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

  toggleSessionRequired() {
    let Session = { ...this.state.Session };
    Session["isRegrequired"] = !Session.isRegrequired;
    this.setState({ Session: Session });
  }

  Toaster(successFlag, actionName) {
    let compRef = this;
    if (successFlag) {
      toast.success("Session " + actionName + " Successfully.", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      compRef.resetField();
    } else {
      toast.error("Something went wrong", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  }

  validateForm() {
    let session = { ...this.state.Session };
    console.log("session.speakers[0]", session.speakers[0]);
    !session.sessionName ? this.setState({ sessionNameRequired: true }) : null;
    !session.event ? this.setState({ eventRequired: true }) : null;
    !session.room ? this.setState({ roomRequired: true }) : null;
    !session.startTime ? this.setState({ startTimeRequired: true }) : null;
    !session.endTime ? this.setState({ endTimeRequired: true }) : null;
    !session.sessionType ? this.setState({ sessionTypeRequired: true }) : null;
    if (!this.state.isBreakOut) {
      !session.sessionCapacity
        ? this.setState({ sessionCapacityRequired: true })
        : null;
      !session.speakers ||
      session.speakers.length == 0 ||
      session.speakers[0] == "" ||
      session.speakers[0] == null
        ? this.setState({ speakersRequired: true })
        : null;
      !session.volunteers ||
      session.volunteers.length == 0 ||
      session.volunteers[0] == "" ||
      session.volunteers[0] == null
        ? this.setState({ volunteersRequired: true })
        : null;
    }
  }

  onSubmitHandler() {
    let session = { ...this.state.Session };
    let compRef = this;
    let eventId = this.state.eventValue;
    let room = this.state.roomValue;
   
    this.validateForm();
    if (this.state.isBreakOut) {
      if (
        session.sessionName &&
        session.sessionType &&
        session.event &&
        session.startTime &&
        session.endTime
      ) {
        this.props.createSession(session);
        setTimeout(() => {
          this.updateCalendarForBreakout(eventId);
        }, 1500);
        setTimeout(() => {
          let sessionCreated = this.props.sessionCreated;
          compRef.Toaster(sessionCreated, "Created");
        }, 1000);
      }
    } else {
      setTimeout(() => {
        if (
          session.sessionName &&
          session.sessionType &&
          session.event &&
          !this.state.speakersRequired &&
          !this.state.volunteersRequired &&
          session.volunteers &&
          session.startTime &&
          session.endTime &&
          session.room &&
          session.sessionCapacity
        ) {
          this.props.createSession(session);
          setTimeout(() => {
            this.updateCalendar(eventId, room);
          }, 1500);
          setTimeout(() => {
            let sessionCreated = this.props.sessionCreated;
            compRef.Toaster(sessionCreated, "Created");
          }, 1000);
        }
      }, 800);
    }
  }

  onUpdateHandler() {
    let compRef = this;
    let session = { ...this.state.Session };
    let eventId = this.state.eventValue;
    let room = this.state.roomValue;
    this.validateForm();
    if (this.state.isBreakOut) {
      if (
        session.sessionName &&
        session.sessionType &&
        session.event &&
        session.startTime &&
        session.endTime
      ) {
        session["sessionCapacity"] = "";
        this.props.updateSession(session);
        setTimeout(() => {
          this.updateCalendarForBreakout(eventId);
        }, 1500);
        setTimeout(() => {
          let sessionUpdated = this.props.sessionUpdated;
          compRef.Toaster(sessionUpdated, "Updated");
        }, 1000);
      }
    } else {
      setTimeout(() => {
        if (
          session.sessionName &&
          session.sessionType &&
          session.event &&
          !this.state.speakersRequired &&
          !this.state.volunteersRequired &&
          session.startTime &&
          session.endTime &&
          session.room &&
          session.sessionCapacity
        ) {
          this.props.updateSession(session);
          setTimeout(() => {
            this.updateCalendar(eventId, room);
          }, 1500);
          setTimeout(() => {
            let sessionUpdated = this.props.sessionUpdated;
            compRef.Toaster(sessionUpdated, "Updated");
          }, 1000);
        }
      }, 200);
    }
  }

  onDeleteHandler() {
    let compRef = this;
    let session = { ...this.state.Session };
    let eventId = session.event._id;
    let room = session.room;

    this.props.deleteSession(session._id);

    if (this.state.isBreakOut) {
      setTimeout(() => {
        this.updateCalendarForBreakout(eventId);
      }, 1500);
    } else {
      setTimeout(() => {
        this.updateCalendar(eventId, room);
      }, 1500);
    }

    setTimeout(() => {
      let sessionDeleted = this.props.sessionDeleted;
      compRef.Toaster(sessionDeleted, "Deleted");
    }, 1000);
  }

  slotConfirmPopup() {
    this.setState({
      slotPopupFlag: !this.state.slotPopupFlag
    });
  }

  slotConfirmSuccess() {
    let sessionStart = this.state.sessionStart;
    let sessionEnd = this.state.sessionEnd;
    this.resetField();
    let selectFlag = true;
    let SessionObj = { ...this.state.Session };
    console.log("SessionObj", SessionObj);
    let dateselected = new Date(sessionStart).setHours(0, 0, 0, 0);
    if (
      this.state.eventStartDate <= dateselected &&
      dateselected <= this.state.eventEndDate
    ) {
      // if (SessionObj.room !== "" && SessionObj.room !== undefined) {
      //   this.props.sessions.forEach(session => {
      //     if (
      //       session.event._id === SessionObj.event &&
      //       session.room === SessionObj.room
      //     ) {
      //       console.log(
      //         "new Date(sessionStart).getTime()",
      //         new Date(sessionStart).getTime()
      //       );
      //       console.log(
      //         "new Date(session.startTime)",
      //         new Date(session.startTime)
      //       );
      //       if (
      //         new Date(session.startTime) >= new Date(sessionStart) ||
      //         new Date(session.endDate) <= new Date(sessionEnd)
      //       ) {
      //         selectFlag = false;
      //         return;
      //       }
      //     }
      //   });
      // }
      // console.log("selectFlag", selectFlag);
      // if (selectFlag == false) return;
      // else {
      let SlotconfirmMessage =
        `Start Time : ${sessionStart.toLocaleString()} ` +
        `,\r\n End Time: ${sessionEnd.toLocaleString()}`;
      this.setState({ SlotconfirmMessage: SlotconfirmMessage });
    
      let Session = { ...this.state.Session };
      Session["startTime"] = sessionStart.toString();
      Session["endTime"] = sessionEnd.toString();

      this.setState({
        Session: Session,
        startTimeRequired: false,
        endTimeRequired: false,
        SlotconfirmMessage,
        createFlag: true,
        editDeleteFlag: false,
        slotPopupFlag : false
      });
      // }
    } else {
      return;
    }
  }

  selectSlot(slotInfo) {
    let dateselected = new Date(slotInfo.start).setHours(0, 0, 0, 0);
    if (
      this.state.eventStartDate <= dateselected &&
      dateselected <= this.state.eventEndDate
    ) {
      let SlotalertMessage =
      "Confirm slot :" +
      " " +
      " " +
      "Start Time :" +
      " " +
      slotInfo.start.toLocaleString() +
      " " +
      "and " +
      "" +
      "End Time :" +
      "" +
      slotInfo.end.toLocaleString();
    let sessionStart = slotInfo.start;
    let sessionEnd = slotInfo.end;
    this.setState({ SlotalertMessage, sessionStart, sessionEnd });
    this.slotConfirmPopup();
    }
   
  }

  selectSession(session) {
    let sessionObj = Object.assign({}, session);
    if (sessionObj.sessionType === "breakout") {
      this.setState({ isBreakOut: true });
    }
    this.setState({
      Session: sessionObj,
      editDeleteFlag: true,
      createFlag: false,
      speakerValue: sessionObj.speakers,
      volunteerValue: sessionObj.volunteers,
      sessionTypeValue: sessionObj.sessionType
    });
  }

  resetField() {
    let Session;
    if (this.state.editDeleteFlag) {
      Session = {
        ...this.state.Session,
        sessionId: "",
        sessionName: "",
        description: "",
        extraServices: "",
        speakers: [],
        volunteers: [],
        sessionCapacity: "",
        sessionType : ""
      };
    } else {
      Session = {
        ...this.state.Session,
        sessionId: "",
        sessionName: "",
        description: "",
        extraServices: "",
        speakers: [],
        volunteers: [],
        startTime: "",
        endTime: "",
        sessionCapacity: "",
        sessionType : ""
      };
    }

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
      speakersRequired: false,
      sessionTypeRequired: false,
      sessionTypeValue: false,
      volunteersRequired: false,
      endTimeRequired: false,
      SlotconfirmMessage: ""
    });
  }

  render() {
    return (
      <div>
        <FormGroup row>
          <Col xs="12" md="5">
            <Select
              onChange={this.changeEvent.bind(this)}
              placeholder="Select event"
              simpleValue
              value={this.state.eventValue}
              options={this.props.eventList}
            />
            <ValidationError
              required={this.state.eventRequired}
              displayName="Event name"
            />
          </Col>
          <Col xs="12" md="5">
            <Select
              onChange={this.changeRoom.bind(this)}
              placeholder="Select room"
              simpleValue
              value={this.state.roomValue}
              options={this.state.roomList}
            />
            <ValidationError
              required={this.state.roomRequired && !this.state.isBreakOut}
              displayName="Room name"
            />
            <div>
              {this.state.isBreakOut ? (
                <div
                  style={{ color: "black", marginTop: 0, fontSize: "12px" }}
                  className="help-block"
                >
                  Room is not required for breakout session
                </div>
              ) : null}
            </div>
          </Col>
        </FormGroup>
        <br />
        <br />
        {this.state.startTimeRequired ? (
          <div
            style={{ color: "red", marginTop: 0, fontSize: "12px" }}
            className="help-block"
          >
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
              eventDate={this.state.eventDate}
              eventStyleGetter={event => this.eventStyleGetter(event)}
              eventDaysStyleGetter={day => this.eventDaysStyleGetter(day)}
              navigateEventDate={date => this.navigateEventDate(date)}
            />
          </Col>
          <Col md="4">
            <div>
              <span style={{ color: "black" }}>
                {this.state.SlotconfirmMessage}
              </span>
            </div>
            <CardLayout name="">
              <FormGroup row>
                <Col xs="12">
                  <InputElement
                    type="text"
                    placeholder="Session name"
                    maxLength="250"
                    name="sessionName"
                    icon="icon-calendar"
                    required={this.state.sessionNameRequired}
                    value={this.state.Session.sessionName}
                    onchanged={session => this.onChangeHandler(session)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col xs="12">
                  <Select
                    onChange={this.changeSessionType.bind(this)}
                    placeholder="Select session type"
                    simpleValue
                    value={this.state.sessionTypeValue}
                    options={this.props.sessionTypeList}
                  />
                  <ValidationError
                    required={this.state.sessionTypeRequired}
                    displayName="Session type"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col xs="12">
                  <Select
                    multi
                    onChange={this.changeSpeakers.bind(this)}
                    placeholder="Select speakers"
                    simpleValue
                    disabled={this.state.isBreakOut}
                    value={this.state.speakerValue}
                    options={this.state.speakerList}
                  />
                  <ValidationError
                    required={
                      this.state.speakersRequired && !this.state.isBreakOut
                    }
                    displayName="Speaker"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col xs="12">
                  <Select
                    multi
                    placeholder="Select volunteers"
                    simpleValue
                    value={this.state.volunteerValue}
                    disabled={this.state.isBreakOut}
                    options={this.state.volunteerList}
                    onChange={this.changeVolunteers.bind(this)}
                  />
                  <ValidationError
                    required={
                      this.state.volunteersRequired && !this.state.isBreakOut
                    }
                    displayName="Volunteer"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col xs="12">
                  <InputElement
                    type="text"
                    placeholder="Description"
                    name="description"
                    icon="icon-note"
                    value={this.state.Session.description}
                    onchanged={session => this.onChangeHandler(session)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col xs="12">
                  <InputElement
                    type="number"
                    placeholder="Session capacity"
                    name="sessionCapacity"
                    icon="icon-pie-chart"
                    disabled={this.state.isBreakOut}
                    required={
                      this.state.sessionCapacityRequired &&
                      !this.state.isBreakOut
                    }
                    value={this.state.Session.sessionCapacity}
                    onchanged={session => this.ChangeCapacityHandler(session)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col xs="12">
                  <input
                    disabled={this.state.isBreakOut}
                    type="checkbox"
                    checked={this.state.Session.isRegrequired}
                    onChange={this.toggleSessionRequired.bind(this)}
                  />
                  <Label> Registration Required </Label>
                </Col>
              </FormGroup>
              {this.state.editDeleteFlag && (
                <div>
                  <Row>
                    <Col sm="12">
                      <Button
                        name="update"
                        onClick={this.onUpdateHandler.bind(this)}
                        color="success"
                      >
                        Update
                      </Button>
                      &nbsp;&nbsp;
                      <Button
                        onClick={this.onDeleteHandler.bind(this)}
                        color="danger"
                      >
                        Delete
                      </Button>
                      &nbsp;&nbsp;
                      <Button
                        onClick={this.resetField.bind(this)}
                        color="primary"
                      >
                        <i className="fa fa-ban" /> Reset
                      </Button>
                    </Col>
                  </Row>
                </div>
              )}
              {this.state.createFlag && (
                <Row sm={{ size: "auto", offset: 2 }}>
                  <Col md="12">
                    <Button
                      onClick={this.onSubmitHandler.bind(this)}
                      type="submit"
                      color="primary"
                    >
                      Create Session
                    </Button>
                    &nbsp;&nbsp;
                    <Button onClick={this.resetField.bind(this)} color="danger">
                      <i className="fa fa-ban" />
                      Reset
                    </Button>
                  </Col>
                </Row>
              )}
              <ToastContainer autoClose={2000} />
            </CardLayout>
          </Col>
        </Row>
        <Modal
          isOpen={this.state.slotPopupFlag}
          toggle={this.slotConfirmPopup.bind(this)}
          className={"modal-lg " + this.props.className}
        >
          <ModalHeader toggle={this.slotConfirmPopup.bind(this)}>
            Confirm
          </ModalHeader>
          <ModalBody>
            <div>
              <span>{this.state.SlotalertMessage}</span>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="success"
              onClick={this.slotConfirmSuccess.bind(this)}
            >
              Confirm
            </Button>
            &nbsp;
            <Button color="danger" onClick={this.slotConfirmPopup.bind(this)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
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
    sessionTypeList: state.session.sessionTypeList,
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
    updateSession: session => dispatch(actions.updateSession(session)),
    getSessionTypeList: () => dispatch(actions.getSessionTypeList())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
