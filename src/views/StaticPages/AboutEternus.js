import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { FormGroup, Col, Button } from 'reactstrap';
import InputElement from '../../components/Input/';
import CardLayout from '../../components/CardLayout/';

class AboutEternus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutEternus: {
        info: '', url: ''
      },
      infoRequired: false
    }
  }
  componentWillMount() {
    this.props.getAboutEternus();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.aboutEternus !== this.props.aboutEternus) {
      this.setState({
        aboutEternus: this.props.aboutEternus
      })
    }
  }
  onChangeInput(event) {
    let aboutEternus = { ...this.state.aboutEternus };
    aboutEternus[event.target.name] = event.target.value;
    this.setState({
      aboutEternus: aboutEternus
    });
  }
  onSubmit() {
    if (this.state.aboutEternus.info) {
      let isEmpty = !Object.keys(this.props.aboutEternus).length;
      if (isEmpty) { //post
        let aboutEternus = _.pick(this.state.aboutEternus, ['info', 'url']);
        this.props.createAboutEternus(aboutEternus);
        this.onReset();
      }
      else { //put
        let aboutEternus = _.pick(this.state.aboutEternus, ['info', 'url']);
        let id = this.props.aboutEternus._id;
        this.props.editAboutEternus(id, aboutEternus);
        this.onReset();
      }
    }
    else {
      !this.state.aboutEternus.info ? this.setState({ infoRequired: true }) : null;
    }
  }
  onReset() {
    this.setState(prevState => ({
      aboutEternus: {
        ...prevState.aboutEternus,
        info: '',
        url: ''
      },
      infoRequired: false
    }))
  }
  render() {
    const { info, url } = { ...this.state.aboutEternus }
    return (
      <CardLayout name="About Eternus">
        <FormGroup row>
          <Col xs="12" md="6">
            <InputElement
              icon="icon-info"
              type="textarea"
              placeholder="Information about Eternus..."
              name="info"
              value={info}
              required={this.state.infoRequired}
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
            <Button type="button" size="md" color="danger" style={{ marginLeft: -160 }} onClick={() => this.onReset()} >Reset</Button>
          </Col>
          <Col md="6">
                 <div style={{color: "red"}} className="help-block">{this.props.error}</div>
          </Col>
        </FormGroup >
      </CardLayout>
    )
  }
}
const mapStateToProps = state => {
  return {
    aboutEternus: state.staticPages.aboutEternus,
    error : state.staticPages.error
  };
}
const mapDispatchToProps = dispatch => {
  return {
    getAboutEternus: () => dispatch(actions.getAboutEternusInfo()),
    createAboutEternus: (aboutEternus) => dispatch(actions.createAboutEternusInfo(aboutEternus)),
    editAboutEternus: (id, aboutEternus) => dispatch(actions.editAboutEternusInfo(id, aboutEternus))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AboutEternus);
