import {
  Autocomplete,
  AutocompleteProps,
  FormHelperText,
  TextField,
} from "@mui/material";
import { Message } from "../../shared/interfaces/message";

import classes from "./ComboBox.module.scss";

interface AutocompleteOption {
  label: string;
  value: string;
}

interface Props
  extends AutocompleteProps<AutocompleteOption, true, false, true> {
  message?: string;
  messageType?: Message;
}

const ComboBox = ({ message, messageType, ...props }: Props) => {
  return (
    <div className={classes.comboWrapper}>
      {/* <Autocomplete {...props} /> */}

      {message && (
        <FormHelperText
          className={classes.helperText}
          error={messageType === "error"}
        >
          {message}
        </FormHelperText>
      )}
    </div>
  );
};

export default ComboBox;
