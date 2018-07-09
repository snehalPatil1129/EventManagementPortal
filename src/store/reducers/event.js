import * as actionTypes from '../actions/actionTypes';

const initialState = {
    eventList : [],
    eventData : [],
}
const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_EVENTS:
            return {
                ...state,
                eventData: action.eventData,
                eventList: action.eventList
            };
        default:
            return state;
    }
}
export default eventReducer;