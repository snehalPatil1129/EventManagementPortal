import React from "react";
import { Input, InputGroup, InputGroupText, InputGroupAddon } from "reactstrap";
import "./inputStyle.css";
const InputElement = props => (
  <InputGroup className="mb-3">
    <InputGroupAddon addonType="prepend">
      <InputGroupText>
        <i className={props.icon} />
      </InputGroupText>
    </InputGroupAddon>
    <Input
      type={props.type}
      placeholder={props.placeholder}
      name={props.name}
      maxLength={props.maxLength}
      onChange={props.onchanged}
      value={props.value}
      className={props.type}
    />
    {props.required ? (
      <div style={{ color: "red" }} className="help-block">
        {props.placeholder} is Required
      </div>
    ) : null}
    {props.inValid ? (
      <div style={{ color: "red" }} className="help-block">
        {props.placeholder} is Invalid
      </div>
    ) : null}
  </InputGroup>
);

export default InputElement;
