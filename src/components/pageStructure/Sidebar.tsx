import { IconButton } from "@mui/material";
import { NavLink } from "react-router-dom";
import routes from "../../shared/consts/routes";
import {
  IconBarChart,
  IconOctagonCircle,
  IconTripleOctagons,
  IconInstagram,
  IconShopingCart,
  IconVrHeadset,
  IconTelegram,
  IconTwitter,
  IconLogout,
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
        {/* <IconButton>
          <IconTripleOctagons />
        </IconButton>
        <IconButton>
          <IconShopingCart />
        </IconButton> */}
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
            to={routes.exchangeList}
          >
            <IconOctagonCircle />
          </NavLink>
        </IconButton>
        <div className={classes.navDivider} />
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
            <IconVrHeadset />
          </NavLink>
        </IconButton>
        <IconButton
          onClick={logout}
          sx={{ display: { lg: "none" } }}
          title="Log out"
        >
          <IconLogout />
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
      <div className={classes.navDivider} />
      <nav className={classes.profile}>
        <IconButton onClick={logout} title="Log out">
          <IconLogout />
        </IconButton>
      </nav>
    </div>
  );
};

export default Sidebar;
