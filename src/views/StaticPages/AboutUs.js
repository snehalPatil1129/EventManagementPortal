import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { FormGroup, Col, Button } from 'reactstrap';
import InputElement from '../../components/Input/';
import CardLayout from '../../components/CardLayout/';
import _ from 'lodash';
import Select from 'react-select';
class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutUs: {
        info: '', url: '' ,event : ''
      },
      infoRequired : false, eventRequired : false
    }
  }
  componentWillMount() {
    this.props.getEvents();
   // this.props.getAboutUs();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.aboutUs !== this.props.aboutUs) {
      let isEmpty = !Object.keys(this.props.aboutUs).length;
      if(!isEmpty){
        this.setState({
          aboutUs: this.props.aboutUs
        })
      }else{
        this.setState(prevState => ({
          aboutUs: {
            ...prevState.aboutUs,
            info: '', url: ''
          }
        }))
      }
    }
  }
  onChangeInput(event) {
    let aboutUs = { ...this.state.aboutUs };
    aboutUs[event.target.name] = event.target.value;
    this.setState({
      aboutUs: aboutUs, infoRequired: false, eventRequired : false
    });
  }
  handleEventChange (value) {
    if (value !== null) {
      let aboutUs = { ...this.state.aboutUs };
      aboutUs.event = value;
      this.setState({
        aboutUs: aboutUs, infoRequired: false, eventRequired : false
      });
      this.props.getAboutUsForEvent(value);
    }
    else {
      this.onReset();
    }
  }
  onSubmit() {
    if(this.state.aboutUs.info && this.state.aboutUs.event ){
      let isEmpty = !Object.keys(this.props.aboutUs).length;
      if (isEmpty) { //post
        let aboutUs = _.pick(this.state.aboutUs , ['info' , 'url' ,'event']);
        this.props.createAboutUs(aboutUs);
        this.onReset();
      }
      else { //put
        let aboutUs = _.pick(this.state.aboutUs , ['info' , 'url','event']);
        let id = this.props.aboutUs._id;
        this.props.editAboutUs(id, aboutUs);
        this.onReset();
      }
    }else{
      !this.state.aboutUs.info ? this.setState({ infoRequired: true }) : null;
      !this.state.aboutUs.event ? this.setState({ eventRequired: true }) : null;
    }
  }
  onReset() {
    this.setState(prevState => ({
      aboutUs: {
        ...prevState.aboutUs,
        info: '',
        url: '',
        event : ''
      },
      infoRequired: false, eventRequired : false
    }))
  }
  render() {
    const { info, url ,event } = { ...this.state.aboutUs }
    return (
      <CardLayout name="About Us">
        <FormGroup row>
          <Col xs="12" md="4">
            <Select
              placeholder="Select Event"
              value={event}
              options={this.props.eventList}
              simpleValue
              onChange={this.handleEventChange.bind(this)}
            />
            {
              this.state.eventRequired ? <div style={{ color: "red", marginTop: -1 }} className="help-block">*Required</div> : null
            }
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col xs="12" md="6">
            <InputElement
              icon="icon-info"
              type="textarea"
              placeholder="Information about Us..."
              name="info"
              value={info}
              required= {this.state.infoRequired}
              onchanged={(event) => this.onChangeInput(event)}
            />
          </Col>
          <Col md="6">
            <InputElement
              icon="icon-link"
              type="text"
              placeholder="Link to our website"
              name="url"
              value={url}
              onchanged={(event) => this.onChangeInput(event)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col xs="12" md="3">
            <Button type="button" size="md" color="success" onClick={() => this.onSubmit()} >Submit</Button>
          </Col>
          <Col md="3">
            <Button type="button" size="md" color="danger" onClick={() => this.onReset()} style={{ marginLeft: -160 }} >Reset</Button>
          </Col>
          <Col md="6">
            <div style={{ color: "red" }} className="help-block">{this.props.error}</div>
          </Col>
        </FormGroup >
      </CardLayout>
    )
  }
}
const mapStateToProps = state => {
  return {
    aboutUs: state.staticPages.aboutUs,
    error : state.staticPages.error,
    eventList : state.event.eventList,
  };
}
const mapDispatchToProps = dispatch => {
  return {
    getEvents : () => dispatch(actions.getEvents()),
    getAboutUs: () => dispatch(actions.getAboutUsInfo()),
    createAboutUs : (aboutUs) => dispatch(actions.createAboutUsInfo(aboutUs)),
    editAboutUs : (id , aboutUs) => dispatch(actions.editAboutUsInfo(id, aboutUs)),
    getAboutUsForEvent : (eventId) =>  dispatch(actions.getAboutUsForEvent(eventId)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AboutUs);
