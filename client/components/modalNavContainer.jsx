import React from 'react';
import ModalForm from '../containers/modalForm.jsx';
import Reminder from '../containers/modalReminder.jsx';
import OriginalPost from './originalPost.jsx';
import Contacts from './modalContacts.jsx';

const modalNavContainer = ({ view, date, company, position, status, application, handleMouseDown, handleChange, handleStatusChange }) => {
  if (view === 'Application Details') {
    return (<ModalForm
      date={date}
      company={company}
      position={position}
      status={status}
      handleMouseDown={handleMouseDown}
      handleChange={handleChange}
      handleStatusChange={handleStatusChange}
            />);
  } else if (view === 'Add A Reminder') {
    return (<Reminder
      application={application}
      company={company}

            />);
  } else if (view === 'Original Posting') {
    return (<OriginalPost />);
  } else if (view === 'Contacts') {
    return (<Contacts />);
  }
};

export default modalNavContainer;
