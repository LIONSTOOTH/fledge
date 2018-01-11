import React from 'react';
import ModalForm from '../containers/modalForm.jsx';
import Reminder from '../containers/modalReminder.jsx';
import OriginalPost from './originalPost.jsx';
import Contacts from './modalContacts.jsx';

const modalNavContainer = ({ view, date, company, position, status, getID, notes, application, postUrl, postDescription, handleMouseDown, handleChange, handleStatusChange }) => {
  if (view === 'Application Details') {
    return (
      <ModalForm
        date={date}
        getID={getID}
        application={application}
        company={company}
        position={position}
        status={status}
        notes={notes}
        handleMouseDown={handleMouseDown}
        handleChange={handleChange}
        handleStatusChange={handleStatusChange}
      />
    );
  } else if (view === 'Add A Reminder') {
    return <Reminder application={application} company={company} />;
  } else if (view === 'Original Posting') {
    return (<OriginalPost
      handleChange={handleChange}
      postUrl={postUrl}
      postDescription={postDescription} />);
  } else if (view === 'Contacts') {
    return <Contacts application={application} />;
  }
};

export default modalNavContainer;
