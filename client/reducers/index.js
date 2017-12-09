import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// takes in current state and action
const applicationReducer = (state = { applications: [] }, action) => {
  console.log('application reducer action',action);
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { applications: action.payload };
    default:
      return state;
  }
};

const fetchFlagReducer = (state = { isFetching: false }, action) => {
  console.log('fetch flag reducer action',action);
  switch (action.type) {
    case 'IS_FETCHING':
      return { isFetching: !state.isFetching };
    default:
      return state;
  }
};

const loginReducer = (state = { isLoggedIn : false }, action) => {
  switch (action.type) {
    case 'TOGGLE_LOGIN':
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

