import { Slider as MUISlider, SliderProps } from "@mui/material";
import InputWrapper from "./InputWrapper";
import { useId } from "react";

import classes from "./Slider.module.scss";

interface Props extends SliderProps {
  label?: string;
}

const Slider = ({ label, ...props }: Props) => {
  const tmpId = useId();
  return (
    <InputWrapper
      id={props.id || tmpId}
      label={label}
      className={classes.wrapper}
    >
      <div className={classes.innerContainer}>
        <MUISlider {...props} />
      </div>
    </InputWrapper>
  );
};

export default Slider;
