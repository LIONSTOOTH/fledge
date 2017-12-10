import React from 'react';
import axios from 'axios';
import { Column } from '../components/column.jsx';
import { connect } from 'react-redux';
import { Waiting } from '../components/waiting.jsx';

class Kanban extends React.Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    // dispatches an action on mount
    this.props.fetchingApplications();
    this.props.getAllApplications();
  }

  render() {

    return(
        <div>
        Column{/*<Column title="Applications" applications={this.props.applications}/>*/}
        </div>
    );
  }
}


// should take user obj with id property
const getAllApplications = (user) => {
  if (user) {
    axios.get(`/api/applications/user?id=${user.id}`)
      .then(response => {
        console.log('response from server:',response)
      })
  } else {
    // no users set up yet
     axios.get('/api/applications')
      .then(response => {
        console.log('response from server:',response)
        fetchApplicationsSuccess(response.data.apps);
        fetchingApplications()

      })
  }
};

// dispatches an action
const fetchApplicationsSuccess = (response) => {
  console.log('fetch application success called', response)
  return {
    type: 'FETCH_SUCCESS',
    payload: response,
  }
}


const fetchingApplications = () => {
  return {
    type: 'IS_FETCHING',
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
  { fetchApplicationsSuccess, fetchingApplications, getAllApplications })(Kanban);
