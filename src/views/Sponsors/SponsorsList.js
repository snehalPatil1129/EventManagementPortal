import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class SponsorsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    // componentDidMount () {
    //     this.props.getRoomsList();
    //     this.props.getEvents();
    // }
    // onDeleteRoom (cell, row) {
    //     return  <Link to={this}  onClick={() => this.props.deleteRoom(row._id)}>
    //                 <i className="fa fa-trash"></i>
    //             </Link>  
    // }
    // onEditRoom(cell, row) {
    //     return (
    //         <Link to={`${this.props.match.url}/rooms/${row._id}`} onClick={() => this.getRoomToEdit(row)}>
    //             <i className="fa fa-pencil"></i>
    //         </Link>
    //     );
    // }
    // getRoomToEdit (row) {
    //     this.props.storeCurrentRoom(row);  
    // }
    render() {
        //   const options = {
        //     sizePerPageList: [{
        //         text: '250', value: 250
        //         },{
        //         text: '500', value: 500
        //         },{
        //         text: '1000', value: 1000
        //         }, {
        //         text: 'All', value: this.props.roomList.length
        //         } ], 
        //         sizePerPage: 250,  
        // };
        return (
            <div className="animated fadeIn">
        Hello World rm SponsorForm
      </div>
        )
    }
}
const mapStateToProps = state => {
    return {
       // roomList : state.room.rooms
    };
}
const mapDispatchToProps = dispatch => {
    return {
    //    getRoomsList : () => dispatch(actions.getRooms()),
    //    storeCurrentRoom : (room) => dispatch(actions.storeCurrentRoom(room)),
    //    deleteRoom : (id) => dispatch(actions.deleteRoom(id)),
    //    getEvents : () => dispatch(actions.getEvents())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SponsorsList);
