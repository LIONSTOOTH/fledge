import React from 'react';
import {
  Button,
  Header,
  Grid,
  Menu,
  Segment,
  Modal,
  Icon,
} from 'semantic-ui-react';
import axios from 'axios';
import thunk from 'redux-thunk';
import { connect } from 'react-redux';
import ModalNavContainer from '../components/modalNavContainer.jsx';

class ApplicationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'Application Details',
      currentCompany: this.props.application.company,
      inputDate: this.props.application.date,
      inputPosition: this.props.application.position,
      selectedStatus: this.props.application.status,
      reminderText: '',

     };
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.sendData = this.sendData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  handleMouseDown(e, { value }) {
    //
    console.log('onmousedown:',e.target.innerText)
    console.log('onmousedown value:', value)
      if (e.target.innerText) {
      var obj = {};
      obj[value] = e.target.innerText;
      this.setState(obj, () => {
        console.log('selectedstatus:',this.state.selectedStatus)
        console.log('currentco:',this.state.currentCompany)
      });
    }
  }

  handleItemClick(e, { name }) {
    // to toggle component view for modal
    this.setState({ activeItem: name });
  }

  handleChange(e, { value }) {
    console.log('handlechange value:', value)
    console.log('handlechange e.target.value:', e.target.value)
    console.log('handlechange e.target.id:', e.target.id)
    // var obj = {};
    // obj[e.target.id] = e.target.value;
    // this.setState(obj);
  }

  handleStatusChange(e, value) {
    // specifically for the status dropdown
    var obj = {};
    obj[value.id] = value.value;
    this.setState(obj);
  }

  sendData() {
    console.log('sendData called: ')
    // if application exists update vals
    if (this.props.application && this.props.application._id) {
      this.props.application.company = this.state.currentCompany;
      this.props.application.date = this.state.inputDate;
      this.props.application.position = this.state.inputPosition;
      this.props.application.status = this.state.selectedStatus;
      // send as edited
      this.props.addOrUpdateApp({ edited: this.props.application });
    // otherwise create new application object with vals
    } else {
      const newApp = {};
      newApp.company = this.state.currentCompany;
      newApp.date = this.state.inputDate;
      newApp.position = this.state.inputPosition;
      newApp.status = this.state.selectedStatus;
      // send as new
      this.props.addOrUpdateApp({ newApplication: newApp });
    }
    // should also close the modal at this point
  }

  render() {
    const { application, trigger } = this.props;
    const { activeItem, currentCompany, inputDate, inputPosition, selectedStatus } = this.state;
    return (
      <Modal
        trigger={
          trigger ? (
            trigger
          ) : (
            <Button basic color="blue">
              Expand
            </Button>
          )
        }
      >
        <Modal.Header>
          <span><Header>{application.company}</Header>{application.companyPhotoUrl}</span>
          {application.position}
        </Modal.Header>

        <Modal.Content scrolling>
          <Segment>
            <Grid>
              <Grid.Column width={4}>
                <Menu fluid vertical tabular>
                  <Menu.Item
                    name="Application Details"
                    active={activeItem === 'Application Details'}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name="Original Posting"
                    active={activeItem === 'Original Posting'}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name="Add A Reminder"
                    active={activeItem === 'Add A Reminder'}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name="Contacts"
                    active={activeItem === 'Contacts'}
                    onClick={this.handleItemClick}
                  />
                </Menu>
              </Grid.Column>

              <Grid.Column stretched width={12}>
                <ModalNavContainer
                  application={application}
                  view={activeItem}
                  company={currentCompany}
                  position={inputPosition}
                  status={selectedStatus}
                  date={inputDate}
                  handleMouseDown={this.handleMouseDown}
                  handleChange={this.handleChange}
                  handleStatusChange={this.handleStatusChange}
                />
              </Grid.Column>
            </Grid>
          </Segment>
          <Button onClick={this.sendData} size="small" color="blue">
            Save Changes
            <Icon name="right chevron" />
          </Button>
        </Modal.Content>
      </Modal>
    );
  }
}

const fetchApplicationsSuccess = response => {
  return {
    type: 'FETCH_SUCCESS',
    payload: response,
  };
};

const addOrUpdateApp = valuesObject => {
  console.log('calues object:', valuesObject);
  return dispatch => {
    const request = axios.post('/api/applications', valuesObject);
    return request
      .then(response => {
        dispatch(fetchApplicationsSuccess(response.data.applications));
      })
      .catch(err => console.log(err));
  };
};

const mapStateToProps = state => {
  return {
    applications: state.applicationReducer.applications,
  };
};


export default connect(mapStateToProps, { addOrUpdateApp })(ApplicationModal);

