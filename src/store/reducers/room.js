import * as actionTypes from '../actions/actionTypes';

const initialState = {
    rooms: [],
    roomList: [],
    currentRoom: [],
    error : ''
}
const roomReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ROOMS:
            return {
                ...state,
                rooms: action.rooms,
                roomList: action.roomList,
                currentRoom: [],
                 error : ''
            };
        case actionTypes.STORE_CURRENT_ROOM:
            return {
                ...state,
                currentRoom: action.currentRoom,
                error : ''
            };
        case actionTypes.LOG_ROOM_ERROR:
            return {
                ...state,
                error : action.error
            };
        default:
            return state;
    }
}
export default roomReducer;