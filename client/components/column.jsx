import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import ApplicationChip from '../components/applicationChip.jsx';
import ItemType from './ItemType.jsx';

const columnTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    const clientOffset = monitor.getClientOffset();

    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // props.moveApp(dragIndex, hoverIndex);

    monitor.getItem().index = hoverIndex;
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
  };
}

class Column extends Component {
  constructor(props) {
    super(props);
    console.log('COLUMN PROPS!!', props);
  }

  render() {
    const {
      title,
      applications,
      connectDropTarget,
      isOver,
      isOverCurrent,
    } = this.props;
    console.log('ALL COLUMN PROPS', this.props);
    return connectDropTarget(
      <div>
        <h2>{title}</h2>
        <span>
          {applications.map(application => (
            <ApplicationChip
              key={application._id}
              id={application._id}
              application={application}
            />
          ))}
        </span>
      </div>
    );
  }
}

export default DropTarget(ItemType.APPLICATION, columnTarget, collect)(Column);
