import React from 'react';
import axios from 'axios';
import thunk from 'redux-thunk';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Grid } from 'semantic-ui-react';
import Column from './column.jsx';
import * as action from '../actions';

class Kanban extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colHeight: '',
    };
    this.setColHeight = this.setColHeight.bind(this);
  }

  componentWillMount() {
    // dispatches an action on mount
    this.props.getAllApplications();
  }

  setColHeight(num) {
    if (num > this.state.colHeight) {
      this.setState({ colHeight: num });
    }
  }

  render() {
    const { applications, releaseConfetti } = this.props;
    return (
      <div>
        <Grid columns={5}>
          <Grid.Row>
            <Grid.Column>
              <Column
                setColHeight={this.setColHeight}
                colHeight={this.state.colHeight}
                title="In Progress"
                applications={applications.filter(
                  application => application.status === 'In Progress'
                )}
                releaseConfetti={releaseConfetti}
              />
            </Grid.Column>
            <Grid.Column>
              <Column
                setColHeight={this.setColHeight}
                colHeight={this.state.colHeight}
                title="Submitted"
                applications={applications.filter(
                  application =>
                    application.status === 'Submitted' ||
                    application.status === 'Applied'
                )}
                releaseConfetti={releaseConfetti}
              />
            </Grid.Column>
            <Grid.Column>
              <Column
                setColHeight={this.setColHeight}
                colHeight={this.state.colHeight}
                title="Phone Screen"
                applications={applications.filter(
                  application => application.status === 'Phone Screen'
                )}
                releaseConfetti={releaseConfetti}
              />
            </Grid.Column>
            <Grid.Column>
              <Column
                setColHeight={this.setColHeight}
                colHeight={this.state.colHeight}
                title="Onsite Interview"
                applications={applications.filter(
                  application => application.status === 'Onsite Interview'
                )}
                releaseConfetti={releaseConfetti}
              />
            </Grid.Column>
            <Grid.Column>
              <Column
                setColHeight={this.setColHeight}
                colHeight={this.state.colHeight}
                title="Offer"
                applications={applications.filter(
                  application => application.status === 'Offer'
                )}
                releaseConfetti={releaseConfetti}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const getAllApplications = () => {
  return (dispatch) => {
    const request = axios.get('/api/applications');

    return request
      .then((response) => {
        dispatch(action.fetchApplicationsSuccess(response.data.applications));
      })
      .catch(err => console.log(err));
  };
};

const mapStateToProps = (state) => {
  return {
    applications: state.applicationReducer.applications,
  };
};

Kanban = DragDropContext(HTML5Backend)(Kanban);

export default connect(mapStateToProps, {
  getAllApplications,
})(Kanban);
