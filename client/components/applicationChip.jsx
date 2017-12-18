import React, { Component } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import axios from 'axios';
import { connect } from 'react-redux';
import thunk from 'redux-thunk';
import { DragSource } from 'react-dnd';
import ApplicationModal from '../containers/applicationModal.jsx';
import { showModal } from '../actions/index.jsx';
import ItemType from './ItemType.jsx';


const style = {
  cursor: 'move',
};

const applicationSPEC = {
  beginDrag(props) {
    console.log(`BEGIN DRAG PROPS`, props);
    return {
      applicationId: props.id,
    };
  },
  endDrag(props, monitor, component) {
    console.log(`END DRAG PROPS.APP`, props.application);
    console.log(`DROP RESULT!!!!:`, props.getDropResult);
    console.log('ID OF DROPPED APP!!!!:', props.id);
    const edit = Object.assign(props.application, { status: props.getDropResult.component.title });
    console.log('EDIT OBJECT!!!:', edit);

    addOrUpdateApp({ edited: edit });
    // return {
    //   didDrop: monitor.didDrop(),
    //   whatDropped: monitor.getDropResult(),
    //   //if a chip drops i want to fire off a function
    // };
  },
};

function applicationCOLLECT(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    getItem: monitor.getItem(),
  };
}

class ApplicationChip extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { connectDragSource, getItem, getDropResult } = this.props;
    return connectDragSource(
      <div style={style} application={this.props.application}>
        <Card>
          <Card.Content>
            {/* <Image floated="right" size="mini" src="" /> */}
            <Card.Header>{this.props.application.company}</Card.Header>
            <Card.Meta>{this.props.application.position}</Card.Meta>
            {/* <Card.Description>
              Some words we might want to add... <strong>at some point</strong>
            </Card.Description>
            */}
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <ApplicationModal application={this.props.application} />
              <Button basic color="red">
                Delete
              </Button>
            </div>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

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
  console.log('FETCH_APPLICATION SUCCESS', response);
  return {
    type: 'FETCH_SUCCESS',
    payload: response,
  };
};

const addOrUpdateApp = valuesObject => {
  console.log('GETTING CALLED!');
  console.log('VALUES OBJ', valuesObject);
  return dispatch => {
    console.log(`DISPATCHING FROM ADDORUPDATE`);
    const request = axios.post('/api/applications', valuesObject);

    return request
      .then(response => {
        dispatch(fetchApplicationsSuccess(response.data.applications));
      })
      .catch(err => console.log(err));
  };
};

const mapStateToProps = state => {
  return {
    applications: state.applicationReducer.applications,
    isFetching: state.fetchFlagReducer.isFetching,
  };
};

ApplicationChip = DragSource(
  ItemType.APPLICATION,
  applicationSPEC,
  applicationCOLLECT
)(ApplicationChip);

export default connect(mapStateToProps, {
  fetchApplicationsSuccess,
  getAllApplications,
})(ApplicationChip);
