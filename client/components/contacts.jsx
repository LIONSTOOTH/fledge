import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Segment, Card, Image } from 'semantic-ui-react';
import ApplicationModal from '../containers/applicationModal.jsx';

class Contacts extends React.Component {
  constructor() {
    super();
    this.state = {
      contacts: [],
      applicationsObj: {},
    };
  }

  componentWillMount() {
    axios.get("/api/contacts").then((res) => {
      this.setState({ contacts: res.data.contacts });
    });
    // map applications prop to object indexable by app id
    const a = this.props.applications.reduce((obj, app) => {
      obj[app._id] = app;
      return obj;
    },{});
    this.setState({ applicationsObj: a });
  }

  render() {
    const { applicationsObj } = this.state;
    return (
      <div style={{ minHeight: 600 }}>
        <h1>Contact List</h1>
        <div>
          {this.state.contacts.map(contact => (
            <Segment basic>
              <Card>
                <Card.Content>
                  <Card.Header>{contact.company}</Card.Header>
                  <Card.Meta>{contact.position}</Card.Meta>
                  <br />
                  Name: {contact.name}
                  <br />
                  Email: {contact.email}
                  <br />
                  Phone: {contact.phone}
                  <br />
                  <br />
                  <ApplicationModal

                  application={applicationsObj[contact.applicationId]}
                  key={contact.applicationId}
                  label="See associated application"
                  trigger={
                    <button class="ui icon blue button" >
                      <i class="external" />
                      View Linked Application
                    </button>
                  }
                  />
                </Card.Content>
              </Card>
            </Segment>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    applications: state.applicationReducer.applications,
  };
};

export default connect(mapStateToProps)(Contacts);
