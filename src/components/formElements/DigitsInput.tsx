import { FormHelperText, InputBase, InputBaseProps } from '@mui/material';
import { Message } from '../../shared/interfaces/message';
import OtpInput from 'react-otp-input';

import classes from './DigitsInput.module.scss';
import { HTMLProps, useState } from 'react';

interface Props {
  message?: string;
  messageType?: Message;
  digitCounts: number;
  onChange: (e: string) => void;
  value: string;
}

const DigitsInput = ({ message, messageType, digitCounts, onChange, value }: Props) => {
  return (
    <div className={`${classes.otpInputWrapper} ${value.length === digitCounts ? classes.filled : ''}`}>
      <OtpInput
        value={value}
        onChange={onChange}
        renderSeparator={<span> </span>}
        renderInput={(props) => <input {...props} className={classes.input} />}
        numInputs={digitCounts}
        shouldAutoFocus
      />

      {message && (
        <FormHelperText className={classes.helperText} error={messageType === 'error'}>
          {message}
        </FormHelperText>
      )}
    </div>
  );
};

export default DigitsInput;
