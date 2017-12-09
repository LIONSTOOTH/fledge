import React from 'react';
import { Button } from 'semantic-ui-react';
import { Column } from '../components/column.jsx';
import { getAllApplications } from '../actions/jobApplications.jsx';
import { connect } from 'react-redux';

class Kanban extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('component will mount')
    // dispatches an action on mount
    this.props.fetchApplicationsActionCreator()
  }

  render() {
    console.log('props in kanban render', this.props)
    return(
      <div style={{ border: 'solid 3px blue' }}>
      {/* columns will dispatch action to receive applications based on user and status prop*/}
      <Column title="Applications" applications={this.props.applications}/>
      </div>
    );
  }
}

// dispatches an action
const fetchApplicationsActionCreator = () => {
  console.log('getAllApplications called:', getAllApplications())
  return {
    type: 'FETCH_APPLICATIONS',
    payload: getAllApplications().applications,
  }
}

const mapStateToProps = (state) => {
  console.log('map state to props:',state)
  return {
    applications: state.applicationReducer.applications
  };
}

// how to map component did mount results to state
export default connect(mapStateToProps, { fetchApplicationsActionCreator })(Kanban);

// =======> action has payload but empty array getting passed as applications