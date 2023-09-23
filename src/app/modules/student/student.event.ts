import { RedisClinet } from '../../../shared/redis';
import { STUDENT_CREATED_EVENT } from './student.constant';
import { StudentService } from './student.service';

const initStudentEvent = () => {
  RedisClinet.subscriber(STUDENT_CREATED_EVENT, async (e: string) => {
    const data = JSON.parse(e);
    StudentService.createStudentEvent(data);
    console.log('created student ', data);
  });
};
export default initStudentEvent;
