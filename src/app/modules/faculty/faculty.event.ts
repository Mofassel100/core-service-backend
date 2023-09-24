import { RedisClinet } from '../../../shared/redis';
import {
  EVENT_CREATED_FACULTY,
  EVENT_DELETE_FACULTY,
  EVENT_GET_ALL_FACULTY,
  EVENT_GET_SINGLE_FACULTY,
  EVENT_UPDATED_FACULTY,
} from './faculty.constant';
import { FacultyService } from './faculty.service';

const initFacultyEvent = () => {
  RedisClinet.subscriber(EVENT_CREATED_FACULTY, async (e: string) => {
    const data = JSON.parse(e);
    FacultyService.createFacultyEvent(data);
    console.log('created Faculty ', data);
  });
  RedisClinet.subscriber(EVENT_UPDATED_FACULTY, async (e: string) => {
    const data = JSON.parse(e);
    FacultyService.UpdateEventFaculty(data);
    console.log('update faculty', data);
  });
  RedisClinet.subscriber(EVENT_GET_ALL_FACULTY, async (e: string) => {
    const data = JSON.parse(e);
    FacultyService.getEventAllData();
    console.log('get All Faculty', data);
  });
  RedisClinet.subscriber(EVENT_GET_SINGLE_FACULTY, async (e: string) => {
    const data = JSON.parse(e);
    FacultyService.getEventSingleData(data);
    console.log('single Faculty Faculty', data);
  });
  RedisClinet.subscriber(EVENT_DELETE_FACULTY, async (e: string) => {
    const data = JSON.parse(e);

    console.log('Deleted Faculty', data);
  });
};
export default initFacultyEvent;
