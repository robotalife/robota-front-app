import { ImgHTMLAttributes } from "react";
import classes from "./PairLogo.module.scss";

const PairLogo = ({
  className,
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) => {
  return (
    <img {...props} className={`${classes.pairLogo} ${className || ""}`} />
  );
};

export default PairLogo;
