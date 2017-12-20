import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import { Segment } from 'semantic-ui-react';
import ApplicationChip from '../components/applicationChip.jsx';
import ItemType from './ItemType.jsx';

const columnSPEC = {
  drop(component) {
    return { component };
  },

  hover(props, monitor, component) {
    // console.log('HOVER_PROPS, MONITOR, COMPONENT', props, monitor, component);
  },
};

function columnCOLLECT(connect, monitor, component) {
  return {
    hovered: monitor.isOver(),
    draggedApp: monitor.getItem(),
    didDrop: monitor.didDrop(),
    getDropResult: monitor.getDropResult(),
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
      getDropResult,
      connectDropTarget,
    } = this.props;
    return connectDropTarget(
      <div id={title} class="ui center aligned tertiary inverted segment">
          <h2>{title}</h2>
          <span>
            {applications.map(application => (
              <ApplicationChip
                key={application._id}
                id={application._id}
                application={application}
                status={application.status}
                draggedApp={draggedApp}
                getDropResult={getDropResult}
                didDrop={didDrop}
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
