import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

export const storeSessionsOfEvent = (sessionList) => {
    return {
        type: actionTypes.GET_SESSIONS_BY_EVENT_ID,
        sessions : sessionList
    };
};

export const getSessionsOfEvent = (id) => {
    let sessionList = []; 
    return dispatch => {
        axios.get(`http://localhost:3000/api/session/getSessions/${id}`)
            .then((response) => {
                let sessions = response.data;
                sessions.forEach((sessionObj)=>{
                    sessionList.push({label : sessionObj.sessionName , value : sessionObj._id});
                })
                dispatch(storeSessionsOfEvent(sessionList));
            })
            .catch((error) => {
                console.log("errror",error);
            })
    }
};



