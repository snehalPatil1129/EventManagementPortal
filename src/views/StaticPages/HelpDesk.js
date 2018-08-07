import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { FormGroup, Col, Button } from "reactstrap";
import InputElement from "../../components/Input/";
import CardLayout from "../../components/CardLayout/";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import _ from "lodash";

class HelpDesk extends Component {
  constructor(props) {
    super(props);
    this.state = {
      helpDesk: {
        event: "",
        eventSupportEmail: "",
        eventSupportContact: "",
        techSupportEmail: "",
        techSupportContact: ""
      },
      eventEmailRequired: false,
      eventContactRequired: false,
      techEmailRequired: false,
      techContactRequired: false,
      eventRequired: false
    };
  }
  componentDidMount() {
    this.props.getEvents();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.helpDesk !== this.props.helpDesk) {
      let isEmpty = !Object.keys(this.props.helpDesk).length;
      if (!isEmpty) {
        this.setState({
          helpDesk: this.props.helpDesk
        });
      } else {
        this.setState(prevState => ({
          helpDesk: {
            ...prevState.helpDesk,
            eventSupportEmail: "",
            eventSupportContact: "",
            techSupportEmail: "",
            techSupportContact: ""
          }
        }));
      }
    }
  }
  onChangeInput(event) {
    let helpDesk = { ...this.state.helpDesk };
    helpDesk[event.target.name] = event.target.value;
    this.setState({
      helpDesk: helpDesk,
      eventEmailRequired: false,
      eventContactRequired: false,
      techEmailRequired: false,
      techContactRequired: false
    });
  }
  handleEventChange(value) {
    if (value !== null) {
      let helpDesk = { ...this.state.helpDesk };
      helpDesk.event = value;
      this.setState({
        helpDesk: helpDesk,
        eventEmailRequired: false,
        eventContactRequired: false,
        techEmailRequired: false,
        techContactRequired: false,
        eventRequired: false
      });
      this.props.getHelpDeskForEvent(value);
      let compRef = this;
      setTimeout(() => {
        let getHelpDeskError = compRef.props.getHelpDeskError;
        if (getHelpDeskError) {
          toast.error("Something went wrong", {
            position: toast.POSITION.BOTTOM_RIGHT
          });
        }
      }, 1000);
    } else {
      this.onReset();
    }
  }
  onSubmit() {
    let helpDesk = { ...this.state.helpDesk };
    if (
      helpDesk.event &&
      helpDesk.eventSupportContact &&
      helpDesk.eventSupportEmail &&
      helpDesk.techSupportEmail &&
      helpDesk.techSupportContact
    ) {
      let isEmpty = !Object.keys(this.props.helpDesk).length;
      let helpDesk = _.pick(this.state.helpDesk, [
        "event",
        "eventSupportEmail",
        "eventSupportContact",
        "techSupportEmail",
        "techSupportContact"
      ]);
      let id;
      !isEmpty ? (id = this.props.helpDesk._id) : null;
      isEmpty
        ? this.props.createHelpDeskInfo(helpDesk)
        : this.props.editHelpDeskInfo(id, helpDesk);
      let compRef = this;
      setTimeout(() => {
        let creatEditHelpDeskError = compRef.props.creatEditHelpDeskError;
        let status = "";
        !isEmpty ? (status = "Updated") : (status = "Created");
        compRef.Toaster(compRef, creatEditHelpDeskError, status);
      }, 1000);
    } else {
      !helpDesk.event ? this.setState({ eventRequired: true }) : null;
      !helpDesk.eventSupportEmail
        ? this.setState({ eventEmailRequired: true })
        : null;
      !helpDesk.eventSupportContact
        ? this.setState({ eventContactRequired: true })
        : null;
      !helpDesk.techSupportEmail
        ? this.setState({ techEmailRequired: true })
        : null;
      !helpDesk.techSupportContact
        ? this.setState({ techContactRequired: true })
        : null;
    }
  }
  Toaster(compRef, createEditError, actionName) {
    if (!createEditError) {
      toast.success("Help Desk Information " + actionName + " Successfully.", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    } else {
      toast.error("Something went wrong", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  }
  onReset() {
    this.setState(prevState => ({
      helpDesk: {
        ...prevState.helpDesk,
        event: "",
        eventSupportEmail: "",
        eventSupportContact: "",
        techSupportEmail: "",
        techSupportContact: ""
      },
      eventEmailRequired: false,
      eventContactRequired: false,
      techEmailRequired: false,
      techContactRequired: false,
      eventRequired: false
    }));
  }
  render() {
    const { helpDesk } = { ...this.state };
    return (
      <CardLayout name="Help Desk">
        <FormGroup row>
          <Col xs="12" md="4">
            <Select
              placeholder="Select Event"
              value={helpDesk.event}
              options={this.props.eventList}
              simpleValue
              onChange={this.handleEventChange.bind(this)}
            />
            {this.state.eventRequired ? (
              <div
                style={{ color: "red", marginTop: -1 }}
                className="help-block"
              >
                *Required
              </div>
            ) : null}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col xs="12" md="6">
            <InputElement
              icon="icon-envelope"
              type="email"
              placeholder="Event Support Email"
              name="eventSupportEmail"
              required={this.state.eventEmailRequired}
              value={helpDesk.eventSupportEmail}
              onchanged={event => this.onChangeInput(event)}
            />
          </Col>
          <Col md="6">
            <InputElement
              icon="icon-phone"
              type="number"
              placeholder="Event Support Contact"
              name="eventSupportContact"
              required={this.state.eventContactRequired}
              value={helpDesk.eventSupportContact}
              onchanged={event => this.onChangeInput(event)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col xs="12" md="6">
            <InputElement
              icon="icon-envelope"
              type="email"
              placeholder="Technical Support Email"
              name="techSupportEmail"
              required={this.state.techEmailRequired}
              value={helpDesk.techSupportEmail}
              onchanged={event => this.onChangeInput(event)}
            />
          </Col>
          <Col md="6">
            <InputElement
              icon="icon-phone"
              type="number"
              placeholder="Technical Support Contact"
              name="techSupportContact"
              required={this.state.techContactRequired}
              value={helpDesk.techSupportContact}
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
              style={{ marginLeft: -160 }}
            >
              Reset
            </Button>
          </Col>
          <Col md="6">
            <ToastContainer autoClose={2000} />
          </Col>
        </FormGroup>
      </CardLayout>
    );
  }
}
const mapStateToProps = state => {
  return {
    eventList: state.event.eventList,
    helpDesk: state.staticPages.helpDesk,
    getHelpDeskError: state.staticPages.getHelpDeskError,
    creatEditHelpDeskError: state.staticPages.creatEditHelpDeskError
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getEvents: () => dispatch(actions.getEvents()),
    getHelpDeskForEvent: id => dispatch(actions.getHelpDeskForEvent(id)),
    createHelpDeskInfo: helpDesk =>
      dispatch(actions.createHelpDeskInfo(helpDesk)),
    editHelpDeskInfo: (id, helpDesk) =>
      dispatch(actions.editHelpDeskInfo(id, helpDesk))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HelpDesk);
