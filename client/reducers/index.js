import { combineReducers } from 'redux';

// takes in current state and action
const applicationReducer = (state = { applications: [], isFetching: false }, action) => {
  console.log(action);
  switch (action.type) {
    case 'IS_FETCHING':
      return { isFetching: !state.isFetching };
    case 'FETCH_SUCCESS':
      return { applications: action.payload };
    default:
      return state;
  }
};

// main reducer to combine all other reducers
const rootReducer = combineReducers({
  applicationReducer,
});

export default rootReducer;

