import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

export const storeSponsors = (sponsorData, sponsorList) => {
    return {
        type: actionTypes.GET_SPONSORS,
        sponsors : sponsorData ,
        sponsorList : sponsorList
    };
};
export const storeCurrentSponsor = (currentSponsor) => {
    return {
        type: actionTypes.STORE_CURRENT_SPONSOR,
        currentSponsor : currentSponsor
    };
} 
export const getSponsorsError = () => {
    return {
        type: actionTypes.GET_SPONSOR_ERROR
    };
}
export const creatEditSponsorsError = () => {
    return {
        type: actionTypes.CREATE_EDIT_SPONSOR_ERROR
    };
}

export const deleteSponsorsError = () => {
    return {
        type: actionTypes.DELETE_SPONSOR_ERROR
    };
}
export const getSponsors = () => {
    let sponsorData = [];  let sponsorList = [];
    return dispatch => {
        axios.get('http://localhost:3000/api/sponsor')
            .then((response) => {
                sponsorData = response.data;
                sponsorData.forEach((sponsor) =>{
                    sponsorList.push({label : sponsor.name , value : sponsor._id});
                    sponsor.event !== null ?  sponsor.eventName = sponsor.event.eventName : null;
                });
                dispatch(storeSponsors(sponsorData, sponsorList));
            })
            .catch((error) => {
                dispatch(getSponsorsError());
            })
    }
};
export const createSponsor = (sponsor) => {
    let sponsorData = []; 
    return dispatch => {
        axios.post('http://localhost:3000/api/sponsor', sponsor )
            .then((response) => {
                dispatch(getSponsors());
            })
            .catch((error) => {
                dispatch(creatEditSponsorsError());
            })
    }
};

export const editSponsor = (id ,sponsor) => {
    return dispatch => {
        axios.put(`http://localhost:3000/api/sponsor/${id}`, sponsor )
            .then((response) => {
                dispatch(getSponsors());
            })
            .catch((error) => {
                dispatch(creatEditSponsorsError());
            })
    }
};

export const deleteSponsor = (id) => {
    return dispatch => {
        axios.delete(`http://localhost:3000/api/sponsor/${id}`)
        .then((response) => {
            dispatch(getSponsors());
        })
        .catch((error) => {
            dispatch(deleteSponsorsError());
        })
    }
}


export const getSponsorsForEvent = (eventId) => {
    let sponsorData = [];  let sponsorList = [];
    return dispatch => {
        axios.get(`http://localhost:3000/api/sponsor/event/${eventId}`)
        .then((response) => {
            sponsorData = response.data;
            sponsorData.forEach((sponsor) =>{
                sponsorList.push({label : sponsor.name , value : sponsor._id});
                sponsor.event !== null ?  sponsor.eventName = sponsor.event.eventName : null;
            });
            dispatch(storeSponsors(sponsorData, sponsorList));
        })
        .catch((error) => {
            dispatch(logSponsorsError());
        })
    }
}
 

