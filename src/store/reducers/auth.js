import * as actionTypes from '../actions/actionTypes';

const initialState = {
   email : ''
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_USER:
            return {
                ...state,
                email: action.email,
            };
        case actionTypes.LOGOUT_USER:
            return {
                ...state,
                email: "",
            };
        default:
            return state;
    }
}
export default authReducer;