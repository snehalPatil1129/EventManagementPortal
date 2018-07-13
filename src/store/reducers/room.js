import * as actionTypes from '../actions/actionTypes';

const initialState = {
    rooms: []
}
const roomReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ROOMS:
            return {
                ...state,
                rooms: action.rooms,
            };
        // case actionTypes.C_ROOMS:
        //     return {
        //         ...state,
        //         rooms: action.rooms,
        //     };
        default:
            return state;
    }
}
export default roomReducer;