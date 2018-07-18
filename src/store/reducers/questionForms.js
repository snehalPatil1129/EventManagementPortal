import * as actionTypes from '../actions/actionTypes';

const initialState = {
    sessions: [],
    formTypes: [
        { label: "Home Questions", value: "Home Questions" },
        { label: "Polling Questions", value: "Polling Questions" },
        { label: "Feedback Questions", value: "Feedback Questions" }
    ],
    forms: [],
    formData: []
}
const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_SESSIONS_BY_EVENT_ID:
            return {
                ...state,
                sessions: action.sessions
            };
        case actionTypes.STORE_FORMS:
            return {
                ...state,
                forms: action.forms
            };
        case actionTypes.STORE_CURRENT_FORM:
            return {
                ...state,
                formData: action.formData
            };
        default:
            return state;
    }
}
export default formReducer;