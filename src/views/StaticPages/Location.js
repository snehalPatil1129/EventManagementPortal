import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { FormGroup, Col, Button } from "reactstrap";
import InputElement from "../../components/Input/";
import CardLayout from "../../components/CardLayout/";
import Select from "react-select";
import Geocode from "react-geocode";
import _ from "lodash";
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
      cordinateError: ""
    };
  }
  componentDidMount() {
    this.props.getEvents();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.eventLocation !== this.props.eventLocation) {
      let isEmpty = !Object.keys(this.props.eventLocation).length;
      if (!isEmpty) {
        this.setState({
          eventLocation: this.props.eventLocation
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
    this.setState({ eventLocation: eventLocation });
  }
  handleEventChange(value) {
    if (value !== null) {
      let eventLocation = { ...this.state.eventLocation };
      eventLocation.event = value;
      this.setState({
        eventLocation: eventLocation
      });
      this.props.getEventAddress(value);
    }
  }
  getCordinates() {
    let eventLocation = { ...this.state.eventLocation };
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
        this.setState({ cordinateError: "Please Submit Again" });
      });
  }
  onSubmit() {
    let eventLocation = { ...this.state.eventLocation };
    if (
      eventLocation.event &&
      eventLocation.latitude &&
      eventLocation.longitude &&
      eventLocation.address
    ) {
      let isEmpty = !Object.keys(this.props.eventLocation).length;
      let eventLocation = _.pick(this.state.eventLocation, [
        "event",
        "latitude",
        "longitude",
        "address",
        "latitudeDelta",
        "longitudeDelta"
      ]);
      if (isEmpty) {
        //post
        this.props.createEventLocation(eventLocation);
        this.onReset();
      } else {
        //put
        let id = this.props.eventLocation._id;
        this.props.editEventLocation(id, eventLocation);
        this.onReset();
      }
    } else {
      !eventLocation.event ? this.setState({ eventRequired: true }) : null;
      !eventLocation.address
        ? this.setState({ eventEmailRequired: true })
        : null;
      !eventLocation.latitude || !eventLocation.longitude
        ? this.setState({ cordinateError: "Please Submit Again" })
        : null;
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
    return (
      <CardLayout name="Event Location">
        <FormGroup row>
          <Col xs="12" md="6">
            <Select
              name="event"
              placeholder="Select Event"
              simpleValue
              options={this.props.eventList}
              value={eventLocation.event}
              onChange={this.handleEventChange.bind(this)}
            />
          </Col>
          <Col md="6">
            <InputElement
              icon="icon-home"
              type="text"
              placeholder="Event Address"
              name="address"
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
            >
              Reset
            </Button>
          </Col>
          <Col md="6">
            {
              <div style={{ color: "red" }} className="help-block">
                {this.props.error}
              </div>
            }
            {
              <div style={{ color: "red" }} className="help-block">
                {this.state.cordinateError}
              </div>
            }
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
    error: state.staticPages.error
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
