import classes from "./Badge.module.scss";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  className?: string;
}

const Badge = ({ children, className }: Props) => {
  return (
    <div className={`${classes.badge} ${className || ""}`}>{children}</div>
  );
};

export default Badge;
