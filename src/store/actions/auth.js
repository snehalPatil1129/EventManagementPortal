import * as actionTypes from "../actions/actionTypes";
import axios from "axios";
import AppConfig from "../../constants/AppConfig";
export const storeUser = userData => {
  return {
    type: actionTypes.LOGIN_USER,
    email: userData.email
  };
};
export const logoutUser = () => {
  return {
    type: actionTypes.LOGOUT_USER
  };
};
export const loginError = () => {
  return {
    type: actionTypes.LOGIN_ERROR
  };
};
export const forgetPasswordMsg = msg => {
  return {
    type: actionTypes.FORGET_PASSWORD,
    forgetPasswordMsg: msg
  };
};
export const loginUser = user => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/authenticate`, user)
      .then(response => {
        if (response.data) {
          dispatch(storeUser(user));
        }
      })
      .catch(error => {
        dispatch(loginError());
      });
  };
};
export const forgetPassword = email => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/authenticate/forgotPassword/${email}`)
      .then(response => {
        if (response.data) {
          dispatch(
            forgetPasswordMsg("Please check your mail for new password")
          );
        }
      })
      .catch(error => {
        dispatch(forgetPasswordMsg(error.response.data));
      });
  };
};
