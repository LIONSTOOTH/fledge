import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import ApplicationChip from '../components/applicationChip.jsx';
import ItemType from './ItemType.jsx';

const columnSPEC = {
  drop(props, monitor, component) {
    console.log('DROP PROPS:', props, monitor, component);
  },
  hover(props, monitor, component) {
    console.log(`HOVER_PROPS, MONITOR, COMPONENT`, props, monitor, component);
  },
};

function columnCOLLECT(connect, monitor, component) {
  return {
    hovered: monitor.isOver(),
    draggedApp: monitor.getItem(),
    didDrop: monitor.didDrop(),
    connectDropTarget: connect.dropTarget(),
  };
}

class Column extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      title,
      applications,
      application,
      hovered,
      draggedApp,
      didDrop,
      connectDropTarget,
    } = this.props;
    console.log(`COLUMN PROPS:`, this.props);
    return connectDropTarget(
      <div id={title}>
        <h2>{title}</h2>
        <span>
          {applications.map(application => (
            <ApplicationChip
              key={application._id}
              id={application._id}
              application={application}
              status={application.status}
            />
          ))}
        </span>
      </div>
    );
  }
}

export default DropTarget(ItemType.APPLICATION, columnSPEC, columnCOLLECT)(
  Column
);
