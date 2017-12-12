import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const initialState = {
  applications: [],
  isFetching: false,
  isLoggedIn: false,
}

// takes in current state and action
const applicationReducer = (state = initialState, action) => {
  console.log('application reducer action',action);
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { applications: action.payload };
    default:
      return state;
  }
};

const fetchFlagReducer = (state = initialState, action) => {
  console.log('fetch flag reducer action',action);
  switch (action.type) {
    case 'IS_FETCHING':
      return { isFetching: !state.isFetching };
    default:
      return state;
  }
};

const loginReducer = (state = initialState, action) => {
  console.log('loginreducer ', action);
  switch (action.type) {
    case 'LOG_IN':
      return { isLoggedIn: action.payload };
    case 'LOG_OUT':
      return { isLoggedIn: action.payload };
    default:
      return state;
  }
};

// main reducer to combine all other reducers
const rootReducer = combineReducers({
  applicationReducer,
  fetchFlagReducer,
  form: formReducer,
  loginReducer,
});

export default rootReducer;

