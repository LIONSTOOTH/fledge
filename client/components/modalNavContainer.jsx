import React from 'react';
import ModalForm from '../containers/modalForm.jsx';
import Reminder from '../containers/reminder.jsx';
import OriginalPost from './originalPost.jsx';
import Contacts from './modalContacts.jsx';

const modalNavContainer = ({ view, date, company, position, status, handleMouseDown, handleChange, editApplication }) => {
  if (view === 'Application Details') {
    return (<ModalForm
      date={date}
      company={company}
      position={position}
      status={status}
      handleMouseDown={handleMouseDown}
      handleChange={handleChange}
      editApplication={editApplication}
            />);
  } else if (view === 'Add A Reminder') {
    return (<Reminder />);
  } else if (view === 'Original Posting') {
    return (<OriginalPost />);
  } else if (view === 'Contacts') {
    return (<Contacts />);
  }
};

export default modalNavContainer;
