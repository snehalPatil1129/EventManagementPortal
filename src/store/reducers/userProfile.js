import * as actionTypes from '../actions/actionTypes';

const initialState = {
    profiles: [],
    profileList : []
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_PROFILES_SUCCESS:
            return {
                ...state,
                profiles: action.profiles,
                profileList : action.profileList
            }
        default:
            return {
                ...state
            }
    }
}

export default profileReducer;