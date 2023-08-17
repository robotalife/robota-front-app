import {
  Grid,
  TextField,
  Select,
  SelectProps,
  TextFieldProps,
} from "@mui/material";
import { useId } from "react";
import { Message } from "../../shared/interfaces/message";
import classes from "./DropdownTextField.module.scss";
import InputWrapper from "./InputWrapper";
import { IconChevronDown } from "../../shared/icons/Icons";

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
    <InputWrapper
      id={wrapperId}
      message={message}
      messageType={messageType}
      className={classes.wrapper}
    >
      <div className={classes.innerWrapper}>
        <Select
          IconComponent={IconChevronDown}
          {...selectProps}
          label={undefined}
          id={selectProps.id || selectId}
          className={`${selectProps.className} ${classes.select}`}
          sx={{ ...selectProps.sx, minWidth: 90 }}
        />
        <TextField
          {...textFieldProps}
          label={undefined}
          id={textFieldProps.id || textFieldId}
          className={`${textFieldProps.className} ${classes.input}`}
          sx={{ width: "100%", ...textFieldProps.sx }}
        />
      </div>
    </InputWrapper>
  );
};

export default DropdownTextField;
