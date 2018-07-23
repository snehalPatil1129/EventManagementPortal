import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

export const logRegistrationError = () => {
    return {
        type: actionTypes.LOG_REGISTRATION_ERROR,
        error : 'Oops...Something went wrong.Please try again...'
    };
};

export const storeAttendees = (attendees) => {
    return {
        type: actionTypes.GET_ATTENDEE_LIST,
        attendeeList : attendees
    };
};

export const storeAttendeeData = (attendeeData) => {
    return {
        type: actionTypes.GET_ATTENDEE_DATA,
        attendeeData : attendeeData
    };
};

export const getAttendees = () => {
    let attendees = []; 
    return dispatch => {
        axios.get('http://localhost:3000/api/attendee')
            .then((response) => {
                attendees = response.data;
                attendees.forEach((attendee) => {
                    attendee.eventName = attendee.event.eventName;
                });
                dispatch(storeAttendees(attendees));
            })
            .catch((error) => {
                dispatch(logRegistrationError());
            })
    }
};

export const getAttendeesForEvent = (eventId) => {
    let attendees = []; 
    return dispatch => {
        axios.get(`http://localhost:3000/api/attendee/event/${eventId}`)
            .then((response) => {
                attendees = response.data;
                attendees.forEach((attendee) => {
                    attendee.eventName = attendee.event.eventName;
                });
                dispatch(storeAttendees(attendees));
            })
            .catch((error) => {
                dispatch(logRegistrationError());
            })
    }
};

export const getAttendeeData = (id) => {
    return dispatch => {
        axios.get(`http://localhost:3000/api/attendee/${id}`)
            .then((response) => {
                dispatch(storeAttendeeData(response.data));
            })
            .catch((error) => {
                dispatch(logRegistrationError());
            })
    }
};

export const editAttendeeData = (id , attendee) => {
    return dispatch => {
        axios.put(`http://localhost:3000/api/attendee/${id}` , attendee)
            .then((response) => {
                dispatch(getAttendees());
            })
            .catch((error) => {
                dispatch(logRegistrationError());
            })
    }
}

export const createAttendee = (attendee) => {
    return dispatch => {
        axios.post('http://localhost:3000/api/attendee', attendee )
            .then((response) => {
                dispatch(getAttendees());
            })
            .catch((error) => {
                dispatch(logRegistrationError());
            })
    }
};

export const deleteAttendee = (id) => {
    return dispatch => {
        axios.delete(`http://localhost:3000/api/attendee/${id}`)
            .then((response) => {
                dispatch(getAttendees())
            })
            .catch((error) => {
                dispatch(logRegistrationError());
            })
    }
};


