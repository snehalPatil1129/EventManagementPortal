import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions/index";
import { FormGroup, Col, Button } from "reactstrap";
import CardLayout from "../../components/CardLayout/";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import Select from "react-select";
import "react-select/dist/react-select.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class RoomsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: ""
    };
  }
  componentDidMount() {
    this.props.getRoomsList();
    this.getRoomErrorToaster();
    this.props.getEvents();
  }
  getRoomErrorToaster() {
    let compRef = this;
    setTimeout(() => {
      let getRoomError = compRef.props.getRoomError;
      if (getRoomError) {
        toast.error("Something went wrong", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      }
    }, 1000);
  }
  onDeleteRoom(cell, row) {
    return (
      <Link to={this} onClick={() => this.deleteRoom(row._id)}>
        <i className="fa fa-trash" title="Delete" />
      </Link>
    );
  }
  deleteRoom(id) {
    this.props.deleteRoom(id);
    let compRef = this;
    setTimeout(() => {
      let deleteRoomError = compRef.props.deleteRoomError;
      compRef.Toaster(compRef, deleteRoomError, "Delete");
    }, 1000);
  }

  Toaster(compRef, deleteRoomError, actionName) {
    if (!deleteRoomError) {
      toast.success("Room " + actionName + " Successfully.", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    } else {
      toast.error("Something went wrong", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  }
  onEditRoom(cell, row) {
    return (
      <Link
        to={`${this.props.match.url}/rooms/${row._id}`}
        onClick={() => this.getRoomToEdit(row)}
      >
        <i className="fa fa-pencil" title="Edit" />
      </Link>
    );
  }
  getRoomToEdit(row) {
    this.props.storeCurrentRoom(row);
  }
  handleEventChange(value) {
    if (value !== null) {
      this.setState({
        event: value
      });
      this.props.getRoomsForEvent(value);
      this.getRoomErrorToaster();
    } else {
      this.setState({
        event: ""
      });
      this.props.getRoomsList();
      this.getRoomErrorToaster();
    }
  }
  render() {
    const options = {
      sizePerPageList: [
        {
          text: "250",
          value: 250
        },
        {
          text: "500",
          value: 500
        },
        {
          text: "1000",
          value: 1000
        },
        {
          text: "All",
          value: this.props.roomList.length
        }
      ],
      sizePerPage: 250
    };
    return (
      <CardLayout name="Rooms List">
        <FormGroup row>
          <Col xs="12" md="8">
            <Link to={`${this.props.match.url}/rooms`}>
              <Button
                type="button"
                color="primary"
                style={{ marginBottom: -35 }}
                size="small"
              >
                {" "}
                <i className="fa fa-plus" />
                Create Room{" "}
              </Button>
            </Link>
          </Col>{" "}
          <Col md="4">
            <Select
              name="Event"
              placeholder="Select Event"
              options={this.props.eventList}
              value={this.state.event}
              simpleValue
              onChange={this.handleEventChange.bind(this)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <BootstrapTable
            ref="table"
            data={this.props.roomList}
            pagination={true}
            search={true}
            options={options}
          >
            <TableHeaderColumn dataField="_id" headerAlign="left" isKey hidden>
              Id
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="roomName"
              headerAlign="left"
              width="100"
            >
              Room Name
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="eventName"
              headerAlign="left"
              width="100"
            >
              Event Name
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="capacity"
              headerAlign="left"
              width="100"
            >
              Capacity
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="edit"
              dataFormat={this.onEditRoom.bind(this)}
              headerAlign="left"
              width="30"
              export={false}
            >
              Edit
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="delete"
              dataFormat={this.onDeleteRoom.bind(this)}
              headerAlign="left"
              width="30"
              export={false}
            >
              Delete
            </TableHeaderColumn>
          </BootstrapTable>
        </FormGroup>
        <Col>
          <ToastContainer autoClose={2000} />
        </Col>
      </CardLayout>
    );
  }
}
const mapStateToProps = state => {
  return {
    roomList: state.room.rooms,
    eventList: state.event.eventList,
    deleteRoomError: state.room.deleteRoomError,
    getRoomError: state.room.getRoomError
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getRoomsList: () => dispatch(actions.getRooms()),
    storeCurrentRoom: room => dispatch(actions.storeCurrentRoom(room)),
    deleteRoom: id => dispatch(actions.deleteRoom(id)),
    getEvents: () => dispatch(actions.getEvents()),
    getRoomsForEvent: eventId => dispatch(actions.getRoomsForEvent(eventId))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomsList);
