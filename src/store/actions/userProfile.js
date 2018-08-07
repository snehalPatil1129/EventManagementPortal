import * as actionTypes from "./actionTypes";
import axios from "axios";
import AppConfig from "../../constants/AppConfig";

export const getProfilesSuccess = (profiles, profileList) => {
  return {
    type: actionTypes.GET_PROFILES_SUCCESS,
    profiles: profiles,
    profileList: profileList
  };
};

export const getProfiles = () => {
  let profileList = [];
  return dispatch => {
    axios
      .get(`${AppConfig.serverURL}/api/userProfile`)
      .then(response => {
        response.data.forEach(profile => {
          profileList.push({ label: profile.profileName, value: profile._id });
        });
        dispatch(getProfilesSuccess(response.data, profileList));
      })
      .catch(error => {
        // console.log(error)
      });
  };
};

export const createProfile = profile => {
  let profileObj = {
    profileName: profile.profileName,
    event: profile.eventValue
  };
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/userProfile`, profileObj)
      .then(response => {
        //dispatch(createProfileSuccess(response.data._id, eventObj))
      })
      .catch(error => {
        // dispatch(createProfileFail(error))
      });
  };
};

export const updateProfile = profile => {
  let id = profile.profileId;

  let profileObj = {
    profileName: profile.profileName,
    event: profile.eventValue
  };
  return dispatch => {
    axios
      .put(`${AppConfig.serverURL}/api/userProfile/${id}`, profileObj)
      .then(response => {})
      .catch(error => {
        //  dispatch(updateProfileFail(error))
      });
  };
};

export const deleteProfile = profileId => {
  let id = profileId;
  return dispatch => {
    axios
      .delete(`http://localhost:3000/api/userProfile/${id}`)
      .then(response => {
        dispatch(getProfiles());
        // dispatch(deleteProfileSuccess(response.data._id))
      })
      .catch(error => {
        //dispatch(deleteProfileFail(error))
      });
  };
};
