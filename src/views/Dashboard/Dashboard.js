import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import moment from "moment";
import Loader from "../../components/Loader/Loader";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
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
    if (prevProps.events !== this.props.events) {
      this.setState({
        events: this.props.events
      });
    }
  }
  render() {
    var ColorCode = "#808587";
    if (this.state.loading) {
      return <Loader loading={this.state.loading} />;
    } else {
      return (
        <div className="animated fadeIn">
          {this.state.events.map((event, index) => {
            event.startDate = moment(event.startDate).format(
              "hh:mm on DD-MM-YYYY"
            );
            index % 2 === 0 ? (ColorCode = "#8bc3d7") : (ColorCode = "#808587");
            return (
              <Row key={index} className="justify-content-left">
                <Col xs="12">
                  <Card className="mx-6" style={{ backgroundColor: ColorCode }}>
                    <CardHeader>
                      <h1>{event.eventName}</h1>
                    </CardHeader>
                    <CardBody
                      style={{ fontWeight: "bold", fontSize: 20 }}
                      className="p-4"
                    >
                      <h2> Description : {event.description} </h2>
                      <br />
                      <Row>
                        <Col xs="8" md="4">
                          <h3> Venue : {event.venue} </h3>
                          <br />
                        </Col>
                        <Col md="4">
                          <h3> Time : {event.startDate} </h3>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <ToastContainer autoClose={2000} />
              </Row>
            );
          })}
        </div>
      );
    }
  }
}
const mapStateToProps = state => {
  return {
    events: state.event.events
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getEvents: () => dispatch(actions.getEvents())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
