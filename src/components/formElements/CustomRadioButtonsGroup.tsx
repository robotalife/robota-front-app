import { FormControl, FormControlLabel, FormControlLabelProps, FormLabel, Radio, RadioGroup, RadioGroupProps, useRadioGroup } from '@mui/material';
import classes from './CustomRadioButtonsGroup.module.scss';
import { ReactNode, useId } from 'react';
import { IconCheck } from '../../shared/icons/Icons';
import styled from '@emotion/styled';

interface Props extends RadioGroupProps {
  items: {
    value: number | string;
    label: ReactNode;
  }[];
  groupLabel?: string;
}

function CustomFormControlLabel(props: FormControlLabelProps) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return (
    <div className={`${classes.itemWrapper} ${checked ? classes.checked : ''}`}>
      <FormControlLabel className={checked ? classes.checked : ''} checked={checked} {...props} />
      <div className={`${classes.radioContainer} ${checked ? classes.checked : ''}`}>
        <IconCheck />
      </div>
    </div>
  );
}

const CustomRadioButtonsGroup = ({ items, groupLabel, ...radioGroupProps }: Props) => {
  const tmpId = useId();
  const tmpName = useId();

  return (
    <FormControl className={classes.groupWrapper}>
      {!!groupLabel && <FormLabel id={tmpId}>{groupLabel}</FormLabel>}
      <RadioGroup aria-labelledby={tmpId} name={radioGroupProps.name || tmpName} {...radioGroupProps}>
        {items.map((item, i) => (
          <CustomFormControlLabel key={i} control={<Radio className={classes.radio} />} {...item} />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default CustomRadioButtonsGroup;
