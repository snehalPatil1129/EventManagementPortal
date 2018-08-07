import * as actionTypes from "../actions/actionTypes";

const initialState = {
  email: "",
  loginError: false
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return {
        ...state,
        email: action.email,
        loginError: false
      };
    case actionTypes.LOGOUT_USER:
      return {
        ...state,
        email: ""
      };
    case actionTypes.LOGIN_ERROR:
      return {
        ...state,
        loginError: true
      };
    default:
      return state;
  }
};
export default authReducer;
