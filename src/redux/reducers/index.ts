import {combineReducers} from 'redux';
import commonReducer from './commonReducer';
import themeReducer from './themeReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  commonReducer,
  themeReducer,
  authReducer,
});

export default rootReducer;
