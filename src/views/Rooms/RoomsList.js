import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link ,Redirect} from 'react-router-dom';
import * as actions from '../../store/actions/index';
import { FormGroup, Col, Button, Input, InputGroup } from 'reactstrap';
import CardLayout from '../../components/CardLayout/';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

class RoomsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount () {
        this.props.getRoomsList();
        this.props.getEvents();
    }
    onDeleteRoom (cell, row) {
        return  <Link to={this}  onClick={() => this.props.deleteRoom(row._id)}>
                    <i className="fa fa-trash"></i>
                </Link>  
    }
    onEditRoom(cell, row) {
        return (
            <Link to={`${this.props.match.url}/rooms/${row._id}`} onClick={() => this.getRoomToEdit(row)}>
                <i className="fa fa-pencil"></i>
            </Link>
        );
    }
    getRoomToEdit (row) {
        this.props.storeCurrentRoom(row);  
    }
    render() {
          const options = {
            sizePerPageList: [{
                text: '250', value: 250
                },{
                text: '500', value: 500
                },{
                text: '1000', value: 1000
                }, {
                text: 'All', value: this.props.roomList.length
                } ], 
                sizePerPage: 250,  
        };
        return (
            <CardLayout name="Rooms List">
                <FormGroup row>
                        <Link to={`${this.props.match.url}/rooms`}>
                            <Button type="button" color="primary" style={{marginBottom : -35}} size="small"> <i className="fa fa-plus"></i>
                                Create Room </Button>
                        </Link>
                </FormGroup>
                <FormGroup row>
                    <BootstrapTable ref='table' data={this.props.roomList} pagination={true} search={true} options={options} >
                        <TableHeaderColumn dataField='_id' headerAlign='left' isKey hidden>Id</TableHeaderColumn>
                        <TableHeaderColumn dataField='roomName' headerAlign='left' width='100' >Room Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='eventName' headerAlign='left' width='100' >Event Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='capacity' headerAlign='left' width='100' >Capacity</TableHeaderColumn>
                        <TableHeaderColumn dataField='edit' dataFormat={this.onEditRoom.bind(this)} headerAlign='left' width='30' export={false}></TableHeaderColumn>
                        <TableHeaderColumn dataField='delete' dataFormat={this.onDeleteRoom.bind(this)} headerAlign='left' width='30' export={false}></TableHeaderColumn> 
                    </BootstrapTable>
                </FormGroup>
            </CardLayout>
        )
    }
}
const mapStateToProps = state => {
    return {
        roomList : state.room.rooms
    };
}
const mapDispatchToProps = dispatch => {
    return {
       getRoomsList : () => dispatch(actions.getRooms()),
       storeCurrentRoom : (room) => dispatch(actions.storeCurrentRoom(room)),
       deleteRoom : (id) => dispatch(actions.deleteRoom(id)),
       getEvents : () => dispatch(actions.getEvents())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RoomsList);
