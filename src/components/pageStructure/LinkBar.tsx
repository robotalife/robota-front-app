import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import classes from './LinkBar.module.scss';
import Badge from '../shared/Badge';

interface LinkBarItem {
  label: ReactNode;
  to: string;
  badge?: number | string;
}

interface Props {
  links: LinkBarItem[];
}

const LinkBar = ({ links }: Props) => {
  return (
    <nav className={classes.linkBar}>
      <ul className={classes.linksWrapper}>
        {links.map((link, i) => (
          <li key={i.toString()} className={classes.linkItem}>
            <NavLink
              to={link.to}
              className={({ isActive, isPending }: { isActive: boolean; isPending: boolean }) =>
                isPending ? 'is-pending' : isActive ? 'is-active' : ''
              }
            >
              {link.label}
              {!!link.badge && <Badge>{link.badge}</Badge>}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default LinkBar;
