import { Autocomplete, AutocompleteProps } from "@mui/material";
import { Message } from "../../shared/interfaces/message";
import InputWrapper from "./InputWrapper";
import { useId } from "react";

import classes from "./ComboBox.module.scss";

interface AutocompleteOption {
  label: string;
  value: string;
}

interface Props
  extends AutocompleteProps<AutocompleteOption, true, false, true> {
  label?: string;
  message?: string;
  messageType?: Message;
}

const ComboBox = ({ label, message, messageType, ...props }: Props) => {
  const tmpId = useId();

  return (
    <InputWrapper
      id={props.id || tmpId}
      label={label}
      message={message}
      messageType={messageType}
      className={classes.wrapper}
    >
      {/* <Autocomplete {...props} /> */}
    </InputWrapper>
  );
};

export default ComboBox;
