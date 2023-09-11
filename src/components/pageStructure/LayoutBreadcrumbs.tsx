import { Breadcrumbs, BreadcrumbsProps } from '@mui/material';
import { IconChevronRight } from '../../shared/icons/Icons';

import classes from './LayoutBreadcrumbs.module.scss';

interface Props extends BreadcrumbsProps {}

const LayoutBreadcrumbs = (props: Props) => {
  return (
    <div className={classes.breadcrumbsContainer}>
      <Breadcrumbs separator={<IconChevronRight />}>{props.children}</Breadcrumbs>
    </div>
  );
};

export default LayoutBreadcrumbs;
