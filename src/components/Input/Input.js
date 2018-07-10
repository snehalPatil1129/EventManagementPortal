import React from 'react';
import {
    Input, InputGroup, InputGroupText, InputGroupAddon
} from 'reactstrap';

const InputElement = (props) => (
    <InputGroup className="mb-3">
        <InputGroupAddon addonType="prepend">
            <InputGroupText><i className="icon-pie-chart"></i></InputGroupText>
        </InputGroupAddon>
        <Input 
            type={props.type} 
            placeholder={props.placeholder} 
            name={props.name} 
            onChange ={props.onchanged}  />
    </InputGroup>
);

export default InputElement;