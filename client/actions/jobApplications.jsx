import React from 'react';
import axios from 'axios';

// dummy data for testing
// refactor to GET from database once set up
export const getAllApplications = ({ user }) => {

  return {
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
};