import * as actionTypes from '../actions/actionTypes';

const initialState = {
    sessions : [],
    formTypes : [
        {label : "Home Questions",value : "Home Questions"},
        {label : "Polling Questions",value : "Polling Questions"},
        {label : "Feedback Questions",value : "Feedback Questions"}
    ]
}
const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_SESSIONS_BY_EVENT_ID:
            return {
                ...state,
               sessions : action.sessions
            };
        default:
            return state;
    }
}
export default formReducer;