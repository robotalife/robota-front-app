import { Autocomplete, AutocompleteProps, TextField } from "@mui/material";
import { Message } from "../../shared/interfaces/message";
import InputWrapper from "./InputWrapper";
import { useId } from "react";

import classes from "./ComboBox.module.scss";

export interface AutocompleteOption {
  label: string;
  value: string | null | undefined;
}

interface Props
  extends Omit<
    AutocompleteProps<AutocompleteOption, false, false, false>,
    "renderInput"
  > {
  options: AutocompleteOption[];
  label?: string;
  message?: string;
  messageType?: Message;
}

const ComboBox = ({
  label,
  message,
  messageType,
  options,
  ...props
}: Props) => {
  const tmpId = useId();

  return (
    <InputWrapper
      id={props.id || tmpId}
      label={label}
      message={message}
      messageType={messageType}
      className={classes.wrapper}
    >
      <Autocomplete
        options={options}
        renderInput={(params) => <TextField {...params} />}
        {...props}
      />
    </InputWrapper>
  );
};

export default ComboBox;
