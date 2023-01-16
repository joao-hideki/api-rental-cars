import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { IDateProvider } from '../IDateProvider';

dayjs.extend(utc);

class DateProvider implements IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number {
    return dayjs(this.convertToUtc(end_date)).diff(this.convertToUtc(start_date), 'hours');
  }
  convertToUtc(date: Date): string {
    return dayjs(date).utc().local().format();
  }
  currentDate(): Date {
    return dayjs().toDate();
  }
  currentDateAdd24Hours() {
    return dayjs().add(1, 'day').toDate();
  }
}

export {DateProvider};