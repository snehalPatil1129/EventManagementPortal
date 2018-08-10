import * as actionTypes from "../actions/actionTypes";

const initialState = {
  error: "",
  attendeeList: [],
  attendeeData: {},
  errorFlag: false,
  createEditError: false,
  getAttendeeError: false,
  deleteAttendeeError: false,
  creatError: ""
};
const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ATTENDEE_LIST:
      return {
        ...state,
        attendeeList: action.attendeeList,
        error: "",
        createEditError: false,
        getAttendeeError: false,
        deleteAttendeeError: false,
        creatError: ""
      };
    case actionTypes.GET_ATTENDEE_DATA:
      return {
        ...state,
        attendeeData: action.attendeeData,
        error: "",
        createEditError: false,
        getAttendeeError: false,
        deleteAttendeeError: false,
        creatError: ""
      };
    case actionTypes.LOG_REGISTRATION_ERROR:
      return {
        ...state,
        createEditError: false,
        getAttendeeError: false,
        deleteAttendeeError: false,
        creatError: ""
      };
    case actionTypes.CREATE_EDIT_ATTENDEE_FAIL:
      return {
        ...state,
        createEditError: true,
        creatError: action.creatError
      };
    case actionTypes.GET_ATTENDEE_LIST_FAIL:
      return {
        ...state,
        getAttendeeError: true,
        creatError: ""
      };
    case actionTypes.DELETE_ATTENDEE_FAIL:
      return {
        ...state,
        deleteAttendeeError: true,
        creatError: ""
      };
    default:
      return state;
  }
};
export default registrationReducer;
