import { combineReducers } from 'redux';

// takes in current state and action
const applicationFetcher = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_APPLICATIONS':
      return action.applications;
    default:
      return state;
  }
};

const counterReducer = (state = { counter: 0 }, action) => {
  console.log('action is', action)
  switch (action.type) {
    case 'INCREMENT':
      return { counter: state.counter + 1 };
    default:
      return state;
  }
};

// main reducer to combine all other reducers

const rootReducer = combineReducers({
  applicationFetcher,
  counterReducer
});

export default rootReducer;

