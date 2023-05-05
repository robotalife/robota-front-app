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
import useLogout from "../../shared/hooks/useLogout";

const Sidebar = () => {
  const logout = useLogout();

  return (
    <div className={classes.wrapper}>
      <nav className={classes.nav}>
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
            to={routes.portfolio}
          >
            <IconBarChart />
          </NavLink>
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
            to={routes.botsNew}
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
      <nav className={classes.profile}>
        <IconButton onClick={logout} title="Log out">
          M
        </IconButton>
      </nav>
    </div>
  );
};

export default Sidebar;
