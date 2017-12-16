import React from 'react';
import ModalForm from '../containers/modalForm.jsx';
import Reminder from '../containers/reminder.jsx';
import OriginalPost from './originalPost.jsx';
import Contacts from './modalContacts.jsx';

const modalNavContainer = ({ view, application }) => {
  if (view === 'Application Details') {
    return (<ModalForm application={application} onSubmit={values => console.log(this.props)}/>);
  } else if (view === 'Add A Reminder') {
    return (<Reminder application={application}/>);
  } else if (view === 'Original Posting') {
    return (<OriginalPost application={application}/>);
  } else if (view === 'Contacts') {
    return (<Contacts application={application}/>);
  }
};

export default modalNavContainer;
