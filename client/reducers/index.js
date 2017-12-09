import { combineReducers } from 'redux';

// takes in current state and action
const applicationReducer = (state = { applications: [] }, action) => {
  switch (action.type) {
    case 'FETCH_APPLICATIONS':
      return { applications: action.payload };
    default:
      return state;
  }
};

const counterReducer = (state = { counter: 0 }, action) => {
  console.log('action is', action)
  switch (action.type) {
    case 'INCREMENT':
      return { counter: state.counter + action.payload };
    default:
      return state;
  }
};

// main reducer to combine all other reducers

const rootReducer = combineReducers({
  applicationReducer,
  counterReducer
});

export default rootReducer;

