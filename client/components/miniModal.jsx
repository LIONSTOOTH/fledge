import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import thunk from 'redux-thunk';
import axios from 'axios';

class MiniModal extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      rejected: undefined,
    };
    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
    this.setAnswer = this.setAnswer.bind(this);
    this.deleteApp = this.deleteApp.bind(this);
  }

  setAnswer(reason) {
    this.setState({ rejected: reason });
    this.close();
  }

  show() {
    this.setState({ open: true });
  }

  close() {
    this.setState({ open: false });
  }

  deleteApp(appId, rejected) {
    this.setAnswer.bind(this)(rejected);
    this.props.removeApplication(appId, rejected, this.close);
  }

  render() {
    const { open } = this.state;
    return (
      <div>
        <Button
          basic color="red"
          onClick={this.show}
        >
          <i class="lightning icon" />
        </Button>
        <Modal
          size="small"
          open={open}
          onClose={this.close}
        >
          <Modal.Header>
            Remove this application
          </Modal.Header>
          <Modal.Content>
            <p>Is this an application withdrawal or rejection?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button
            negative
            onClick={this.deleteApp.bind(this, this.props.application._id, false)}
            >
              Withdrawal
            </Button>
            <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Rejection"
            onClick={this.deleteApp.bind(this, this.props.application._id, true)}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

const fetchApplicationsSuccess = response => {
  return {
    type: 'FETCH_SUCCESS',
    payload: response,
  };
};

const removeApplication = (appId, rejected, callback) => {
  let context = this;
  return (dispatch) => {
    const request = axios.post('/api/applications', { removeApplication: appId, rejected: rejected });
    return request
      .then(response => {
        dispatch(fetchApplicationsSuccess(response.data.applications));
      })
      .then(() => {
        callback();
      })
      .catch(err => console.log(err));
  };
};

const mapStateToProps = state => {
  return {
    applications: state.applicationReducer.applications,
  };
};

export default connect(mapStateToProps, { removeApplication })(MiniModal);
