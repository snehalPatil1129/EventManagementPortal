import * as actionTypes from '../actions/actionTypes';

const initialState = {
    error: '',
    speakerList: [],
    speakerData : {}
}
const speakerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_SPEAKER_LIST:
            return {
                ...state,
                speakerList: action.speakerList,
                error: '',
            };
        case actionTypes.GET_SPEAKER_DATA:
            return {
                ...state,
                speakerData: action.speakerData,
                error: '',
            };
        case actionTypes.LOG_REGISTRATION_ERROR:
            return {
                ...state,
                error: action.error,
            };
        default:
            return state;
    }
}
export default speakerReducer;