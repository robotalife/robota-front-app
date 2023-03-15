import {
  Grid,
  Input,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField as MUITextField,
  StandardTextFieldProps,
  InputBase,
} from "@mui/material";
import { ReactNode, useId, useState } from "react";
import { IconEye, IconEyeOff } from "../../shared/icons/Icons";
import { Message } from "../../shared/interfaces/Message";
import classes from "./TextField.module.scss";

interface Props extends StandardTextFieldProps {
  startIcon?: ReactNode;
  message?: string | string[];
  messageType?: Message;
  className?: string;
}

const TextField = (props: Props) => {
  const tmpId = useId();
  // If the input type is password then this is the to handle show password
  const [showPassword, setShowPassword] = useState(false);

  // If the input type is password then we need to handle the eye icon click
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div className={classes.inputWrapper}>
      {props.label && (
        <label htmlFor={props.id || tmpId} className={classes.label}>
          {props.label}
        </label>
      )}
      <MUITextField
        {...{ props }}
        id={props.id || tmpId}
        className={`${props.className} ${classes.input}`}
        sx={{ width: "100%", ...props.sx }}
        type={
          props.type === "password"
            ? showPassword
              ? "text"
              : "password"
            : props.type
        }
        InputProps={{
          startAdornment: props.startIcon ? (
            <InputAdornment position="start">{props.startIcon}</InputAdornment>
          ) : undefined,
          endAdornment:
            props.type === "password" ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <IconEye /> : <IconEyeOff />}
                </IconButton>
              </InputAdornment>
            ) : undefined,
        }}
      />
      {props.message && (
        <FormHelperText
          className={classes.helperText}
          error={props.messageType === "error"}
        >
          {props.message}
        </FormHelperText>
      )}
    </div>
  );
};

export default TextField;
