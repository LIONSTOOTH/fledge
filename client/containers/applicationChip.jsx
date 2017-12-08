import React from 'react';
import { connect } from 'react-redux';
// need to create dispatch action
// import { addApplication } from '../actions';

export const ApplicationChip = ({ application, dispatch }) => {

  return (
    <div>
      <h3>{application.position}</h3>
      <h3>{application.company}</h3>
    </div>
  );
};

