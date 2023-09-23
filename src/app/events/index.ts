import initFacultyEvent from '../modules/faculty/faculty.event';
import initStudentEvent from '../modules/student/student.event';

const subscriberToEvent = () => {
  initStudentEvent();
  initFacultyEvent();
};
export default subscriberToEvent;
