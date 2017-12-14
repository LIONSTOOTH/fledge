import React from 'react';
import axios from 'axios';
import thunk from 'redux-thunk';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Grid } from 'semantic-ui-react';
import Column from '../components/column.jsx';
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
    console.log('PROPS!!:', this.props)
    if (this.props.isFetching) {
      return (
        <div>
          <Waiting />
        </div>
      );
    } else {
      return (
        <div>
          <Grid columns={5} divided>
            <Grid.Row>
              <Grid.Column>
                <Column
                  title="In Progress"
                  applications={this.props.applications.filter(
                    application => application.status === 'In Progress'
                  )}s
                />
              </Grid.Column>
              <Grid.Column>
                <Column
                  title="Submitted"
                  applications={this.props.applications.filter(
                    application =>
                      application.status === 'Submitted' ||
                      application.status === 'Applied'
                  )}
                />
              </Grid.Column>
              <Grid.Column>
                <Column
                  title="Phone Screen"
                  applications={this.props.applications.filter(
                    application => application.status === 'Phone Screen'
                  )}
                />
              </Grid.Column>
              <Grid.Column>
                <Column
                  title="Onsite Interview"
                  applications={this.props.applications.filter(
                    application => application.status === 'Onsite Interview'
                  )}
                />
              </Grid.Column>
              <Grid.Column>
                <Column
                  title="Offer"
                  applications={this.props.applications.filter(
                    application => application.status === 'Offer'
                  )}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      );
    }
  }
}

// should take user obj with id property (googleId)
const getAllApplications = () => {
  return dispatch => {
    // dispatch a flag action to show waiting view
    dispatch({ type: 'IS_FETCHING', payload: true });

    const request = axios.get('/api/applications');

    return request
      .then(response => {
        console.log('response from server:', response);
        dispatch(fetchApplicationsSuccess(response.data.applications));
      })
      .then(dispatch({ type: 'IS_FETCHING', payload: false }))
      .catch(err => console.log(err));
  };
};

// dispatches an action
const fetchApplicationsSuccess = response => {
  return {
    type: 'FETCH_SUCCESS',
    payload: response,
  };
};

const mapStateToProps = state => {
  return {
    applications: state.applicationReducer.applications,
    isFetching: state.fetchFlagReducer.isFetching,
  };
};

Kanban = DragDropContext(HTML5Backend)(Kanban);

export default connect(mapStateToProps, {
  fetchApplicationsSuccess,
  getAllApplications,
})(Kanban);
