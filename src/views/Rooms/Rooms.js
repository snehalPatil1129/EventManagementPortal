import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { FormGroup, Col, Button, Input, InputGroup } from 'reactstrap';
import InputElement from '../../components/Input/';
import CardLayout from '../../components/CardLayout/';
import Select from 'react-select';


class Rooms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Room: {
                roomName: '',
                event: '',
                capacity: '',
                bufferCapacity: '',
                availableServices: []
            },
            roomNameRequired : false,
            eventRequired : false,
            capacityRequired : false
        }
    }
    onChangeInput(event) {
        const { Room } = { ...this.state };
        Room[event.target.name] = event.target.value;
    }
    onSubmit() {
        let Room = { ...this.state.Room };
        if (Room.roomName && Room.capacity && Room.event) {
            this.props.createRoom(Room);
            this.onReset();
        }
        else {
            !Room.roomName ? this.setState({roomNameRequired : true}) : null;
            !Room.capacity ? this.setState({capacityRequired : true}) : null;
            !Room.event ? this.setState({eventRequired : true}) : null; 
            //alert("please fill all the fields...");
        }
    }
    onReset() {
        this.setState({
            Room: {
                roomName: '',
                event: '',
                capacity: 0,
                bufferCapacity: 0,
                availableServices: [],
            }
        });
    }
    handleSelectChange(value) {
        if(value !== null){
            let profileServiceArray = this.state.Room.availableServices;
            profileServiceArray.push(value);
            let len = profileServiceArray.length;
            let { Room } = this.state;
            if (len) {
              let lastEle = Room.availableServices[len - 1]
              let profilesArray = lastEle.split(',');
              Room.availableServices = profilesArray;
              this.setState({Room : Room});
            }
        }
    }
    render() {
        const { Room } = this.state;
        const { availableServices } = this.state.Room;
        const options = [
            { label: 'Hi', value: 'Hi' },
            { label: 'Hello', value: 'Hello' },
            { label: 'Bye', value: 'Bye' },
            { label: 'Hi', value: 'Hi' },{ label: 'Hi', value: 'Hi' },
            { label: 'Hi', value: 'Hi' },
        ];
        //let value = availableServices;
        return (
            <CardLayout name="Room">
                <FormGroup row>
                    <Col xs="12" md="6">
                        <InputElement
                            icon="icon-home"
                            type="text"
                            placeholder="Room Name"
                            name="roomName"
                            required= {this.state.roomNameRequired}
                            value={Room.roomName}
                            onchanged={(event) => this.onChangeInput(event)}
                        />
                    </Col>
                    <Col md="6">
                        <InputElement
                            icon="icon-calendar"
                            type="text"
                            placeholder="Event Name"
                            name="event"
                            value={Room.event}
                            required= {this.state.eventRequired}
                            onchanged={(event) => this.onChangeInput(event)}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col xs="12" md="6">
                        <InputElement
                            icon="icon-pie-chart"
                            type="number"
                            placeholder="Capacity"
                            name="capacity"
                            value={Room.capacity}
                            required= {this.state.capacityRequired}
                            onchanged={(event) => this.onChangeInput(event)}
                        />
                    </Col>
                    <Col md="6">
                        <InputElement
                            icon="icon-pie-chart"
                            type="number"
                            placeholder="Buffer Capacity"
                            name="bufferCapacity"
                            value={Room.bufferCapacity}
                            onchanged={(event) => this.onChangeInput(event)}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="6">
                        <Select
                            name = 'Services'
                            multi
                            onChange={this.handleSelectChange.bind(this)}
                            placeholder="Select your Services(s)"
                            simpleValue
                            value={availableServices}
                            options={options}
                            clearable
                        />
                    </Col>
                </FormGroup >
                <Button type="button" size="md" color="success" onClick={() => this.onSubmit()} >SUBMIT</Button>
            </CardLayout>
        )
    }
}

const mapStateToProps = state => {
    return {
        rooms: state.room.rooms
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getRooms: () => dispatch(actions.getRooms()),
        createRoom: (room) => dispatch(actions.createRoom(room))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
