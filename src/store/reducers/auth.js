import * as actionTypes from "../actions/actionTypes";

const initialState = {
  email: "",
  loginError: false,
  forgetPasswordMsg: ""
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return {
        ...state,
        email: action.email,
        loginError: false,
        forgetPasswordMsg: ""
      };
    case actionTypes.LOGOUT_USER:
      return {
        ...state,
        email: "",
        forgetPasswordMsg: ""
      };
    case actionTypes.LOGIN_ERROR:
      return {
        ...state,
        loginError: true,
        forgetPasswordMsg: ""
      };
    case actionTypes.FORGET_PASSWORD:
      return {
        ...state,
        forgetPasswordMsg: action.forgetPasswordMsg
      };
    default:
      return state;
  }
};
export default authReducer;
