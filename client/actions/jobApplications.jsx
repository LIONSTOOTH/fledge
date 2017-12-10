import React from 'react';
import axios from 'axios';

// should take user obj with id property
export const getAllApplications = (user, callback) => {

  if (user) {
    axios.get(`/api/applications/user?id=${user.id}`)
      .then(response => {
        console.log('response from server:',response)
      })
  } else {
    // no users set up yet
     axios.get('/api/applications')
      .then(response => {
        console.log('response from server:',response)
      })
  }

/*
  return
  {
    applications: [
      {
        "id": 1,
        "dateApplied": "Fri Dec 08 2017 02:20:35 GMT-0500 (EST)",
        "position": "Software Engineer",
        "company": "Facebook",
        "contact": {
          "name": "Bob Smith",
          "position": "Engineer",
          "email": "bs@facebook.com",
          "phone": "917-123-4567"
        },
        "checklist": {
          "researched": "true",
          "reachedOut": "true",
          "sentNote": "true",
          "networked": "true"
        },
        "lastContactDate": "Fri Dec 08 2017 02:20:35 GMT-0500 (EST)",
        "status": "Applied"
      },
      {
        "id": 2,
        "dateApplied": "Fri Dec 08 2017 02:20:35 GMT-0500 (EST)",
        "position": "Software Engineer",
        "company": "Google",
        "contact": {
          "name": "Bob Smith",
          "position": "Engineer",
          "email": "bs@google.com",
          "phone": "917-123-4567"
        },
        "checklist": {
          "researched": "true",
          "reachedOut": "true",
          "sentNote": "true",
          "networked": "true"
        },
        "lastContactDate": "Fri Dec 08 2017 02:20:35 GMT-0500 (EST)",
        "status": "Applied"
      },
      {
        "id": 3,
        "dateApplied": "Fri Dec 08 2017 02:20:35 GMT-0500 (EST)",
        "position": "Software Engineer",
        "company": "Uber",
        "contact": {
          "name": "Bob Smith",
          "position": "Engineer",
          "email": "bs@uber.com",
          "phone": "917-123-4567"
        },
        "checklist": {
          "researched": "true",
          "reachedOut": "true",
          "sentNote": "true",
          "networked": "true"
        },
        "lastContactDate": "Fri Dec 08 2017 02:20:35 GMT-0500 (EST)",
        "status": "Applied"
      }
    ]
  };
  */
};