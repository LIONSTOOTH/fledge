import React from 'react';
import { Column } from '../components/column.jsx';
import { getAllApplications } from '../actions/jobApplications.jsx';
import { connect } from 'react-redux';

class Kanban extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // dispatches an action on mount
    this.props.fetchApplicationsActionCreator()
  }

  render() {
    return(
      <div style={{ border: 'solid 3px blue' }}>
        <Column title="Applications" applications={this.props.applications}/>
      </div>
    );
  }
}

// dispatches an action
const fetchApplicationsActionCreator = () => {
  return {
    type: 'FETCH_APPLICATIONS',
    payload: getAllApplications().applications,
  }
}

const mapStateToProps = (state) => {
  return {
    applications: state.applicationReducer.applications
  };
}

// how to map component did mount results to state
export default connect(mapStateToProps, { fetchApplicationsActionCreator })(Kanban);
