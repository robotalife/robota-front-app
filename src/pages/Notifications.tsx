import { Link } from 'react-router-dom';
import LayoutBreadcrumbs from '../components/pageStructure/LayoutBreadcrumbs';
import { IconAlertTriangle, IconCircleCheck, IconDollarSign, IconLink, IconOctagon, IconOctagonCircle, IconTrashBin } from '../shared/icons/Icons';
import routes from '../shared/consts/routes';
import { Typography } from '@mui/material';
import PageTitle from '../components/pageStructure/PageTitle';
import { useEffect, useState } from 'react';
import Loader from '../components/shared/Loader';
import Table from '../components/shared/table/Table';
import TableRow from '../components/shared/table/TableRow';
import TableCell from '../components/shared/table/TableCell';
import TableBody from '../components/shared/table/TableBody';
import { INotification, NotificationIcon } from '../shared/interfaces/notifications';
import TableHead from '../components/shared/table/TableHead';
import WrapperBox from '../components/shared/wrapperBox/WrapperBox';
import WrapperBoxSection from '../components/shared/wrapperBox/WrapperBoxSection';
import { Message } from '../shared/interfaces/message';
import CircleIcon from '../components/shared/CircleIcon';

const mockNotifications: INotification[] = [
  {
    type: 'success',
    icon: 'confirmation',
    title: 'Password reset complete!',
    message: 'Your password has been successfully updated.',
    date: 'Dec 1, 2022',
  },
  {
    type: 'success',
    icon: 'general',
    title: 'Welcome to Robotalife!',
    message: 'To begin your journey, effortlessly integrate your exchange account with our platform.',
    date: 'Nov 1, 2022',
  },
  {
    type: 'success',
    icon: 'connection',
    title: 'Exchange connected successfully',
    message: 'Your (Name of Exchange) exchange successfully connected to Robotalife',
    date: 'Oct 1, 2079',
  },
  {
    type: 'success',
    icon: 'removal',
    title: 'Exchange deleted successfully',
    message: 'Your connection to [Name of Exchange has been removed.',
    date: 'Sep 1, 2022',
  },
  {
    type: 'success',
    icon: 'subscription',
    title: 'Subscription successfully Processed',
    message: 'Your payment for the subscription to the ( Bat Name) hot has been muccesfully procesand',
    date: 'Aug 1, 2022',
  },
  {
    type: 'warning',
    icon: 'attention',
    title: 'Your subscription to a bot is about to expire',
    message: 'Your subscription to the (Bot Name) bot will expire in 5 days. Pay the subscription today to stay connected.',
    date: 'Jul 1, 2022',
  },
  {
    type: 'info',
    icon: 'general',
    title: 'The base order size successfully changed',
    message: 'Base order size of (Sot Name) successfully changed to (amount)',
    date: 'Jul 1, 2022',
  },
];

const Notifications = () => {
  const [loading, setLoading] = useState(true);

  const [notificationsList, setNotificationsList] = useState<INotification[]>(mockNotifications);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <LayoutBreadcrumbs>
        <Link to={routes.exchangeList}>
          <IconOctagonCircle />
        </Link>
        <Link to={routes.exchangeNotifications}>Notifications</Link>
        <Typography component={'span'}>All notifications</Typography>
      </LayoutBreadcrumbs>

      <PageTitle title="All notifications" />

      <WrapperBox>
        <WrapperBoxSection noPadding>
          {loading ? (
            <Loader />
          ) : (
            <Table sx={{ tableLayou: 'fixed', minWidth: '800px' }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ minWidth: 480 }} colSpan={2}>
                    Notifications
                  </TableCell>
                  <TableCell>Message</TableCell>
                  <TableCell sx={{ width: 150 }}>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(notificationsList) && notificationsList.length ? (
                  notificationsList.map((notification, i) => (
                    <TableRow key={i}>
                      <TableCell sx={{ paddingRight: 0 }}>
                        <CircleIcon type={notification.type} icon={notification.icon} />
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ color: '#101828', fontsize: '14px', fontWeight: 500 }}> {notification.title}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ fontSize: '14px', color: '#667085' }}>{notification.message}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ fontSize: '14px', color: '#667085' }}>{notification.date}</Typography>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5}>There is no notifications available</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </WrapperBoxSection>
      </WrapperBox>
    </>
  );
};

export default Notifications;
