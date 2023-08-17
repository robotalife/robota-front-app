import {
  Grid,
  IconButton,
  InputAdornment,
  TextField as MUITextField,
  SelectProps,
  StandardTextFieldProps,
  TextFieldProps,
} from "@mui/material";
import { useId, useState } from "react";
import { IconEye, IconEyeOff } from "../../shared/icons/Icons";
import { Message } from "../../shared/interfaces/message";
import classes from "./TextField.module.scss";
import InputWrapper from "./InputWrapper";
import Select from "./Select";

export interface DropdownTextFieldProps {
  selectProps: SelectProps;
  textFieldProps: TextFieldProps;
  message?: string;
  messageType?: Message;
}

const DropdownTextField = ({
  selectProps,
  textFieldProps,
  message,
  messageType,
}: DropdownTextFieldProps) => {
  const selectId = useId();
  const textFieldId = useId();
  const wrapperId = useId();

  return (
    <InputWrapper id={wrapperId} message={message} messageType={messageType}>
      <Grid container flexWrap={"nowrap"}>
        <Grid item xs={"auto"} sx={{ minWidth: 90 }}>
          <Select
            {...selectProps}
            label={undefined}
            id={selectProps.id || selectId}
            sx={{ ...selectProps.sx, width: "100%" }}
          />
        </Grid>
        <Grid item xs>
          <MUITextField
            {...textFieldProps}
            label={undefined}
            id={textFieldProps.id || textFieldId}
            className={`${textFieldProps.className} ${classes.input}`}
            sx={{ width: "100%", ...textFieldProps.sx }}
          />
        </Grid>
      </Grid>
    </InputWrapper>
  );
};

export default DropdownTextField;
