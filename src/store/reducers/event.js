import * as actionTypes from '../actions/actionTypes';

const initialState = {
    events: [],
    loading: false,
    eventCreated: false,
    errorMessage : '',
    error : false
}
const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_EVENTS_SUCCESS:
            return {
                ...state,
                events: action.events
            };
        case actionTypes.GET_EVENTS_FAIL:
            return {
                ...state,
                error : true,
                errorMessage : action.error
            };
        case actionTypes.CREATE_EVENT_SUCCESS:
            const newEvent = {
                ...action.event,
                id: action.eventId
            };
            return {
                ...state,
                events: state.events.concat(newEvent),
                eventCreated: true
            };
      case actionTypes.CREATE_EVENT_FAIL:
         return {
                ...state,
                eventCreated: false,
                error : true,
                errorMessage : action.error,
            };

     case actionTypes.UPDATE_EVENT_SUCCESS:

        return {
             ...state,
        }
      
      case actionTypes.UPDATE_EVENT_FAIL:
         return {
                ...state,
                eventCreated: false,
                error : true,
                errorMessage : action.error,
            };
            default:
            return state;
    }
}
export default eventReducer;