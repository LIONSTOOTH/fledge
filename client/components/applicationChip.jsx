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
            <Card.Header>{this.props.application.company}</Card.Header>
            <Card.Meta>{this.props.application.position}</Card.Meta>
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


// dispatches an action
const fetchApplicationsSuccess = response => {
  return {
    type: 'FETCH_SUCCESS',
    payload: response,
  };
};

const addOrUpdateApp = (valuesObject, func) => {
  axios.post('/api/applications', valuesObject)
    .then(response => func(response))
    .catch(err => console.log(err));
};

const applicationSPEC = {
  beginDrag(props) {
    console.log(`BEGIN DRAG PROPS`, props);
    return {
      applicationId: props.id,
    };
  },
  endDrag(props, monitor, component) {
    const edit = Object.assign(props.application, {
      status: props.getDropResult.component.title,
    });
    //props.getDropResult.component.applications.push(edit);

    addOrUpdateApp({ edited: edit }, props.dropItem);
  },
};

function applicationCOLLECT(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    getItem: monitor.getItem(),
  };
}

const mapStateToProps = state => {
  return {
    applications: state.applicationReducer.applications,
    isFetching: state.fetchFlagReducer.isFetching,
  };
};

const mapDispatchToProps = dispatch => {
  console.log('dispatch in map to props:',dispatch)
  return {
    dropItem: (response) => dispatch(fetchApplicationsSuccess(response.data.applications)),
  };
};

ApplicationChip = DragSource(
  ItemType.APPLICATION,
  applicationSPEC,
  applicationCOLLECT
)(ApplicationChip);

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationChip);
