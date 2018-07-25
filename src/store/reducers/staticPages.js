import * as actionTypes from '../actions/actionTypes';

const initialState = {
    aboutUs: {},
    aboutEternus: {},
    helpDesk: {},
    eventLocation: {},
    error: ''
}

const staticPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_ABOUT_US:
            return {
                ...state,
                aboutUs: action.aboutUs,
                error: ''
            }
        case actionTypes.STORE_ABOUT_ETERNUS:
            return {
                ...state,
                aboutEternus: action.aboutEternus,
                error: ''
            }
        case actionTypes.STORE_HELPDESK_DETAILS:
            return {
                ...state,
                helpDesk: action.helpDesk,
                error: ''
            }
        case actionTypes.STORE_EVENT_LOCATION:
            return {
                ...state,
                eventLocation: action.eventLocation,
                error: ''
            }
        case actionTypes.LOG_STATIC_PAGE_ERROR:
            return {
                ...state,
                error: action.error
            }
        default:
            return {
                ...state
            }
    }
}
export default staticPageReducer;
