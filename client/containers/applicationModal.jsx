import React from 'react';
import {
  Button,
  Header,
  Grid,
  Menu,
  Segment,
  Modal,
  Icon,
  Image,
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
      companyImg: this.props.application.companyImg,
      inputDate: this.props.application.date,
      inputPosition: this.props.application.position,
      selectedStatus: this.props.application.status,
      postUrl: this.props.application.postUrl,
      postDescription: this.props.application.postDescription,
      notes: this.props.application.notes,
    };
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.sendData = this.sendData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  handleMouseDown(e, value) {
    // specifically for the company search bar

    if (e.target.innerText) {
      const obj = {};
      obj[value.id] = e.target.innerText;
      obj.companyImg =
        e.target.getAttribute('logo') || e.target.parentNode.getAttribute('logo') ;
      this.setState(obj);
    }

  }

  handleItemClick(e, { name }) {
    // to toggle component view for modal
    this.setState({ activeItem: name });
  }

  handleChange(e) {
    // passed to position, notes, reminder, url, job description fields
    const obj = {};
    obj[e.target.id] = e.target.value;
    this.setState(obj);
  }

  handleStatusChange(e, value) {
    // specifically for the application status dropdown
    const obj = {};
    obj[value.id] = value.value;
    this.setState(obj);
  }

  sendData() {
    // if application exists update vals
    if (this.props.application && this.props.application._id) {
      this.props.application.company = this.state.currentCompany;
      this.props.application.date = this.state.inputDate;
      this.props.application.position = this.state.inputPosition;
      this.props.application.status = this.state.selectedStatus;
      this.props.application.companyImg = this.state.companyImg;
      this.props.application.postUrl = this.state.postUrl;
      this.props.application.postDescription = this.state.postDescription;
      this.props.application.notes = this.state.notes;
      // send as edited
      this.props.addOrUpdateApp({ edited: this.props.application });
      // otherwise create new application object with vals
    } else {
      const newApp = {};
      newApp.company = this.state.currentCompany;
      newApp.date = this.state.inputDate;
      newApp.position = this.state.inputPosition;
      newApp.status = this.state.selectedStatus;
      newApp.companyImg = this.state.companyImg;
      newApp.postUrl = this.state.postUrl;
      newApp.postDescription = this.state.postDescription;
      newApp.notes = this.state.notes;
      // send as new
      this.props.addOrUpdateApp({ newApplication: newApp });
    }
    // should also close the modal at this point?
  }

  render() {
    const { application, trigger } = this.props;
    const {
      activeItem,
      currentCompany,
      companyImg,
      inputDate,
      inputPosition,
      selectedStatus,
      postUrl,
      postDescription,
      notes,
    } = this.state;
    return (
      <Modal
        trigger={
          trigger ? (
            trigger
          ) : (
            <Button basic color="blue">
              <i class="expand icon" />
            </Button>
          )
        }
      >
        <Modal.Header>
          <Image floated="left" rounded={true} size="tiny" src={companyImg} />
          <Header>{currentCompany}</Header>
          {inputPosition}
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
                  postUrl={postUrl}
                  notes={notes}
                  postDescription={postDescription}
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

const fetchApplicationsSuccess = (response) => {
  return {
    type: 'FETCH_SUCCESS',
    payload: response,
  };
};

const addOrUpdateApp = (valuesObject) => {
  return (dispatch) => {
    const request = axios.post('/api/applications', valuesObject);
    return request
      .then((response) => {
        dispatch(fetchApplicationsSuccess(response.data.applications));
      })
      .catch(err => console.log(err));
  };
};

const mapStateToProps = (state) => {
  return {
    applications: state.applicationReducer.applications,
  };
};

export default connect(mapStateToProps, { addOrUpdateApp })(ApplicationModal);
