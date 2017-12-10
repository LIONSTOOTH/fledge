import React from 'react';
import axios from 'axios';
import thunk from 'redux-thunk'
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
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
          <Grid columns={5} divided>
            <Grid.Row>
              <Grid.Column>
                <Column title="In Progress"
                  applications={this.props.applications.filter((application) =>
                    application.status === 'In Progress')}/>
              </Grid.Column>
              <Grid.Column>
                <Column title="Submitted"
                  applications={this.props.applications.filter((application) =>
                    application.status === 'Submitted' || application.status === 'Applied')}/>
              </Grid.Column>
              <Grid.Column>
                <Column title="Phone Screen"
                  applications={this.props.applications.filter((application) =>
                    application.status === 'Phone Screen')}/>
              </Grid.Column>
              <Grid.Column>
              <Column title="Onsite Interview"
                applications={this.props.applications.filter((application) =>
                  application.status === 'Onsite Interview')}/>
              </Grid.Column>
              <Grid.Column>
                <Column title="Offer"
                  applications={this.props.applications.filter((application) =>
                    application.status === 'Offer')}/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      );
    }
  }
}

// should take user obj with id property
const getAllApplications = (user) => {
  return (dispatch) => {
    // dispatch a flag action to show waiting view
    dispatch({ type: 'IS_FETCHING' })

    const request = axios.get('/api/applications');

    return request.then(
      response => dispatch(fetchApplicationsSuccess(response.data.apps)))
      .then(dispatch({ type: 'IS_FETCHING'}))
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
  return {
    applications: state.applicationReducer.applications,
    isFetching: state.fetchFlagReducer.isFetching,
  };
}

export default connect(mapStateToProps,
  { fetchApplicationsSuccess, getAllApplications })(Kanban);
