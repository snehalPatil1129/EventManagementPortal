import { combineReducers } from 'redux';
import  eventReducer from './event';
import  roomReducer from './room';
import  registrationReducer from './registration';
const rootReducer = combineReducers({
  event : eventReducer,
  room : roomReducer,
  registration : registrationReducer,
});

export default rootReducer;


