import { combineReducers } from 'redux';
import  eventReducer from './event';

const rootReducer = combineReducers({
  event : eventReducer
});

export default rootReducer;


