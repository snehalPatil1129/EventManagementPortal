import React, { Component } from 'react';
import FormLayout from '../../components/FormLayout/';
import { Link, Button, FormGroup, Col } from 'reactstrap';
import InputElement from '../../components/Input/';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
let email = "" ; let password = "";

class Login extends Component {

  onChangeHandler (event) {
    if(event.target.name == "email"){
      email = event.target.value;
    }
    if(event.target.name == "password"){
     password = event.target.value;
    }
  }
  onSubmit () {
    let user = {
      email : email,
      password : password
    }

    this.props.loginUser(user);
    this.props.history.push("/");
  }
  render() {
    return (
      <FormLayout>
        <h1>Login</h1>
        <p className="text-muted">Sign In to your account</p>
        <FormGroup row>
          <Col md="6" xs="12">
            <InputElement
              type="email"
              name="email"
              placeholder="Email"
              icon='icon-envelope'
              onchanged = {(event) => this.onChangeHandler(event)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="6" >
            <InputElement
              type="password"
              name="password"
              placeholder="Password"
              icon='icon-key'
              onchanged = {(event) => this.onChangeHandler(event)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col xs="12" md="6" >
            <Button color="primary" onClick = {this.onSubmit.bind(this)} >Login</Button>
          </Col>
          <Col md="6" >
            <Button color="link" >Forgot password?</Button>
          </Col>
        </FormGroup>
      </FormLayout>
    )
  }
}
const mapStateToProps = state =>  {
  return {
        
  };
}
const mapDispatchToProps = dispatch =>  {
  return {
      loginUser : (user) => dispatch(actions.loginUser(user)) 
  };
}
export default connect(mapStateToProps ,mapDispatchToProps)(Login);
