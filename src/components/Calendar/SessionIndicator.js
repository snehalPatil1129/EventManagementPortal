import React from "react";
import { Alert, Row, Col, Button, FormGroup } from "reactstrap";

const SessionIndicator = props => {
  return (
    <div style={{ marginTop: -10 }}>
      <FormGroup row>
        <Col xs="'12" md="2">
          <Alert style={{ height: "5px", backgroundColor :"#" + "800000" }}>
            <p style={{ marginTop: -10 }}>
              <center>Breakout</center>
            </p>
          </Alert>
        </Col>
        <Col xs="'12" md="2">
          <Alert style={{ height: "5px" }} color="secondary">
            <p style={{ marginTop: -10 }}>
              <center> Deepdive</center>
            </p>
          </Alert>
        </Col>
        <Col xs="'12" md="2">
          <Alert style={{ height: "5px" }} color="success">
            <p style={{ marginTop: -10 }}>
              <center> Keynote</center>
            </p>
          </Alert>
        </Col>
        <Col xs="'12" md="2">
          <Alert style={{ height: "5px" }} color="danger">
            <p style={{ marginTop: -10 }}>
              <center> Panel </center>
            </p>
          </Alert>
        </Col>
        <Col xs="'12" md="2">
          <Alert style={{ height: "5px" }} color="warning">
            <p style={{ marginTop: -10 }}>
              <center> Common </center>
            </p>
          </Alert>
        </Col>
      </FormGroup>
    </div>
  );
};

export default SessionIndicator;
