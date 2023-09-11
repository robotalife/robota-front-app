import { HTMLAttributes } from 'react';
import classes from './Fieldset.module.scss';

interface FieldsetProps extends HTMLAttributes<HTMLFieldSetElement> {
  legend: string;
}

const Fieldset = ({ legend, children, ...props }: FieldsetProps) => {
  return (
    <fieldset {...props} className={`${classes.fieldset} ${props.className || ''} ${(!children && classes.empty) || ''} `}>
      <legend className={classes.legend}>{legend}</legend>
      {children}
    </fieldset>
  );
};

export default Fieldset;
