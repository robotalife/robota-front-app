import { useMemo } from 'react';
import { IconAlertTriangle, IconCircleCheck, IconDollarSign, IconLink, IconOctagon, IconTrashBin } from '../../shared/icons/Icons';
import { Message } from '../../shared/interfaces/message';
import { NotificationIcon } from '../../shared/interfaces/notifications';

import classes from './CircleIcon.module.scss';

const CircleIcon = ({ type, icon }: { type?: Message; icon: NotificationIcon }) => {
  const getIcon = useMemo(() => {
    switch (icon) {
      case 'confirmation':
        return <IconCircleCheck />;
      case 'general':
        return <IconOctagon />;
      case 'connection':
        return <IconLink />;
      case 'removal':
        return <IconTrashBin />;
      case 'subscription':
        return <IconDollarSign />;
      case 'attention':
        return <IconAlertTriangle />;
    }
  }, [icon]);

  return <div className={`${classes.icon} ${type ? classes[type] : ''}`}>{getIcon}</div>;
};

export default CircleIcon;
