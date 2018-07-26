import { combineReducers } from 'redux';
import  eventReducer from './event';
import  sessionReducer from './session';
import  roomReducer from './room';
import  registrationReducer from './registration';
import  speakerReducer from './speaker';
import  authReducer from './auth';
import  formReducer from './questionForms';
import  profileReducer from './userProfile';
import  attendanceReducer from './attendance';
import  staticPageReducer from './staticPages';

const rootReducer = combineReducers({
  event : eventReducer,
  session : sessionReducer,
  room : roomReducer,
  registration : registrationReducer,
  speaker : speakerReducer,
  auth : authReducer,
  questionForm : formReducer,
  profile : profileReducer,
  attendance : attendanceReducer,
  staticPages : staticPageReducer
});

export default rootReducer;


