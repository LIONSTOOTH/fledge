
// takes in current state and action
const applicationFetcher = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_APPLICATIONS':
      return action.applications;
    default:
      return state;
  }
};

export default applicationFetcher;