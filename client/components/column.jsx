import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import ApplicationChip from '../components/applicationChip.jsx';
import ItemType from './ItemType.jsx';
// import { CARD_HEIGHT, CARD_MARGIN, OFFSET_HEIGHT } from '../../../constants.js';

// function getPlaceholderIndex(y, scrollY) {
//   // shift placeholder if y position more than card height / 2
//   const yPos = y - OFFSET_HEIGHT + scrollY;
//   let placeholderIndex;
//   if (yPos < CARD_HEIGHT / 2) {
//     placeholderIndex = -1; // place at the start
//   } else {
//     placeholderIndex = Math.floor((yPos - CARD_HEIGHT / 2) / (CARD_HEIGHT + CARD_MARGIN));
//   }
//   return placeholderIndex;
// }

const columnTarget = {
  drop(props, monitor, component) {
    let document = typeof document === 'undefined' ? '' : document;
    document.getElementById(monitor.getItem().id).style.display = 'block';
    const placeholderIndex = monitor.getClientOffset().y;
    const lastX = monitor.getItem().x;
    const lastY = monitor.getItem().y;
    const nextX = props.x;
    let nextY = placeholderIndex;

    if (lastY > nextY) {
      // move top
      nextY += 1;
    } else if (lastX !== nextX) {
      // insert into another list
      nextY += 1;
    }

    if (lastX === nextX && lastY === nextY) {
      // if position equal
      return;
    }

    props.moveCard(lastX, lastY, nextX, nextY);
  },
  // hover(props, monitor, component) {
  //   // defines where placeholder is rendered
  //   const placeholderIndex = monitor.getClientOffset().y;

  //   // horizontal scroll
  //   if (!props.isScrolling) {
  //     if (window.innerWidth - monitor.getClientOffset().x < 200) {
  //       props.startScrolling('toRight');
  //     } else if (monitor.getClientOffset().x < 200) {
  //       props.startScrolling('toLeft');
  //     }
  //   } else {
  //     if (window.innerWidth - monitor.getClientOffset().x > 200 &&
  //         monitor.getClientOffset().x > 200
  //     ) {
  //       props.stopScrolling();
  //     }
  //   }

  // IMPORTANT!
  // HACK! Since there is an open bug in react-dnd, making it impossible
  // to get the current client offset through the collect function as the
  // user moves the mouse, we do this awful hack and set the state (!!)
  // on the component from here outside the component.
  // https://github.com/gaearon/react-dnd/issues/179
  // component.setState({ placeholderIndex });

  // when drag begins, we hide the card and only display cardDragPreview
  //   const item = monitor.getItem();
  //   let document = typeof document === 'undefined' ? '' : document;
  //   document.getElementById(item.id).style.display = 'none';
  // },
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
