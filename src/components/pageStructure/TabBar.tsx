import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

import classes from "./TabBar.module.scss";

export interface TabBarItem {
  label: ReactNode;
  value: string | number;
  action: (v: string | number) => void;
  active: boolean;
}

interface Props {
  tabs: TabBarItem[];
}

const TabBar = ({ tabs }: Props) => {
  return (
    <nav className={classes.linkBar}>
      <ul className={classes.linksWrapper}>
        {tabs.map((tab, i) => (
          <li key={i.toString()} className={classes.linkItem}>
            <div
              role="button"
              tabIndex={i + 1}
              className={tab.active ? "is-active" : ""}
              onClick={() => tab.action(tab.value)}
              onKeyUp={(e) => e.code === "Enter" && tab.action(tab.value)}
            >
              {tab.label}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TabBar;
