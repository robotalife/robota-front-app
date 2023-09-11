import { PropsWithChildren, ReactNode } from 'react';

import classes from './IconBadge.module.scss';

interface Props extends PropsWithChildren {
  icon?: ReactNode;
}

const IconBadge = ({ children, ...props }: Props) => {
  return (
    <div {...props} className={classes.badge}>
      {children}
    </div>
  );
};

export default IconBadge;
