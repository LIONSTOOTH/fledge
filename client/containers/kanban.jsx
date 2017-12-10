import React from 'react';
import axios from 'axios';
import thunk from 'redux-thunk'
import { connect } from 'react-redux';
import { Column } from '../components/column.jsx';
import Waiting from '../components/waiting.jsx';

class Kanban extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // dispatches an action on mount
    this.props.getAllApplications();
  }

  render() {
    if (this.props.isFetching) {
      return(
        <div>
          <Waiting/>
        </div>
      );
    } else {
      return(
        <div>
          <Column title="Applications" applications={this.props.applications}/>
        </div>
      );
    }
  }
}


// should take user obj with id property
const getAllApplications = (user) => {
  return (dispatch) => {
    // dispatch a flag action to show waiting view
    dispatch({ type: 'IS_FETCHING', payload: true })

    const request = axios.get('/api/applications');

    return request.then(
      response => dispatch(fetchApplicationsSuccess(response.data.apps)))
      .then(dispatch({ type: 'IS_FETCHING', payload: false }))
      .catch(err => console.log(err));
  }
}

// dispatches an action
const fetchApplicationsSuccess = (response) => {
  return {
    type: 'FETCH_SUCCESS',
    payload: response,
  }
}

const mapStateToProps = (state) => {
  console.log('state in map state: ', state)
  return {
    applications: state.applicationReducer.applications,
    isFetching: state.fetchFlagReducer.isFetching,
  };
}

export default connect(mapStateToProps,
  { fetchApplicationsSuccess, getAllApplications })(Kanban);
