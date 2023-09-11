import { PropsWithChildren } from 'react';

import classes from './TextBadge.module.scss';

interface Props extends PropsWithChildren {
  variation?: 'secondary' | 'primary' | 'success' | 'error';
}

const TextBadge = ({ variation = 'secondary', children }: Props) => {
  return <div className={`${classes.badge} ${classes[variation]}`}>{children}</div>;
};

export default TextBadge;
