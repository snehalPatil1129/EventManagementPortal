import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { FormGroup, Col, Button, Input, InputGroup } from 'reactstrap';
import InputElement from '../../components/Input/';
import CardLayout from '../../components/CardLayout/';
import Select from 'react-select';
import _ from 'lodash';

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
            editRoom : false,
            roomNameRequired : false,
            eventRequired : false,
            capacityRequired : false
        }
    }
    componentDidMount () {
        let currentroom = _.pick(this.props.currentRoom , ['roomName' ,'capacity' , 'bufferCapacity' ,'availableServices']);
        let notEmpty = !Object.keys(currentroom).length;
        if (!notEmpty) {
            currentroom.event = this.props.currentRoom.event._id;
            this.setState({
                ...this.state.Room,
                Room: currentroom,
                editRoom: true
            });
        }
    }
    onChangeInput(event) {
        const { Room } = { ...this.state };
        Room[event.target.name] = event.target.value;
        this.setState({
            Room : Room
        })
    }
    onSubmit() {
        let Room = { ...this.state.Room };
        let id = this.props.currentRoom._id;
        if (Room.roomName && Room.capacity && Room.event) {
            this.state.editRoom ? this.props.editRoom(id , Room) : this.props.createRoom(Room);
            this.onReset();
            this.props.history.push('/roomsList');
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
                capacity: '',
                bufferCapacity: '',
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
    handleEventSelectChange (value) {
        if(value !== null){
            let Room = {...this.state.Room };
            Room.event = value;
            this.setState({Room : Room});
        }
    }
    render() {
        const { Room } = this.state;
        const options = [
            { label: 'Hi', value: 'Hi' },
            { label: 'Hello', value: 'Hello' },
            { label: 'Bye', value: 'Bye' },
            { label: 'Hi', value: 'Hi' },{ label: 'Hi', value: 'Hi' },
            { label: 'Hi', value: 'Hi' },
        ];
        const eventOptions = this.props.eventList;
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
                        <Select
                            placeholder="Select Event"
                            value={Room.event}
                            options={eventOptions}
                            simpleValue
                            onChange={this.handleEventSelectChange.bind(this)}
                        />
                        {this.state.eventRequired ? <div style={{color: "red" , marginTop: 0}} className="help-block">*Required</div> : null}
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
                            multi
                            onChange={this.handleSelectChange.bind(this)}
                            placeholder="Select your Services(s)"
                            simpleValue
                            value={Room.availableServices}
                            options={options}
                            clearable
                        />
                    </Col>
                </FormGroup >
                <FormGroup row>
                    <Col xs="12" md="3">
                        <Button type="button" size="md" color="success" onClick={() => this.onSubmit()} >Submit</Button>
                    </Col>
                    <Col  md="3">
                        <Button type="button" size="md" color="danger" style={{marginLeft : -160}} onClick={() => this.onReset()} >Reset</Button>
                    </Col>
                    <Col md="6">
                        {
                            this.props.roomError !== "" ? <div style={{color: "red" , fontSize : 15 , marginTop : 0}} className="help-block">{this.props.roomError}</div> : null 
                        }
                    </Col>
                </FormGroup >
            </CardLayout>
        )
    }
}
const mapStateToProps = state => {
    return {
        rooms: state.room.rooms,
        eventList : state.event.eventList,
        currentRoom : state.room.currentRoom,
        roomError : state.room.error
    };
}
const mapDispatchToProps = dispatch => {
    return {
        getRooms: () => dispatch(actions.getRooms()),
        createRoom: (room) => dispatch(actions.createRoom(room)),
        editRoom : (id, room) => dispatch(actions.editRoom(id, room))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
