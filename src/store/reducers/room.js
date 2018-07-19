import * as actionTypes from '../actions/actionTypes';

const initialState = {
    rooms: [],
    roomList : []
}
const roomReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ROOMS:
            return {
                ...state,
                rooms: action.rooms,
                roomList : action.roomList
            };
        default:
            return state;
    }
}
export default roomReducer;