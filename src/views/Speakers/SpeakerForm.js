import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { FormGroup, Col, Button } from "reactstrap";
import InputElement from "../../components/Input/";
import CardLayout from "../../components/CardLayout/";
import Select from "react-select";
import "react-select/dist/react-select.css";
import _ from "lodash";

class SpeakerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Speaker: {
        firstName: "",
        lastName: "",
        email: "",
        contact: "",
        briefInfo: "",
        profileImageURL: "",
        event: ""
      },
      firstNameRequired: false,
      lastNameRequired: false,
      emailRequired: false,
      contactRequired: false,
      eventRequired: false,
      editSpeaker: false
    };
  }
  componentDidMount() {
    let isEmpty = !Object.keys(this.props.speakerData).length;
    if (this.props.match.params.id !== undefined && !isEmpty) {
      let Speaker = _.pick(this.props.speakerData, [
        "firstName",
        "lastName",
        "email",
        "contact",
        "briefInfo",
        "profileImageURL"
      ]);
      Speaker.event = this.props.speakerData.event._id;

      Speaker._id = this.props.speakerData._id;

      this.setState({
        Speaker: Speaker,
        editSpeaker: true
      });
    }
  }
  onChangeInput(event) {
    const { Speaker } = { ...this.state };
    Speaker[event.target.name] = event.target.value;
    this.setState({ Speaker: Speaker });
  }

  onSubmit() {
    let speaker = { ...this.state.Speaker };
    let attendeeCount = this.props.attendeeCount;

    if (
      speaker.firstName &&
      speaker.lastName &&
      speaker.email &&
      speaker.contact &&
      speaker.event
    ) {
      let editedSpeaker = _.pick(speaker, [
        "firstName",
        "lastName",
        "email",
        "contact",
        "briefInfo",
        "profileImageURL",
        "event"
      ]);
      this.state.editSpeaker
        ? this.props.editSpeakerData(speaker._id, editedSpeaker)
        : this.props.createSpeaker(speaker, attendeeCount);
      this.onReset();
      this.props.history.push("/speakers");
    } else {
      !speaker.firstName ? this.setState({ firstNameRequired: true }) : null;
      !speaker.lastName ? this.setState({ lastNameRequired: true }) : null;
      !speaker.email ? this.setState({ emailRequired: true }) : null;
      !speaker.contact ? this.setState({ contactRequired: true }) : null;
      !speaker.event ? this.setState({ eventRequired: true }) : null;
    }
  }

  onReset() {
    let Speaker = { ...this.state.Speaker };
    Speaker.firstName = "";
    Speaker.lastName = "";
    Speaker.email = "";
    Speaker.contact = "";
    Speaker.briefInfo = "";
    Speaker.profileImageURL = "";
    Speaker.event = "";
    this.setState({ Speaker: Speaker });
  }

  handleEventSelectChange(value) {
    this.props.getAttendeeCountForEvent(value);
    if (value !== null) {
      let Speaker = { ...this.state.Speaker };
      Speaker.event = value;

      this.setState({ Speaker: Speaker });
    } else {
      let Speaker = { ...this.state.Speaker };
      Speaker.event = "";
      this.setState({ Speaker: Speaker });
    }
  }

  getSpeakerDetails() {
    let Speaker = { ...this.state.Speaker };
    Speaker = this.props.speakerData;
    this.setState({
      Speaker: Speaker
    });
  }
  render() {
    const { Speaker } = { ...this.state };
    const eventOptions = this.props.eventList;
    return (
      <CardLayout name="Speaker">
        <FormGroup row>
          <Col xs="12" md="6">
            <InputElement
              type="text"
              placeholder="First Name"
              name="firstName"
              icon="icon-user"
              value={Speaker.firstName}
              required={this.state.firstNameRequired}
              onchanged={event => this.onChangeInput(event)}
            />
          </Col>
          <Col md="6">
            <InputElement
              type="text"
              placeholder="Last Name"
              name="lastName"
              icon="icon-user"
              value={Speaker.lastName}
              required={this.state.lastNameRequired}
              onchanged={event => this.onChangeInput(event)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col xs="12" md="6">
            <InputElement
              type="email"
              placeholder="Email"
              name="email"
              icon="icon-envelope"
              value={Speaker.email}
              required={this.state.emailRequired}
              onchanged={event => this.onChangeInput(event)}
            />
          </Col>
          <Col md="6">
            <InputElement
              type="number"
              placeholder="Contact Number"
              name="contact"
              icon="icon-phone"
              value={Speaker.contact}
              required={this.state.emailRequired}
              onchanged={event => this.onChangeInput(event)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col xs="12" md="6">
            <Select
              placeholder="Select Event"
              value={Speaker.event}
              options={eventOptions}
              simpleValue
              onChange={this.handleEventSelectChange.bind(this)}
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
          <Col md="6">
            <InputElement
              type="text"
              placeholder="Brief Info"
              name="briefInfo"
              icon="icon-info"
              value={Speaker.briefInfo}
              onchanged={event => this.onChangeInput(event)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col xs="12" md="6">
            <InputElement
              type="text"
              placeholder="Profile Image URL"
              name="profileImageURL"
              icon="icon-link"
              value={Speaker.profileImageURL}
              onchanged={event => this.onChangeInput(event)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col xs="12" md="3">
            <Button
              type="button"
              size="md"
              color="success"
              onClick={() => this.onSubmit()}
            >
              Submit
            </Button>
          </Col>
          <Col md="3">
            <Button
              type="button"
              size="md"
              color="danger"
              style={{ marginLeft: -150 }}
              onClick={() => this.onReset()}
            >
              Reset
            </Button>
          </Col>
          <Col md="6">
            <div style={{ color: "red" }} className="help-block">
              {this.props.speakerError}
            </div>
          </Col>
        </FormGroup>
      </CardLayout>
    );
  }
}
const mapStateToProps = state => {
  return {
    speakerError: state.speaker.error,
    speakerData: state.speaker.speakerData,
    eventList: state.event.eventList,
    attendeeCount: state.attendeeCount.attendeeCount
  };
};
const mapDispatchToProps = dispatch => {
  return {
    createSpeaker: (speaker, attendeeCount) =>
      dispatch(actions.createSpeaker(speaker, attendeeCount)),
    getSpeakerData: id => dispatch(actions.getSpeakerData(id)),
    editSpeakerData: (id, speaker) =>
      dispatch(actions.editSpeakerData(id, speaker)),
    getAttendeeCountForEvent: id =>
      dispatch(actions.getAttendeeCountForEvent(id))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpeakerForm);
