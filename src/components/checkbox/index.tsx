import useId from "@bscop/use-id";
import { Check, Minus } from "phosphor-react";
import { FC, InputHTMLAttributes, useEffect, useRef } from "react";

import classes from "./styles.module.scss";

type Props = {
  indeterminate?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const Checkbox: FC<Props> = ({ indeterminate = false, ...props }) => {
  const ref = useRef<HTMLInputElement>(null);
  const id = useId();

  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <div className={classes.container}>
      <input id={id} type="checkbox" ref={ref} {...props} />
      <label htmlFor={id}>
        <div>
          {props.checked && <Check className={classes.icon} weight="bold" />}
          {indeterminate && <Minus className={classes.icon} weight="bold" />}
        </div>
      </label>
    </div>
  );
};
