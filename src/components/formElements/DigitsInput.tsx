import { FormHelperText, InputBase, InputBaseProps } from "@mui/material";
import { Message } from "../../shared/interfaces/Message";
import OtpInput from "react-otp-input";

import classes from "./DigitsInput.module.scss";
import { ChangeEvent } from "react";

interface Props extends InputBaseProps {
  message?: string;
  messageType?: Message;
  digitCounts: number;
  onChangeTmp: (e: string) => void;
}

const DigitsInput = ({
  message,
  messageType,
  digitCounts,
  onChangeTmp,
  ...inputProps
}: Props) => {
  // const handleChange = (
  //   e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   onChange(e.currentTarget.value);
  // };

  return (
    <div className={classes.otpInputWrapper}>
      <OtpInput
        value={inputProps.value as string}
        onChange={(e) => onChangeTmp(e)}
        numInputs={digitCounts}
        renderSeparator={<span />}
        renderInput={(props) => <input {...props} className={classes.mask} />}
      />
      {/* <InputBase
        {...inputProps}
        // eslint-disable-next-line
        onChange={handleChange}
        className={classes.otpInput}
        inputProps={{
          pattern: "\\d*",
          inputMode: "numeric",
          maxLength: 4,
        }}
      />
 */}
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

export default DigitsInput;
