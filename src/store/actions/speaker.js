import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

export const logRegistrationError = () => {
    return {
        type: actionTypes.LOG_REGISTRATION_ERROR,
        error : 'Oops...Something went wrong.Please try again...'
    };
};

export const storeSpeakers = (speakers) => {
    return {
        type: actionTypes.GET_SPEAKER_LIST,
        speakerList : speakers
    };
};

export const storeSpeakerData = (speakerData) => {
    return {
        type: actionTypes.GET_SPEAKER_DATA,
        speakerData : speakerData
    };
};

export const getSpeakers = () => {
    let speakers = []; 
    return dispatch => {
        axios.get('http://localhost:3000/api/speaker')
            .then((response) => {
                speakers = response.data;
                speakers.forEach((speaker) => {
                    speaker.event !== null ? speaker.eventName = speaker.event.eventName : null;
                });
                dispatch(storeSpeakers(speakers));
            })
            .catch((error) => {
                dispatch(logRegistrationError());
            })
    }
};

export const getSpeakersForEvent = (eventId) => {
    let speakers = []; 
    return dispatch => {
        axios.get(`http://localhost:3000/api/speaker/event/${eventId}`)
            .then((response) => {
                speakers = response.data;
                speakers.forEach((speaker) => {
                    speaker.event !== null ? speaker.eventName = speaker.event.eventName : null;
                });
                dispatch(storeSpeakers(speakers));
            })
            .catch((error) => {
                dispatch(logRegistrationError());
            })
    }
};

export const getSpeakerData = (id) => {
    return dispatch => {
        axios.get(`http://localhost:3000/api/speaker/${id}`)
            .then((response) => {
                dispatch(storeSpeakerData(response.data));
            })
            .catch((error) => {
                dispatch(logRegistrationError());
            })
    }
};

export const editSpeakerData = (id , speaker) => {
    return dispatch => {
        axios.put(`http://localhost:3000/api/speaker/${id}` , speaker)
            .then((response) => {
                dispatch(getSpeakers());
            })
            .catch((error) => {
                dispatch(logRegistrationError());
            })
    }
}

export const createSpeaker = (speaker) => {
    return dispatch => {
        axios.post('http://localhost:3000/api/speaker', speaker )
            .then((response) => {
                dispatch(getSpeakers());
            })
            .catch((error) => {
                dispatch(logRegistrationError());
            })
    }
};

export const deleteSpeaker = (id) => {
    return dispatch => {
        axios.delete(`http://localhost:3000/api/speaker/${id}`)
            .then((response) => {
                dispatch(getSpeakers())
            })
            .catch((error) => {
                dispatch(logRegistrationError());
            })
    }
};


