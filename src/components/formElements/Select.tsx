import { Select as MUISelect, SelectProps } from '@mui/material';
import { useId } from 'react';
import InputWrapper from './InputWrapper';
import { Message } from '../../shared/interfaces/message';

import classes from './Select.module.scss';

interface Props extends SelectProps {
  message?: string;
  messageType?: Message;
}

const Select = ({ label, message, messageType, ...props }: Props) => {
  const tmpId = useId();

  return (
    <InputWrapper id={props.id || tmpId} label={label} message={message} messageType={messageType} className={classes.wrapper}>
      <MUISelect {...props}>{props.children}</MUISelect>
    </InputWrapper>
  );
};

export default Select;
