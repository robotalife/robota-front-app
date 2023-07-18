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
  IconLogout, IconHelpDesk,
} from "../../shared/icons/Icons";
import classes from "./Sidebar.module.scss";
import useLogout from "../../shared/hooks/useLogout";

const Sidebar = () => {
  const logout = useLogout();

  return (
    <div className={classes.wrapper}>
      <nav className={classes.nav}>
        {/* <IconButton>
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
          <IconTripleOctagons />
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
            to={routes.store}
          >
            <IconShopingCart />
          </NavLink>
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
          <NavLink style={({ isActive, isPending }) => {
            return {
              color: isActive ? "red" : "inherit",
            };
          }}
                   className={({ isActive, isPending }) => {
                     return isActive ? "active" : isPending ? "pending" : "";
                   }}
                   to={routes.instagram} target={"_black"}>
            <IconInstagram />
          </NavLink>

        </IconButton>
        <IconButton>
          <NavLink style={({ isActive, isPending }) => {
            return {
              color: isActive ? "red" : "inherit",
            };
          }}
                   className={({ isActive, isPending }) => {
                     return isActive ? "active" : isPending ? "pending" : "";
                   }}
                   to={routes.twitter} target={"_black"}>
            <IconTwitter />
          </NavLink>

        </IconButton>
        <IconButton>
          <NavLink style={({ isActive, isPending }) => {
            return {
              color: isActive ? "red" : "inherit",
            };
          }}
                   className={({ isActive, isPending }) => {
                     return isActive ? "active" : isPending ? "pending" : "";
                   }}
                   to={routes.helpcenter} target={"_black"}>
            <IconHelpDesk />
          </NavLink>
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
