import React from 'react';
import { Card, Image, Segment } from 'semantic-ui-react';
import axios from 'axios';
import { connect } from 'react-redux';
import thunk from 'redux-thunk';
import { DragSource } from 'react-dnd';
import ApplicationModal from '../containers/applicationModal.jsx';
import ItemType from './ItemType.jsx';
import MiniModal from './miniModal.jsx';
import * as action from '../actions';

const style = {
  cursor: 'move',
};

class ApplicationChip extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      releaseConfetti,
      connectDragSource,
      getItem,
      getDropResult
    } = this.props;
    return connectDragSource(
      <div releaseConfetti={this.props.releaseConfetti}>
        <Segment style={style} application={this.props.application} basic>
          <Card centered>
            <Card.Content>
              <Image
                floated="right"
                size="mini"
                rounded={true}
                src={this.props.application.companyImg}
              />
              <Card.Header>{this.props.application.company}</Card.Header>
              <Card.Meta>{this.props.application.position}</Card.Meta>
            </Card.Content>
            <Card.Content extra>
              <div className="ui large buttons">
                <ApplicationModal className="ui chip button"
                  application={this.props.application} />
                <MiniModal application={this.props.application} />
              </div>
            </Card.Content>
          </Card>
        </Segment>
      </div>
    );
  }
}

const addOrUpdateApp = (valuesObject, func) => {
  axios
    .post('/api/applications', valuesObject)
    .then(response => func(response))
    .catch(err => console.log(err));
};

const applicationSPEC = {
  beginDrag(props) {
    return {
      applicationId: props.id,
    };
  },

  endDrag(props, monitor, component) {
    const edit = Object.assign(props.application, {
      status: props.getDropResult.component.title,
    });
    if (edit.status === 'Offer') {
      props.releaseConfetti();
    }
    addOrUpdateApp({ edited: edit }, props.dropItem);
  }
};

function applicationCOLLECT(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    getItem: monitor.getItem(),
  };
}

const mapStateToProps = (state) => {
  return {
    applications: state.applicationReducer.applications,
    isFetching: state.fetchFlagReducer.isFetching,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dropItem: response =>
      dispatch(action.fetchApplicationsSuccess(response.data.applications))
  };
};

ApplicationChip = DragSource(
  ItemType.APPLICATION,
  applicationSPEC,
  applicationCOLLECT
)(ApplicationChip);

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationChip);
