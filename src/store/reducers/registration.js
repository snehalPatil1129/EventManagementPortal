import * as actionTypes from '../actions/actionTypes';

const initialState = {
    error: '',
    attendeeList: [],
    attendeeData : {}
}
const registrationReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ATTENDEE_LIST:
            return {
                ...state,
                attendeeList: action.attendeeList,
                error: '',
            };
        case actionTypes.GET_ATTENDEE_DATA:
            return {
                ...state,
                attendeeData: action.attendeeData,
                error: '',
            };
        case actionTypes.LOG_REGISTRATION_ERROR:
            return {
                ...state,
                error: action.error,
            };
        default:
            return state;
    }
}
export default registrationReducer;