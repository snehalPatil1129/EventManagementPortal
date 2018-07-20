import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getProfilesSuccess = (profiles) => {
    return {
        type: actionTypes.GET_PROFILES_SUCCESS,
        profiles: profiles
    }
}

export const getProfiles = () => {
    return dispatch => {
        axios.get('http://localhost:3000/api/userProfile')
            .then((response) => {
                dispatch(getProfilesSuccess(response.data))
            })
            .catch((error) => {
                // console.log(error)
            })
    }
}

export const createProfile = (profile) => {
    let profileObj = {
        profileName: profile.profileName,
        eventId: profile.eventValue
    }
    return dispatch => {
        axios.post('http://localhost:3000/api/userProfile', profileObj)
            .then((response) => {
                //dispatch(createProfileSuccess(response.data._id, eventObj))
            })
            .catch((error) => {
                // dispatch(createProfileFail(error))
            })
    }
}

export const updateProfile = (profile) => {
    let id = profile.profileId;

    let profileObj = {
        profileName: profile.profileName,
        eventId: profile.eventValue
    }
    return dispatch => {
        axios.put(`http://localhost:3000/api/userProfile/${id}`, profileObj)
            .then((response) => {
            })
            .catch((error) => {
                //  dispatch(updateProfileFail(error))
            })
    }
}

export const deleteProfile = (profileId) => {
    let id = profileId;
    return dispatch => {
        axios.delete(`http://localhost:3000/api/userProfile/${id}`)
            .then((response) => {
                dispatch(getProfiles())
                // dispatch(deleteProfileSuccess(response.data._id))
            })
            .catch((error) => {
                //dispatch(deleteProfileFail(error))
            })
    }
}