import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

export const storeRooms = (rooms) => {
    return {
        type: actionTypes.GET_ROOMS,
        rooms : rooms
    };
};

export const getRooms = () => {
    let roomData = []; 
    return dispatch => {
        axios.get('http://localhost:3000/api/room')
            .then((response) => {
                dispatch(storeRooms(response.data));
                console.log("Printed in room.js[action file]",response.data);
            })
            .catch((error) => {
                console.log("errror");
            })
    }
};
export const createRoom = (room) => {
    let roomData = []; 
    return dispatch => {
        axios.post('http://localhost:3000/api/room', room )
            .then((response) => {
                //dispatch(storeRooms(response.data));
                console.log("Printed in room.js[action file]",response.data);
            })
            .catch((error) => {
                console.log("errror");
            })
    }
};


