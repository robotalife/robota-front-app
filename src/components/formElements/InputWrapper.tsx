import { PropsWithChildren, ReactNode } from 'react';
import { Message } from '../../shared/interfaces/message';

import classes from './InputWrapper.module.scss';
import { FormHelperText } from '@mui/material';

interface Props extends PropsWithChildren {
  label?: ReactNode;
  id: string;
  message?: string;
  messageType?: Message;
  className?: string;
}

const InputWrapper = ({ className, id, label, message, messageType, ...props }: Props) => {
  return (
    <div className={`${classes.inputWrapper} ${className}`}>
      {label && (
        <label htmlFor={id} className={classes.label}>
          {label}
        </label>
      )}
      {props.children}
      {message && (
        <FormHelperText className={classes.helperText} error={messageType === 'error'}>
          {message}
        </FormHelperText>
      )}
    </div>
  );
};

export default InputWrapper;
