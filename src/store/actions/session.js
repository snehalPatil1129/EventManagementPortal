import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

export const getSessionsSuccess = (sessions, sessionList) => {
    return {
        type: actionTypes.GET_SESSIONS_SUCCESS,
        sessions : sessions,
        sessionList : sessionList
    };
};

export const createSessionSuccess = (sessionId, session)=>{
  return{
      type : actionTypes.CREATE_SESSION_SUCCESS,
      sessionId : sessionId,
      session : session
  }
}

export const updateSessionSuccess = (eventId, event)=>{
  return{
      type : actionTypes.UPDATE_EVENT_SUCCESS,
      eventId : eventId,
      event : event
  }
}

export const getSessions = () => {
    return dispatch => {
        axios.get('http://localhost:3000/api/session')
            .then((response) => {
        let sessionList = [], i;
        let sessions = response.data;
       
        sessions.forEach(session => {
            sessionList.push({ label: session.sessionName, value: session._id })
         })

        dispatch(getSessionsSuccess(response.data, sessionList));
            })
            .catch((error) => {
                 //dispatch(getSessionsFail(error));
            })
    }
};

export const createSession = (session)=>{
     let sessionObj  = _.pick(session , ['sessionName','event' ,'speakers','volunteers' ,'room','description','sessionType',
                                          'sessionCapacity','startTime','endTime','isBreak', 'isRegistrationRequired']);
 
     return dispatch => {
        axios.post('http://localhost:3000/api/session',sessionObj)
            .then((response) => {
            dispatch(createSessionSuccess(response.data._id, response.data))
            })
            .catch((error) => {
             // dispatch(createSessionFail(error))
            })
    }
}

export const updateSession = (event)=>{
     let id = event.id;
     let eventObj  = _.pick(event , ['eventName' , 'venue' , 'description' , 'startDate' , 'endDate']);
    return dispatch => {
     axios.put(`http://localhost:3000/api/event/${id}`, eventObj)
            .then((response) => {
             dispatch(updateSessionSuccess(response.data._id, event))
            })
            .catch((error) => {
              dispatch(updateSessionFail(error))
            })
    }
}

export const deleteSession = (eventId)=>{
     let id = eventId;
    return dispatch => {
     axios.delete(`http://localhost:3000/api/event/${id}`)
            .then((response) => {
            dispatch(getSessions())
            // dispatch(deleteSessionSuccess(response.data._id))
            })
            .catch((error) => {
              dispatch(deleteSessionFail(error))
            })
    }
}
