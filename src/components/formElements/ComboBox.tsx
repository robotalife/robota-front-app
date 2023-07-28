import {
  Autocomplete,
  AutocompleteProps,
  Box,
  Grid,
  TextField,
} from "@mui/material";
import { Message } from "../../shared/interfaces/message";
import InputWrapper from "./InputWrapper";
import { useId } from "react";

import classes from "./ComboBox.module.scss";
import { IconChevronDown } from "../../shared/icons/Icons";

export interface AutocompleteOption {
  label: string;
  value: string | null | undefined;
  icon?: JSX.Element;
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
  placeholder,
  ...props
}: Props) => {
  const tmpId = useId();

  return (
    <InputWrapper
      id={props.id || tmpId}
      label={label}
      message={message}
      messageType={messageType}
      className={`${classes.wrapper} ${!!message && classes.error}`}
    >
      <Autocomplete
        options={options}
        renderInput={(params) => (
          <TextField {...params} placeholder={placeholder} />
        )}
        renderOption={(params, option) => (
          <Grid container component="li" {...params} rowSpacing={1}>
            {option.icon && (
              <Grid item xs={"auto"}>
                {option.icon}
              </Grid>
            )}
            <Grid item xs>
              {option.label}
            </Grid>
          </Grid>
        )}
        popupIcon={<IconChevronDown />}
        {...props}
      />
    </InputWrapper>
  );
};

export default ComboBox;
