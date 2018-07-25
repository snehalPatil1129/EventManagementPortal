import * as actionTypes from '../actions/actionTypes';

const initialState = {
    sessions: [],
}
const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
     
        case actionTypes.GET_SESSIONS_SUCCESS:
            return {
                ...state,
                sessions: action.sessions,
                sessionList : action.sessionList
            };
       
        case actionTypes.CREATE_SESSION_SUCCESS:
            const newSession = {
                ...action.session,
                id: action.sessionId
            };
            return {
                ...state,
                sessions: state.sessions.concat(newSession),
                sessionCreated: true
            };
     

     case actionTypes.UPDATE_SESSION_SUCCESS:

        return {
             ...state,
        }
    
            default:
            return state;
    }
}
export default sessionReducer;