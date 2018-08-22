import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { FormGroup, Col, Button } from "reactstrap";
import InputElement from "../../components/Input/";
import CardLayout from "../../components/CardLayout/";
import Select from "react-select";
import Geocode from "react-geocode";
import _ from "lodash";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/Loader/Loader";

class EventLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventLocation: {
        event: "",
        address: "",
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      eventRequired: false,
      addressRequired: false,
      cordinateError: "",
      loading: true
    };
  }
  componentDidMount() {
    this.props.getEvents();
    let compRef = this;
    setTimeout(function() {
      compRef.setState({ loading: false });
    }, 1000);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.eventLocation !== this.props.eventLocation) {
      let isEmpty = !Object.keys(this.props.eventLocation).length;
      if (!isEmpty) {
        this.setState({
          eventLocation: this.props.eventLocation,
          eventRequired: false,
          addressRequired: false
        });
      } else {
        this.setState(prevState => ({
          eventLocation: {
            ...prevState.eventLocation,
            address: ""
          }
        }));
      }
    }
  }
  onChangeInput(event) {
    let eventLocation = { ...this.state.eventLocation };
    eventLocation[event.target.name] = event.target.value;
    this.setState({ eventLocation: eventLocation, addressRequired: false });
  }
  handleEventChange(value) {
    if (value !== null) {
      let eventLocation = { ...this.state.eventLocation };
      eventLocation.event = value;
      this.setState({
        eventLocation: eventLocation,
        eventRequired: false
      });
      this.props.getEventAddress(value);
      let compRef = this;
      setTimeout(() => {
        let getLocationError = compRef.props.getLocationError;
        if (getLocationError) {
          toast.error("Something went wrong", {
            position: toast.POSITION.BOTTOM_RIGHT
          });
        }
      }, 1000);
    } else {
      let eventLocation = { ...this.state.eventLocation };
      eventLocation.event = "";
      this.setState({
        eventLocation: eventLocation,
        eventRequired: true
      });
    }
  }
  getCordinates() {
    let eventLocation = { ...this.state.eventLocation };
    if (eventLocation.address && eventLocation.event) {
      Geocode.fromAddress(eventLocation.address)
        .then(response => {
          const { lat, lng } = response.results[0].geometry.location;
          this.setState(prevState => ({
            eventLocation: {
              ...prevState.eventLocation,
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }
          }));
          this.onSubmit();
        })
        .catch(error => {
          this.setState({ cordinateError: "*Please Submit Again" });
        });
    } else {
      !eventLocation.event ? this.setState({ eventRequired: true }) : null;
      !eventLocation.address ? this.setState({ addressRequired: true }) : null;
    }
  }
  onSubmit() {
    let eventLocation = { ...this.state.eventLocation };
    if (
      eventLocation.event &&
      eventLocation.latitude &&
      eventLocation.longitude &&
      eventLocation.address
    ) {
      this.setState({ loading: true });
      let isEmpty = !Object.keys(this.props.eventLocation).length;
      let eventLocation = _.pick(this.state.eventLocation, [
        "event",
        "latitude",
        "longitude",
        "address",
        "latitudeDelta",
        "longitudeDelta"
      ]);
      let id;
      !isEmpty ? (id = this.props.eventLocation._id) : null;
      isEmpty
        ? this.props.createEventLocation(eventLocation)
        : this.props.editEventLocation(id, eventLocation);
      let compRef = this;
      setTimeout(() => {
        let creatEditHelpDeskError = compRef.props.creatEditHelpDeskError;
        let status = "";
        !isEmpty ? (status = "Updated") : (status = "Created");
        compRef.Toaster(compRef, creatEditHelpDeskError, status);
      }, 1000);
    } else {
      !eventLocation.event ? this.setState({ eventRequired: true }) : null;
      !eventLocation.address ? this.setState({ addressRequired: true }) : null;
      !eventLocation.latitude || !eventLocation.longitude
        ? this.setState({ cordinateError: "*Please Submit Again" })
        : null;
    }
  }
  Toaster(compRef, createEditError, actionName) {
    this.setState({ loading: false });
    if (!createEditError) {
      this.onReset();
      toast.success(
        "Event Location Information " + actionName + " Successfully.",
        {
          position: toast.POSITION.BOTTOM_RIGHT
        }
      );
    } else {
      toast.error("Something went wrong", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  }
  onReset() {
    this.setState(prevState => ({
      eventLocation: {
        ...prevState.eventLocation,
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        event: "",
        address: ""
      },
      eventRequired: false,
      addressRequired: false,
      cordinateError: ""
    }));
  }
  render() {
    const { eventLocation } = { ...this.state };
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <CardLayout name="Event Location">
        <FormGroup row>
          <Col xs="12" md="6">
            <Select
              name="event"
              placeholder="Select event"
              simpleValue
              options={this.props.eventList}
              value={eventLocation.event}
              onChange={this.handleEventChange.bind(this)}
            />
            {this.state.eventRequired ? (
              <div
                style={{ color: "red", marginTop: 0 }}
                className="help-block"
              >
                *Please select event
              </div>
            ) : null}
          </Col>
          <Col md="6">
            <InputElement
              icon="icon-home"
              type="text"
              placeholder="Event address"
              name="address"
              maxLength="250"
              required={this.state.addressRequired}
              value={eventLocation.address}
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
              onClick={() => this.getCordinates()}
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
              onClick={() => this.onReset()}
            >
              Reset
            </Button>
          </Col>
          <Col md="6">
            {
              <div style={{ color: "red" }} className="help-block">
                {this.state.cordinateError}
              </div>
            }
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
    eventLocation: state.staticPages.eventLocation,
    getLocationError: state.staticPages.getLocationError,
    creatEditLocationError: state.staticPages.creatEditLocationError
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getEvents: () => dispatch(actions.getEvents()),
    getEventAddress: eventId => dispatch(actions.getLocationForEvent(eventId)),
    createEventLocation: eventLocation =>
      dispatch(actions.createEventLocation(eventLocation)),
    editEventLocation: (id, eventLocation) =>
      dispatch(actions.editEventLocation(id, eventLocation))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventLocation);
