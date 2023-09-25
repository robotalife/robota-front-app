import { IconButton, Menu, MenuItem } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { IconArrowRight, IconBell, IconCircleCheck, IconDollarSign, IconLink, IconOctagon, IconTrashBin } from '../../shared/icons/Icons';
import DropdownNotificationItem, { IDropdownNotificationItem } from './DropdownNotificationItem';

import classes from './NotificationsDropdown.module.scss';
import { Link } from 'react-router-dom';
import routes from '../../shared/consts/routes';

const dropdownNotificationMockData: IDropdownNotificationItem[] = [
  {
    title: 'Password reset complete!',
    description: 'Password updated successfully!',
    icon: <IconCircleCheck />,
    isNew: true,
  },
  {
    title: 'Welcome To Robotalife!',
    description: 'Welcome to RobotaLife. To begin your journey, effortlessly integrate your exchange account with our platform.',
    icon: <IconOctagon />,
    isNew: true,
  },
  {
    title: 'Exchange connected successfully',
    description: 'Your { Name of Exchange } exchange successfully connected to RobotaLife.',
    icon: <IconLink />,
    isNew: false,
  },
  {
    title: 'Exchange deleted successfully',
    description: 'Your connection to { Name of Exchange } has been removed.',
    icon: <IconTrashBin />,
    isNew: false,
  },
  {
    title: 'Bot payment successfully received',
    description: 'Your payment for the { Bot Name } bot was successfully made until  { Date }',
    icon: <IconDollarSign />,
    link: '/',
    linkTitle: 'View invoice',
    isNew: false,
  },
];

const NotificationsDropdown = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // API call function
  const callApi = () => {
    // Make your API call here
    console.log('API called');
  };

  // Call the API on component mount
  useEffect(() => {
    callApi();
  }, []);

  // Call the API every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      callApi();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <IconBell />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        className={classes.dropdownMenu}
      >
        {dropdownNotificationMockData.map((item, index) => (
          <DropdownNotificationItem key={index} {...item} />
        ))}
        <MenuItem onClick={handleClose} className={classes.dropdownItem}>
          <Link to={routes.notifications}>
            All notifications <IconArrowRight />
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
};

export default NotificationsDropdown;
