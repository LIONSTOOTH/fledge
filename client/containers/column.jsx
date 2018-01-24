import React from 'react';
import { DropTarget } from 'react-dnd';
import { ReactHeight } from 'react-height';
import PropTypes from 'prop-types';
import ApplicationChip from './applicationChip.jsx';
import ItemType from '../components/ItemType.jsx';

function getStyle(backgroundColor, colHeight) {
  return {
    minHeight: colHeight,
    backgroundColor,
    textAlign: 'center',
    paddingBottom: 12,

  };
}

const columnSPEC = {
  drop(component) {
    return { component };
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

class Column extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      releaseConfetti,
      title,
      applications,
      application,
      hovered,
      draggedApp,
      didDrop,
      getDropResult,
      connectDropTarget,
      open,
      colHeight,
      setColHeight,
    } = this.props;
    let backgroundColor = 'rgba(0, 0, 0, .5)';
    if (hovered) {
      backgroundColor = '#9abc67';
    }
    return connectDropTarget(
      <div>
        <ReactHeight onHeightReady={height => setColHeight(height)}>
          <div
            id={title}
            class="ui center aligned tertiary inverted columnColor"
            style={getStyle(backgroundColor, colHeight || 1200)}
          >
            <h4 className="columnTitle">{title}</h4>
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
                  releaseConfetti={releaseConfetti}
                />
              ))}
            </span>
          </div>
        </ReactHeight>
      </div>);
  }
}

export default DropTarget(ItemType.APPLICATION, columnSPEC, columnCOLLECT)(Column);

Column.propTypes = {
  onHeightReady: PropTypes.func.isRequired,
};
