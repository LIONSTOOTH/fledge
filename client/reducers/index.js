import { combineReducers } from 'redux';
import { LOG_IN, FETCH_SUCCESS, LOG_OUT } from '../constants/actionTypes';

const initialState = {
  applications: [],
  isLoggedIn: false,
};

// takes in current state and action
const applicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return { applications: action.payload };
    default:
      return state;
  }
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return { isLoggedIn: action.payload };
    case LOG_OUT:
      return { isLoggedIn: action.payload };
    default:
      return state;
  }
};

// main reducer to combine all other reducers
const rootReducer = combineReducers({
  applicationReducer,
  loginReducer,
});

export default rootReducer;

