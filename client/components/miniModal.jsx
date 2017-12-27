import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import thunk from 'redux-thunk';
import axios from 'axios';

class MiniModal extends Component {
  state = { open: false, reasonForDelete: 0 }

  show = () => this.setState({ open: true })
  close = () => this.setState({ open: false })
  setAnswer = (reason) => this.setState({reasonForDelete: reason}, () => {
    console.log(this.state);
    this.close()
    }
  )

  deleteApp = (appId) => {
    console.log('hello???')
    this.props.removeApplication(appId, this.close);

  }

  render() {
    const { open } = this.state

    return (
      <div>
        <Button basic color="red" onClick={this.show}>
                  <i class="lightning icon" />
                </Button>



        <Modal size={'small'} open={open} onClose={this.close}>
          <Modal.Header>
            Remove this application
          </Modal.Header>
          <Modal.Content>
            <p>Is this an application withdrawal or rejection?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.deleteApp.bind(this, this.props.application._id)}>
              Withdrawal
            </Button>
            <Button positive icon='checkmark' labelPosition='right' content='Rejection' onClick={this.deleteApp.bind(this, this.props.application._id)} />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

const fetchApplicationsSuccess = (response) => {
  return {
    type: 'FETCH_SUCCESS',
    payload: response,
  };
};

const removeApplication = (appId, callback) => {
  console.log('in removeApplication')
  return (dispatch) => {
    const request = axios.post('/api/applications', {removeApplication: appId});
    return request
      .then((response) => {
        dispatch(fetchApplicationsSuccess(response.data.applications));
      })
      .then(() => {
        callback();
      })
      .catch(err => console.log(err));
  };
};

const mapStateToProps = (state) => {
  return {
    applications: state.applicationReducer.applications,
  };
};

export default connect(mapStateToProps, { removeApplication })(MiniModal);
