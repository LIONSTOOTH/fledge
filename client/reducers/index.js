import { combineReducers } from 'redux';

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

// main reducer to combine all other reducers
const rootReducer = combineReducers({
  applicationReducer,
  fetchFlagReducer,
});

export default rootReducer;

