import * as actionTypes from '../actions/actionTypes';

const initialState = {
    error: '',
    attendeeList: [],
    attendeeData : {},
    errorFlag : false,
    createEditError : false,
    getAttendeeError : false,
    deleteAttendeeError : false
}
const registrationReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ATTENDEE_LIST:
            return {
                ...state,
                attendeeList: action.attendeeList,
                error: '',
                createEditError : false,
                getAttendeeError : false,
                deleteAttendeeError : false
            };
        case actionTypes.GET_ATTENDEE_DATA:
            return {
                ...state,
                attendeeData: action.attendeeData,
                error: '',
                createEditError : false,
                getAttendeeError : false,
                deleteAttendeeError : false
            };
        case actionTypes.LOG_REGISTRATION_ERROR:
            return {
                ...state,
                createEditError : false,
                getAttendeeError : false,
                deleteAttendeeError : false
            };
        case actionTypes.CREATE_EDIT_ATTENDEE_FAIL:
            return {
                ...state,
                createEditError : true
            };
        case actionTypes.GET_ATTENDEE_LIST_FAIL:
            return {
                ...state,
                getAttendeeError: true
            };
        case actionTypes.DELETE_ATTENDEE_FAIL:
            return {
                ...state,
                deleteAttendeeError: true
            };
        default:
            return state;
    }
}
export default registrationReducer;