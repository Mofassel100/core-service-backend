import { RedisClinet } from '../../../shared/redis';
import { EVENT_CREATED_FACULTY } from './faculty.constant';
import { FacultyService } from './faculty.service';

const initFacultyEvent = () => {
  RedisClinet.subscriber(EVENT_CREATED_FACULTY, async (e: string) => {
    const data = JSON.parse(e);
    FacultyService.createFacultyEvent(data);
    console.log('created Faculty ', data);
  });
};
export default initFacultyEvent;
