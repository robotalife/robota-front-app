import { IconButton, InputAdornment, TextField as MUITextField, StandardTextFieldProps } from '@mui/material';
import { useId, useState } from 'react';
import { IconEye, IconEyeOff } from '../../shared/icons/Icons';
import { Message } from '../../shared/interfaces/message';
import classes from './TextField.module.scss';
import InputWrapper from './InputWrapper';

interface Props extends StandardTextFieldProps {
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  message?: string;
  messageType?: Message;
}

const TextField = ({ startIcon, endIcon, message, messageType, ...textFieldProps }: Props) => {
  const tmpId = useId();
  // If the input type is password then this is the to handle show password
  const [showPassword, setShowPassword] = useState(false);

  // If the input type is password then we need to handle the eye icon click
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const EndIcon = (): JSX.Element => {
    if (endIcon) return endIcon;

    return textFieldProps.type === 'password' ? (
      <InputAdornment position="end">
        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
          {showPassword ? <IconEye /> : <IconEyeOff />}
        </IconButton>
      </InputAdornment>
    ) : (
      <></>
    );
  };

  return (
    <InputWrapper id={textFieldProps.id || tmpId} label={textFieldProps.label} message={message} messageType={messageType}>
      <MUITextField
        {...textFieldProps}
        label={undefined}
        id={textFieldProps.id || tmpId}
        className={`${textFieldProps.className} ${classes.input}`}
        sx={{ width: '100%', ...textFieldProps.sx }}
        type={textFieldProps.type === 'password' ? (showPassword ? 'text' : 'password') : textFieldProps.type}
        InputProps={{
          startAdornment: startIcon ? <InputAdornment position="start">{startIcon}</InputAdornment> : undefined,
          endAdornment: <EndIcon />,
        }}
      />
    </InputWrapper>
  );
};

export default TextField;
