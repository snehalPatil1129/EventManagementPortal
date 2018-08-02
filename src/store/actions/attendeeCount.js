import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

export const getAttendeeCountForEventSuceess = (AttendeeCount) => {
    return {
        type: actionTypes.GET_ATTENDEE_COUNTS_SUCCESS,
        AttendeeCount: AttendeeCount,
    };
};

export const getAttendeeCountForEvent = (eventId) => {
    return dispatch => {
        axios.get(`http://localhost:3000/api/attendeeCount/event/${eventId}`)
            .then((response) => {
                dispatch(getAttendeeCountForEventSuceess(response.data[0]));
            })
            .catch((error) => {
                //console.log(error);
            })
    }
};




