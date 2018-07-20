import * as actionTypes from '../actions/actionTypes';

const initialState = {
    profiles: []
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_PROFILES_SUCCESS:
            return {
                ...state,
                profiles: action.profiles
            }
        default:
            return {
                ...state
            }
    }
}

export default profileReducer;