import moment, {Moment} from 'moment';

const getDateTimeString = (date: Moment | string | Date | null): string => {
    if (!moment(date).isValid()) {
        return ('N/A');
    }
    return moment(date).format('LLL');
};

export default getDateTimeString;
