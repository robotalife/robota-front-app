import moment, { Moment } from 'moment';

const getDateString = (date: Moment | string | Date | null): string => {
  return !date ? '' : moment(date).format('YYYY/MM/DD');
};

export default getDateString;
