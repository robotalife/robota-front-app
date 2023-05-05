import { Slider as MUISlider, SliderProps } from "@mui/material";
import classes from "./Slider.module.scss";

interface Props extends SliderProps {
  label?: string;
}

const Slider = ({ label, ...props }: Props) => {
  return (
    <div className={classes.inputWrapper}>
      {label && <label className={classes.label}>{label}</label>}
      <MUISlider {...props} />
    </div>
  );
};

export default Slider;
