import React, { Component } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import ApplicationModal from '../containers/applicationModal.jsx';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import { showModal } from '../actions/index.jsx';


const ItemTypes = {
  APPLICATION: 'application'
};

const applicationSource = {
  beginDrag(props) {
    return {
      applicationId: props._id,
      company: props.company,
      status: props.status,
    }
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    getItem: monitor.getItem(),
    getDropResult: monitor.getDropResult(),

  }
}


class ApplicationChip extends Component {
  constructor(props) {
    super(props)
    console.log('APPLICATION_CHIP PROPS:', props);

  }

  render() {
    const { connectDragSource, isDragging, getItem, getDropResult, ItemTypes } = this.props;
     console.log('APPLICATION_CHIP PROPS:', this.props)
    return connectDragSource(
      <div>
        <Card>
          <Card.Content>
            <Image floated='right' size='mini' src='' />
            <Card.Header>
              {this.props.application.company}
            </Card.Header>
            <Card.Meta>
              {this.props.application.position}
            </Card.Meta>
            {/*<Card.Description>
              Some words we might want to add... <strong>at some point</strong>
            </Card.Description>
            */}
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <ApplicationModal
                application={this.props.application}
              />
              <Button basic color='red'>Delete</Button>
            </div>
          </Card.Content>
        </Card>
      </div>
    );
  };
};

export default DragSource(ItemTypes.APPLICATION, applicationSource, collect)(ApplicationChip);