import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

export const storeEvents = (eventList, eventData) => {
    return {
        type: actionTypes.GET_EVENTS,
        eventList: eventList,
        eventData: eventData
    };
};

export const getEvents = () => {
    let eventList = []; let eventData = [];
    return dispatch => {
        axios.get('http://localhost:3000/api/event')
            .then((response) => {
                console.log(response.data);
                let event = response.data;
                event.forEach((eventObj)=>{
                    eventList.push({label : eventObj.eventName , value : eventObj._id});
                    eventData.push({eventObj});
                })
                dispatch(storeEvents(eventList, eventData));
            })
            .catch((error) => {
                console.log("errror");
            })
    }
};



