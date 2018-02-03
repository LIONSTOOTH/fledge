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
import * as action from '../actions';

// store all dates in old format
// convert to new at time of render


class ApplicationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      activeItem: 'Application Details',
      currentCompany: this.props.application.company,
      companyImg: this.props.application.companyImg,
      inputDate: this.props.application.date,
      momentDate: this.props.application.momentDate,
      inputPosition: this.props.application.position,
      selectedStatus: this.props.application.status,
      postUrl: this.props.application.postUrl,
      postDescription: this.props.application.postDescription,
      notes: this.props.application.notes,
      application: this.props.application,
    };
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.sendData = this.sendData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
    this.getID = this.getID.bind(this);
  }

  getID() {
    axios
      .post('/api/applications', { newApplication: {} })
      .then((res) => {
        this.setState({ application: { _id: res.data._id } });
      })
      .catch(err => console.log(err));
  }

  show() {
    this.setState({ open: true });
  }

  close() {
    this.setState(
      {
        open: false,
        activeItem: 'Application Details',
      },
      () => {
        if (this.props.newApp) {
          this.setState({
            currentCompany: '',
            companyImg: null,
            inputDate: null,
            inputPosition: '',
            selectedStatus: '',
            postUrl: '',
            postDescription: '',
            notes: '',
            application: { _id: undefined },
          });
        }
      }
    );
  }

  handleMouseDown(e, value) {
    // specifically for the company search bar
    if (e.target.innerText) {
      const obj = {};
      obj[value.id] = e.target.innerText;
      obj.companyImg =
        e.target.getAttribute('logo') ||
        e.target.parentNode.getAttribute('logo');
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

  handleDateChange(date) {
    // change moment date back to old format
    console.log('handleDateChange called with ', date)
    this.setState({ inputDate: date._i });
  }

  sendData() {
    this.props.application.company = this.state.currentCompany;
    this.props.application.date = this.state.inputDate;
    this.props.application.position = this.state.inputPosition;
    this.props.application.status = this.state.selectedStatus;
    this.props.application.companyImg = this.state.companyImg;
    this.props.application.postUrl = this.state.postUrl;
    this.props.application.postDescription = this.state.postDescription;
    this.props.application.notes = this.state.notes;
    this.props.application._id = this.state.application._id;
    // send as edited
    this.props.addOrUpdateApp({ edited: this.props.application });
    this.close();
  }

  render() {
    const { trigger, buttonLabel, className } = this.props;
    const {
      open,
      activeItem,
      currentCompany,
      companyImg,
      inputDate,
      momentDate,
      inputPosition,
      selectedStatus,
      postUrl,
      postDescription,
      notes,
      application,
    } = this.state;
    //console.log('inputDate in modal', inputDate)
    //console.log('momentDate in modal', momentDate)
    return (
      <div>
        <Button id={this.props.id} className={className} icon="expand" basic onClick={this.show}>
          {buttonLabel}
        </Button>

        <Modal open={open} onClose={this.close}>
          <Modal.Header>
            {companyImg ? (
              <Image
                floated="left"
                rounded={true}
                size="tiny"
                src={companyImg}
              />
            ) : (
              ''
            )}
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
                    getID={this.getID}
                    application={application}
                    view={activeItem}
                    company={currentCompany}
                    position={inputPosition}
                    status={selectedStatus}
                    postUrl={postUrl}
                    notes={notes}
                    postDescription={postDescription}
                    date={inputDate}
                    handleDateChange={this.handleDateChange}
                    handleMouseDown={this.handleMouseDown}
                    handleChange={this.handleChange}
                    handleStatusChange={this.handleStatusChange}
                  />
                </Grid.Column>
              </Grid>
            </Segment>
          </Modal.Content>
          <Modal.Actions>
            <Button id="modalSave" onClick={this.sendData} size="small" primary>
              Save Changes
              <Icon name="right chevron" />
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

const addOrUpdateApp = (valuesObject) => {
  return (dispatch) => {
    const request = axios.post('/api/applications', valuesObject);

    return request
      .then((response) => {
        dispatch(action.fetchApplicationsSuccess(response.data.applications));
      })
      .catch(err => console.log(err));
  };
};

const mapStateToProps = state => {
  return {
    applications: state.applicationReducer.applications
  };
};

export default connect(mapStateToProps, { addOrUpdateApp })(ApplicationModal);
