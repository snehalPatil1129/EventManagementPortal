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
export const logSponsorsError = () => {
    return {
        type: actionTypes.LOG_SPONSOR_ERROR,
        error : 'Oops...Something went wrong.Please try again...'
    };
}
export const getSponsors = () => {
    let sponsorData = [];  let sponsorList = [];
    return dispatch => {
        axios.get('http://localhost:3000/api/sponsor')
            .then((response) => {
                sponsorData = response.data;
                sponsorData.forEach((sponsor) =>{
                    sponsorList.push({label : sponsor.sponsorName , value : sponsor._id});
                    sponsor.eventName = sponsor.event.eventName;
                });
                dispatch(storeSponsors(sponsorData, sponsorList));
            })
            .catch((error) => {
                dispatch(logSponsorsError());
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
                dispatch(logSponsorsError());
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
                dispatch(logSponsorsError());
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
            dispatch(logSponsorsError());
        })
    }
}

 

