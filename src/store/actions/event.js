import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

export const getEventsSuccess = (events) => {
    return {
        type: actionTypes.GET_EVENTS_SUCCESS,
        events:events
    };
};

export const getEventsFail = (error) => {
    return {
        type: actionTypes.GET_EVENTS_FAIL,
        error:error
    };
};

export const createEventSuccess = (eventId, event)=>{
  return{
      type : actionTypes.CREATE_EVENT_SUCCESS,
      eventId : eventId,
      event : event
  }
}

export const updateEventFail = (error)=>{
  return{
      type : actionTypes.CREATE_EVENT_FAIL,
      error : error
  }
}

export const updateEventSuccess = (eventId, event)=>{
  return{
      type : actionTypes.UPDATE_EVENT_SUCCESS,
      eventId : eventId,
      event : event
  }
}
export const deleteEventFail = (error)=>{
  return{
      type : actionTypes.DELETTE_EVENT_FAIL,
      error : error
  }
}

export const deleteEventSuccess = (eventId)=>{
  return{
      type : actionTypes.DELETE_EVENT_SUCCESS,
      eventId : eventId,
  }
}

export const createEventFail = (error)=>{
  return{
      type : actionTypes.UPDATE_EVENT_FAIL,
      error : error
  }
}

export const getEvents = () => {
    return dispatch => {
        axios.get('http://localhost:3000/api/event')
            .then((response) => {
                dispatch(getEventsSuccess(response.data));
            })
            .catch((error) => {
                 dispatch(getEventsFail(error));
            })
    }
};

export const createEvent = (event)=>{
     let eventObj  = _.pick(event , ['eventName' , 'venue' , 'description' , 'startDate' , 'endDate']);
    return dispatch => {
        axios.post('http://localhost:3000/api/event',eventObj)
            .then((response) => {
            dispatch(createEventSuccess(response.data._id, eventObj))
            })
            .catch((error) => {
              dispatch(createEventFail(error))
            })
    }
}

export const updateEvent = (event)=>{
     let id = event.id;
     let eventObj  = _.pick(event , ['eventName' , 'venue' , 'description' , 'startDate' , 'endDate']);
    return dispatch => {
     axios.put(`http://localhost:3000/api/event/${id}`, eventObj)
            .then((response) => {
             dispatch(updateEventSuccess(response.data._id, event))
            })
            .catch((error) => {
              dispatch(updateEventFail(error))
            })
    }
}

export const deleteEvent = (eventId)=>{
     let id = eventId;
    return dispatch => {
     axios.delete(`http://localhost:3000/api/event/${id}`)
            .then((response) => {
            dispatch(getEvents())
            // dispatch(deleteEventSuccess(response.data._id))
            })
            .catch((error) => {
              dispatch(deleteEventFail(error))
            })
    }
}
