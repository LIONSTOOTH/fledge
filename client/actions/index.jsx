import { getAllApplications } from './jobApplications.jsx';

// takes request from view and formats before sending to store
export const fetchUserApplications = ({ user }) => ({
  type: 'FETCH_APPLICATIONS',
  getAllApplications(user)
});
