import { Message } from "../../shared/interfaces/message";
import classes from "./Badge.module.scss";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  className?: string;
  variant?: Message;
}

const Badge = ({ children, className, variant }: Props) => {
  return (
    <div
      className={`${classes.badge} ${variant ? classes[variant] : ""} ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};

export default Badge;
