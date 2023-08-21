import { Grid, MenuItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { IconArrowRight } from "../../shared/icons/Icons";
import classes from "./dropdownNotificationItem.module.scss";
import Badge from "./Badge";

export interface IDropdownNotificationItem {
  title: string;
  description?: string;
  icon?: JSX.Element;
  linkTitle?: string;
  link?: string;
  isNew?: boolean;
  onclick?: () => void;
}

const DropdownNotificationItem = ({
  title,
  description,
  icon,
  linkTitle,
  link,
  isNew,
  onclick,
}: IDropdownNotificationItem) => {
  return (
    <MenuItem onClick={onclick} className={classes.dropdownItem}>
      <Grid container flexWrap={"nowrap"}>
        {icon && (
          <Grid item xs={"auto"}>
            <div className={classes.icon}>{icon}</div>
          </Grid>
        )}
        <Grid item xs>
          <Grid container>
            <Grid item xs={"auto"}>
              <Typography
                component={"h6"}
                variant={"h6"}
                className={classes.title}
              >
                {title}
              </Typography>
            </Grid>
            {isNew && (
              <Grid item xs={"auto"}>
                <Badge variant="success" className={classes.new}>
                  new
                </Badge>
              </Grid>
            )}
          </Grid>
          {description && (
            <Typography
              component={"p"}
              variant={"body2"}
              className={classes.description}
            >
              {description}
            </Typography>
          )}
          {!!link && !!linkTitle && (
            <Link to={link} className={classes.link}>
              {linkTitle} <IconArrowRight />
            </Link>
          )}
        </Grid>
      </Grid>
    </MenuItem>
  );
};

export default DropdownNotificationItem;
