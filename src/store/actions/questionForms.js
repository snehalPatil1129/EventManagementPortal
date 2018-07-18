import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

export const storeSessionsOfEvent = (sessionList) => {
    return {
        type: actionTypes.GET_SESSIONS_BY_EVENT_ID,
        sessions : sessionList
    };
};
export const storeForms = (forms) => {
    return {
        type: actionTypes.STORE_FORMS,
        forms : forms
    };
};

export const storeCurrentForm = (formData) => {
    return {
        type: actionTypes.STORE_CURRENT_FORM,
        formData : formData
    };
}
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
export const createForm = (formObject) => { 
    console.log('formObject',formObject);
    return dispatch => {
        axios.post(`http://localhost:3000/api/questionForms` , formObject)
            .then((response) => {
                    console.log("createForm", response);
               // dispatch(storeSessionsOfEvent(sessionList));
            })
            .catch((error) => {
                console.log("errror",error);
            })
    }
};

export const getForms = () => {
    let formList=[];  let formData =[];
    return dispatch => {
        axios.get(`http://localhost:3000/api/questionForms`)
            .then((response) => {
                formData = response.data;
                formData.forEach((form) =>{
                    if(form.event !== null){
                        form.eventName = form.event.eventName;
                    }
                    if(form.session !== null){
                        form.sessionName = form.session.session;                        
                    }
                });
                dispatch(storeForms(formData));
            })
            .catch((error) => {
                console.log("errror",error);
            })
    }
};


