import { IconButton } from "@mui/material";
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
          <IconSliders />
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
