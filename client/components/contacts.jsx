import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Segment, Card, Image, Button, Icon } from 'semantic-ui-react';
import ApplicationModal from '../containers/applicationModal.jsx';

// sorts contacts by first name
const compare = (a, b) => {
  if (a.name < b.name) {
    return -1;
  } else if (a.name > b.name) {
    return 1;
  }
  return 0;
};

class Contacts extends React.Component {
  constructor() {
    super();
    this.state = {
      contacts: [],
      applicationsObj: {},
    };
    this.deleteContact = this.deleteContact.bind(this);
  }

  componentWillMount() {
    axios.get('/api/contacts').then((res) => {
      this.setState({ contacts: res.data.contacts });
    });
    // map applications prop to object indexable by app id
    const a = this.props.applications.reduce((obj, app) => {
      obj[app._id] = app;
      return obj;
    }, {});
    this.setState({ applicationsObj: a });
  }

  deleteContact(e) {
    axios.delete('/api/contacts', { params: { id: e.target.value || e.target.parentNode.value } })
      .then(res => this.setState({ contacts: res.data.contacts }))
      .catch(err => console.log(err));
  }

  render() {
    const { applicationsObj } = this.state;
    return (
      <div style={{ minHeight: 600 }}>
        <h1>Contacts</h1>
        <div>
          <Card.Group>
            {this.state.contacts.sort(compare).map(contact => (
              <Card raised centered stackable>
                <Card.Content style={{ lineHeight: 1.2 }}>
                  <Card.Header>{contact.name}
                    <Button.Group floated="right">
                      <Button
                        compact
                        inverted
                        icon="close"
                        color="red"
                        size="mini"
                        value={contact._id}
                        onClick={this.deleteContact}
                      />
                    </Button.Group>
                  </Card.Header>
                  <Card.Meta style={{ color: 'black' }}>{contact.position}
                    {contact.position && contact.company ? ', ' : ''}
                    {contact.company}
                  </Card.Meta>
                  <br />
                  {contact.email ? (<Icon size="small" name="mail outline" />)
                  : ''}{contact.email}
                  <div />
                  {contact.phone ? (<Icon size="small" name="text telephone" />)
                  : ''}{contact.phone}
                  <ApplicationModal
                    application={applicationsObj[contact.applicationId]}
                    key={contact.applicationId}
                    //buttonLabel="View linked application"
                  />
                </Card.Content>
              </Card>
            ))
          }
          </Card.Group>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    applications: state.applicationReducer.applications,
  };
};

export default connect(mapStateToProps)(Contacts);
