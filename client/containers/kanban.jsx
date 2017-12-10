import React from 'react';
import axios from 'axios';
import ReduxThunk from 'redux-thunk'
import { Column } from '../components/column.jsx';
import { connect } from 'react-redux';
import { Waiting } from '../components/waiting.jsx';

class Kanban extends React.Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    // dispatches an action on mount
    this.props.getAllApplications();
  }

  render() {

    return(
      <div>
        <Column title="Applications" applications={this.props.applications}/>
      </div>
    );
  }
}


// should take user obj with id property
const getAllApplications = (user) => {
  return function action(dispatch) {
    dispatch({ type: 'IS_FETCHING' })

    const request = axios.get('/api/applications');

    return request.then(
      response => {
        dispatch(fetchApplicationsSuccess(response.data.apps))
        dispatch({ type: 'IS_FETCHING' })
      },
      err => console.log(err)
    );
  }
}



// dispatches an action
const fetchApplicationsSuccess = (response) => {
  console.log('fetch application success called', response)
  return {
    type: 'FETCH_SUCCESS',
    payload: response,
  }
}

const mapStateToProps = (state) => {
  console.log('state in map state: ', state)
  return {
    applications: state.applicationReducer.applications
  };
}

// how to map component did mount results to state
export default connect(mapStateToProps,
  { fetchApplicationsSuccess, getAllApplications })(Kanban);
