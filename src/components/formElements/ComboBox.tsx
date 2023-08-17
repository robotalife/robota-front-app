import {
  Autocomplete,
  AutocompleteProps,
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
  placeholderIcon?: JSX.Element;
}

const ComboBox = ({
  label,
  message,
  messageType,
  options,
  placeholder,
  placeholderIcon,
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
        renderInput={({ InputProps, ...params }) => {
          const { startAdornment, ...otherInputProps } = InputProps;
          return (
            <TextField
              placeholder={placeholder}
              InputProps={{
                ...otherInputProps,
                startAdornment: !props?.value
                  ? placeholderIcon
                  : props?.value?.icon,
              }}
              {...params}
            />
          );
        }}
        renderOption={(params, option) => (
          <Grid container component="li" {...params} columnSpacing={1}>
            {option.icon && (
              <Grid item xs={"auto"}>
                <div className={classes.icon}>{option.icon}</div>
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
