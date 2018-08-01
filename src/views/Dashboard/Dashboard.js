import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import {
  Row, Col, Card, CardBody, CardHeader
} from 'reactstrap';
import moment from 'moment';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    }
  }
  componentWillMount() {
    this.props.getEvents();
  }
  // componentDidMount() {
  //   this.props.events.length === 0 ? toast.error("No Events Found", {
  //     position: toast.POSITION.BOTTOM_RIGHT,
  //   }) : null;
  // }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.events !== this.props.events) {
      this.setState({
        events: this.props.events
      })
    }
  }
  render() {
    return (
      <div className="animated fadeIn">
        {
          this.state.events.map((event, index) => {
            event.startDate = moment(event.startDate).format('hh:mm on DD-MM-YYYY');
            var ColorCode = '#808587';
            index % 2 == 0 ? ColorCode = '#8bc3d7' : ColorCode = '#808587';
            //var ColorCode = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
            return (
              <Row className="justify-content-left">
                <Col xs="12" >
                  <Card className="mx-6" style={{ backgroundColor: ColorCode }}>
                    <CardHeader><h3>{event.eventName}</h3></CardHeader>
                    <CardBody style={{ fontWeight: 'bold', fontSize: 20 }} className="p-4">
                      <h5 > Description : {event.description} </h5><br />
                      <Row>
                        <Col xs="8" md="4">
                          <h6> Venue : {event.venue} </h6><br />
                        </Col>
                        <Col md="4">
                          <h6> Time : {event.startDate} </h6>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
               <ToastContainer  autoClose={2000} /> 
              </Row>
            )
          })
        }
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    events: state.event.events
  };
}
const mapDispatchToProps = dispatch => {
  return {
    getEvents: () => dispatch(actions.getEvents())
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
