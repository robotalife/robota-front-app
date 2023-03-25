import { IconButton } from "@mui/material";
import { NavLink } from "react-router-dom";
import routes from "../../shared/consts/routes";
import {
  IconBarChart,
  IconGear,
  IconHexagon,
  IconInstagram,
  IconShopingCart,
  IconSliders,
  IconTelegram,
  IconTwitter,
} from "../../shared/icons/Icons";
import classes from "./Sidebar.module.scss";

const Sidebar = () => {
  return (
    <div className={classes.wrapper}>
      <nav className={classes.nav}>
        <IconButton>
          <IconBarChart />
        </IconButton>
        <IconButton>
          <IconHexagon />
        </IconButton>
        <IconButton>
          <IconShopingCart />
        </IconButton>
        <IconButton>
          <IconGear />
        </IconButton>
        <IconButton>
          <NavLink
            style={({ isActive, isPending }) => {
              return {
                color: isActive ? "red" : "inherit",
              };
            }}
            className={({ isActive, isPending }) => {
              return isActive ? "active" : isPending ? "pending" : "";
            }}
            to={routes.bots}
          >
            <IconSliders />
          </NavLink>
        </IconButton>
      </nav>
      <nav className={classes.sharing}>
        <IconButton>
          <IconInstagram />
        </IconButton>
        <IconButton>
          <IconTwitter />
        </IconButton>
        <IconButton>
          <IconTelegram />
        </IconButton>
      </nav>
      <nav className={classes.profile}></nav>
    </div>
  );
};

export default Sidebar;
