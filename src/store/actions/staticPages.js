import * as actionTypes from './actionTypes';
import axios from 'axios';

export const storeAboutUsInfo = (aboutUs) => {
    return {
        type: actionTypes.STORE_ABOUT_US,
        aboutUs: aboutUs
    }
}
export const storeAboutEternusInfo = (aboutEternus) => {
    return {
        type: actionTypes.STORE_ABOUT_ETERNUS,
        aboutEternus: aboutEternus
    }
}
export const storeHelpDeskInfo = (helpDesk) => {
    return {
        type: actionTypes.STORE_HELPDESK_DETAILS,
        helpDesk: helpDesk
    }
}
export const storeLocationInfo = (eventLocation) => {
    return {
        type: actionTypes.STORE_EVENT_LOCATION,
        eventLocation: eventLocation
    }
}
export const logStaticPageError = () => {
    return {
        type: actionTypes.LOG_STATIC_PAGE_ERROR,
        error: 'Oops...Something went wrong.Please try again...'
    }
}

///about Us 
export const getAboutUsInfo = () => {
    let aboutUs = {};
    return dispatch => {
        axios.get('http://localhost:3000/api/aboutUs')
            .then((response) => {
                if (response.data.length !== 0) {
                    aboutUs = response.data[0];
                }
                dispatch(storeAboutUsInfo(aboutUs));
            })
            .catch((error) => {
                dispatch(logStaticPageError());
            })
    }
}
export const createAboutUsInfo = (aboutUs) => {
    return dispatch => {
        axios.post('http://localhost:3000/api/aboutUs', aboutUs)
            .then((response) => {
                dispatch(storeAboutUsInfo(response.data));
            })
            .catch((error) => {
                dispatch(logStaticPageError());
            })
    }
}
export const editAboutUsInfo = (id , aboutUs) => {
    return dispatch => {
        axios.put(`http://localhost:3000/api/aboutUs/${id}`, aboutUs)
            .then((response) => {
                dispatch(storeAboutUsInfo(response.data));
            })
            .catch((error) => {
                dispatch(logStaticPageError());
            })
    }
}

///about Eternus
export const getAboutEternusInfo = () => {
    let aboutEternus = {};
    return dispatch => {
        axios.get('http://localhost:3000/api/aboutEternus')
            .then((response) => {
                if (response.data.length !== 0) {
                    aboutEternus = response.data[0];
                }
                dispatch(storeAboutEternusInfo(aboutEternus));
            })
            .catch((error) => {
                dispatch(logStaticPageError());
            })
    }
}
export const createAboutEternusInfo = (aboutEternus) => {
    return dispatch => {
        axios.post('http://localhost:3000/api/aboutEternus', aboutEternus)
            .then((response) => {
                dispatch(storeAboutEternusInfo(response.data));
            })
            .catch((error) => {
                dispatch(logStaticPageError());
            })
    }
}
export const editAboutEternusInfo = (id , aboutEternus) => {
    return dispatch => {
        axios.put(`http://localhost:3000/api/aboutEternus/${id}`, aboutEternus)
            .then((response) => {
                dispatch(storeAboutEternusInfo(response.data));
            })
            .catch((error) => {
                dispatch(logStaticPageError());
            })
    }
}

///HELP DESK
export const getHelpDeskInfo = () => {
    let helpDesk = {};
    return dispatch => {
        axios.get('http://localhost:3000/api/helpdesk')
            .then((response) => {
                if (response.data.length !== 0) {
                    helpDesk = response.data[0];
                }
                dispatch(storeHelpDeskInfo(helpDesk));
            })
            .catch((error) => {
                dispatch(logStaticPageError());
            })
    }
}
export const createHelpDeskInfo = (helpDesk) => {
    return dispatch => {
        axios.post('http://localhost:3000/api/helpdesk', helpDesk)
            .then((response) => {
                dispatch(storeHelpDeskInfo(response.data));
            })
            .catch((error) => {
                dispatch(logStaticPageError());
            })
    }
}
export const editHelpDeskInfo = (id, helpDesk) => {
    return dispatch => {
        axios.put(`http://localhost:3000/api/helpdesk/${id}`, helpDesk)
            .then((response) => {
                dispatch(storeHelpDeskInfo(response.data));
            })
            .catch((error) => {
                dispatch(logStaticPageError());
            })
    }
}
export const getHelpDeskForEvent = (id) => {
    let helpDesk = {};
    return dispatch => {
        axios.get(`http://localhost:3000/api/helpdesk/eventId/${id}`)
            .then((response) => {
                if (response.data.length !== 0) {
                    helpDesk = response.data[0];
                }
                dispatch(storeHelpDeskInfo(helpDesk));
            })
            .catch((error) => {
                dispatch(logStaticPageError());
            })
    }
}

///eventLocation
export const getLocationForEvent = (id) => {
    let eventLocation = {};
    return dispatch => {
        axios.get(`http://localhost:3000/api/location/eventId/${id}`)
            .then((response) => {
                if (response.data.length !== 0) {
                    eventLocation = response.data[0];
                }
                dispatch(storeLocationInfo(eventLocation));
            })
            .catch((error) => {
                dispatch(logStaticPageError());
                //console.log('error',error);
            })
    }
}
export const getEventLocation = () => {
    let eventLocation = {};
    return dispatch => {
        axios.get('http://localhost:3000/api/location')
            .then((response) => {
                if (response.data.length !== 0) {
                    eventLocation = response.data[0];
                }
                dispatch(storeLocationInfo(eventLocation));
            })
            .catch((error) => {
                dispatch(logStaticPageError());
            })
    }
}
export const createEventLocation = (eventLocation) => {
    return dispatch => {
        axios.post('http://localhost:3000/api/location', eventLocation)
            .then((response) => {
                dispatch(storeLocationInfo(response.data));
            })
            .catch((error) => {
                dispatch(logStaticPageError());
            })
    }
}
export const editEventLocation = (id, eventLocation) => {
    return dispatch => {
        axios.put(`http://localhost:3000/api/location/${id}`, eventLocation)
            .then((response) => {
                dispatch(storeLocationInfo(response.data));
            })
            .catch((error) => {
                dispatch(logStaticPageError());
            })
    }
}

