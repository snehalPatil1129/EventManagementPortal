import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

export const logRegistrationError = (error) => {
    return {
        type: actionTypes.LOG_REGISTRATION_ERROR ,
        errorFlag : true,
        error: error !== undefined ?  error : 'Oops Something went wrong....'
    };
};

export const creatEditAttendeeFail = () => {
    return {
        type: actionTypes.CREATE_EDIT_ATTENDEE_FAIL 
    };
};

export const getAttendeeFail = () => {
    return {
        type: actionTypes.GET_ATTENDEE_LIST_FAIL 
    };
};

export const deleteAttendeeFail = () => {
    return {
        type: actionTypes.DELETE_ATTENDEE_FAIL 
    };
};

export const storeAttendees = (attendees) => {
    return {
        type: actionTypes.GET_ATTENDEE_LIST,
        attendeeList: attendees
    };
};

export const storeAttendeeData = (attendeeData) => {
    return {
        type: actionTypes.GET_ATTENDEE_DATA,
        attendeeData: attendeeData
    };
};

export const getAttendees = () => {
    let attendees = [];
    return dispatch => {
        axios.get('http://localhost:3000/api/attendee')
            .then((response) => {
                attendees = response.data;
                attendees.forEach((attendee) => {
                    attendee.event !== null ? attendee.eventName = attendee.event.eventName : null;
                });
                dispatch(storeAttendees(attendees));
            })
            .catch((error) => {
                //dispatch(logRegistrationError());
                dispatch(getAttendeeFail());
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
                    attendee.event !== null ? attendee.eventName = attendee.event.eventName : null;
                });
                dispatch(storeAttendees(attendees));
            })
            .catch((error) => {
                //dispatch(logRegistrationError());
                dispatch(getAttendeeFail());
            })
    }
};

export const getAttendeesForEventAndProfile = (eventId, profileName) => {
    let attendees = [];
    return dispatch => {
        axios.get(`http://localhost:3000/api/attendee/event/${eventId}`)
            .then((response) => {
                attendees = response.data;
                let attendeeList = [];
                attendees.forEach((attendee) => {
                    attendee.profiles.forEach(profile => {
                        if (profile == profileName) {
                          attendeeList.push(attendee)
                        }
                      })
                    attendee.event !== null ? attendee.eventName = attendee.event.eventName : null;
                });
                dispatch(storeAttendees(attendeeList));
            })
            .catch((error) => {
                //dispatch(logRegistrationError());
                dispatch(getAttendeeFail());
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

export const editAttendeeData = (id, attendee) => {
    return dispatch => {
        axios.put(`http://localhost:3000/api/attendee/${id}`, attendee)
            .then((response) => {
                dispatch(getAttendees());
            })
            .catch((error) => {
                dispatch(creatEditAttendeeFail());
            })
    }
}

export const createAttendee = (attendee, attendeeCount) => {
    let id = attendeeCount._id;
    let attendeeCountObj = {
        attendeeCount : attendeeCount.attendeeCount + 1,
        totalCount : attendeeCount.totalCount + 1,
        speakerCount : attendeeCount.speakerCount,
        event : attendeeCount.event
    }
    attendee['attendeeCount'] = attendeeCount.attendeeCount + 1;
    attendee['attendeeLabel'] = attendee.profiles[0].substring(0, 3).toUpperCase();
    return dispatch => {
        axios.post('http://localhost:3000/api/attendee', attendee)
            .then((response) => {
                axios.put(`http://localhost:3000/api/attendeeCount/${id}`, attendeeCountObj)
                    .then((response) => {
                        dispatch(getAttendees());
                    })
            })
            .catch((error) => {
                if(error.response.data === 'Invalid Email'){
                    dispatch(creatEditAttendeeFail());
                }else{
                    dispatch(creatEditAttendeeFail());              
                }
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
                dispatch(deleteAttendeeFail());
            })
    }
};


