import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { FormGroup, Col, Button } from 'reactstrap';
import InputElement from '../../components/Input/';
import CardLayout from '../../components/CardLayout/';
import _ from 'lodash';

class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutUs: {
        info: '', url: ''
      }
    }
  }
  componentWillMount() {
    this.props.getAboutUs();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.aboutUs !== this.props.aboutUs) {
      this.setState({
        aboutUs: this.props.aboutUs
      })
    }
  }
  onChangeInput(event) {
    let aboutUs = { ...this.state.aboutUs };
    aboutUs[event.target.name] = event.target.value;
    this.setState({
      aboutUs: aboutUs
    });
  }
  onSubmit() {
    let isEmpty = !Object.keys(this.props.aboutUs).length;
    if (isEmpty) { //post
      let aboutUs = _.pick(this.state.aboutUs , ['info' , 'url']);
      this.props.createAboutUs(aboutUs);
      this.onReset();
    }
    else { //put
      let aboutUs = _.pick(this.state.aboutUs , ['info' , 'url']);
      let id = this.props.aboutUs._id;
      this.props.editAboutUs(id, aboutUs);
      this.onReset();
    }
  }
  onReset() {
    this.setState(prevState => ({
      aboutUs: {
        ...prevState.aboutUs,
        info: '',
        url: ''
      }
    }))
  }
  render() {
    const { info, url } = { ...this.state.aboutUs }
    return (
      <CardLayout name="About Us">
        <FormGroup row>
          <Col xs="12" md="6">
            <InputElement
              icon="icon-info"
              type="textarea"
              placeholder="Information about Eternus..."
              name="info"
              value={info}
              onchanged={(event) => this.onChangeInput(event)}
            />
          </Col>
          <Col md="6">
            <InputElement
              icon="icon-link"
              type="text"
              placeholder="Link to Eternus"
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
                {/* error */}
          </Col>
        </FormGroup >
      </CardLayout>
    )
  }
}
const mapStateToProps = state => {
  return {
    aboutUs: state.staticPages.aboutUs
  };
}
const mapDispatchToProps = dispatch => {
  return {
    getAboutUs: () => dispatch(actions.getAboutUsInfo()),
    createAboutUs : (aboutUs) => dispatch(actions.createAboutUsInfo(aboutUs)),
    editAboutUs : (id , aboutUs) => dispatch(actions.editAboutUsInfo(id, aboutUs))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AboutUs);
