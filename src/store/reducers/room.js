import * as actionTypes from '../actions/actionTypes';

const initialState = {
    rooms: [],
    roomList: [],
    currentRoom: [],
}
const roomReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ROOMS:
            return {
                ...state,
                rooms: action.rooms,
                roomList: action.roomList
            };
        case actionTypes.STORE_CURRENT_ROOM:
            return {
                ...state,
                currentRoom: action.currentRoom
            };
        default:
            return state;
    }
}
export default roomReducer;