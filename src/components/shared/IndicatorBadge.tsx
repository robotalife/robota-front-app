import { PropsWithChildren } from "react";
import classes from "./IndicatorBadge.module.scss";

interface Props extends PropsWithChildren {
  color?: "success" | "error" | "secondary";
}

const IndicatorBadge = ({ children, color }: Props) => {
  return (
    <div
      className={`${classes.indicatorBadge} ${color ? classes[color] : " "}`}
    >
      {children}
    </div>
  );
};

export default IndicatorBadge;
