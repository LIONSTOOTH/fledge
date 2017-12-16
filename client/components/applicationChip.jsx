import React, { Component } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import ApplicationModal from '../containers/applicationModal.jsx';
import { showModal } from '../actions/index.jsx';
import ItemType from './ItemType.jsx';

const style = {
  cursor: 'move',
};

function getStyles(isDragging) {
  return {
    display: isDragging ? 0.5 : 1,
  };
}

const applicationSource = {
  beginDrag(props, monitor, component) {
    // dispatch to redux store that drag is started

    const applicationId = props._id;
    const company = props.company;
    const status = props.status;
    const { clientWidth, clientHeight } = findDOMNode(component);

    return { applicationId, company, status, clientWidth, clientHeight };
  },

  endDrag(props, monitor) {
    let document = typeof document === 'undefined' ? '' : document;
    document.getElementById(monitor.getItem().id).style.display = 'block';
  },

  isDragging(props, monitor) {
    const isDragging = props.item && props.item.id === monitor.getItem().id;
    return isDragging;
  },
};

// const OPTIONS = {
//   arePropsEqual: function arePropsEqual(props, otherProps) {
//     let isEqual = true;
//     if (
//       props.item.id === otherProps.item.id &&
//       props.x === otherProps.x &&
//       props.y === otherProps.y
//     ) {
//       isEqual = true;
//     } else {
//       isEqual = false;
//     }
//     return isEqual;
//   },
// };

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    getItem: monitor.getItem(),
    connectDragPreview: connect.dragPreview(),
  };
}

class ApplicationChip extends Component {
  constructor(props) {
    super(props);
    console.log('APPLICATION_CHIP PROPS:', props);
  }

  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true,
    });
  }

  render() {
    const {
      connectDragSource,
      isDragging,
      getItem,
      getDropResult,
    } = this.props;
    console.log('APPLICATION_CHIP PROPS:', this.props);
    return connectDragSource(
      <div style={style}>
        <Card style={getStyles(this.props.isDraging)} item={this.props.application}>
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
  applicationSource,
  collect,
  // OPTIONS,
)(ApplicationChip);
