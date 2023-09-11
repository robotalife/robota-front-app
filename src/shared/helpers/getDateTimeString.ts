import moment, { Moment } from 'moment';

const getDateTimeString = (date: Moment | string | Date | null): string => {
  return moment(date).format('LLL');
};

export default getDateTimeString;
