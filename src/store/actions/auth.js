import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

export const storeUser = (userData) => {
    return {
        type: actionTypes.LOGIN_USER,
        email : userData.email
    };
};
export const logoutUser = () => {
    return {
        type : actionTypes.LOGOUT_USER
    }
}
export const loginUser = (user) => {
    return dispatch => {
        axios.post('http://localhost:3000/api/authenticate',user)
            .then((response) => {
                console.log(response);
                if(response.data){
                    dispatch(storeUser(user));
                }
            })
            .catch((error) => {
                console.log("errror" , error);
            })
    }
};



