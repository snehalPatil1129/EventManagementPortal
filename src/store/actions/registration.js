import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

export const logError = (error) => {
    return {
        type: actionTypes.LOG_ERROR,
        error : error
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
    return dispatch => {
        axios.get('http://localhost:3000/api/attendee')
            .then((response) => {
                dispatch(storeAttendees(response.data));
            })
            .catch((error) => {
                console.log("errror",error);
            })
    }
};
export const getAttendeeData = (id) => {
    return dispatch => {
        axios.get(`http://localhost:3000/api/attendee/${id}`)
            .then((response) => {
                dispatch(storeAttendeeData(response.data));
                //console.log("Printed in getAttendeeData[action file]",response.data);
            })
            .catch((error) => {
                console.log("errror",error);
            })
    }
};

export const editAttendeeData = (id , attendee) => {
    return dispatch => {
        axios.put(`http://localhost:3000/api/attendee/${id}` , attendee)
            .then((response) => {
                console.log("Printed in editAttendeeData[action file]",response.data);
            })
            .catch((error) => {
                console.log("errror",error);
            })
    }
}

export const createAttendee = (attendee) => {
    return dispatch => {
        axios.post('http://localhost:3000/api/attendee', attendee )
            .then((response) => {
                console.log("Printed in attendee.js[action file]",response.data);
            })
            .catch((error) => {
                console.log("errror", error);
                dispatch(logError(error.message));
            })
    }
};

export const deleteAttendee = (id) => {
    return dispatch => {
        axios.delete(`http://localhost:3000/api/attendee/${id}`)
            .then((response) => {
                console.log("Printed in attendee.j delete[action file]",response.data);
                dispatch(getAttendees())
            })
            .catch((error) => {
                console.log("errror", error);
                dispatch(logError(error.message));
            })
    }
};


