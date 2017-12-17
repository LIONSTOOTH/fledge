import React, { Component } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
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
    console.log(`END DRAG PROPS, MONITOR`, props, monitor);
    return {
      didDrop: monitor.didDrop(),
      whatDropped: monitor.getDropResult(),
      //if a chip drops i want to fire off a function
    };
  },
};

function applicationCOLLECT(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    getItem: monitor.getItem(),
    getDropResult: monitor.getDropResult(),
  };
}

class ApplicationChip extends Component {
  constructor(props) {
    super(props);
    console.log('APPLICATION CHIP PROPS', props);
  }

  render() {
    const {
      connectDragSource,
      getItem,
      getDropResult,
    } = this.props;
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

export default DragSource(
  ItemType.APPLICATION,
  applicationSPEC,
  applicationCOLLECT
)(ApplicationChip);
