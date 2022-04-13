import { FC, InputHTMLAttributes, useEffect, useState } from "react";
import clsx from "clsx";
import useId from "@bscop/use-id";

import classes from "./styles.module.scss";
import { ReactComponent as Mercoin } from "mercoin.svg";

interface Props {
  size?: "small" | "normal";
  defaultValue?: number;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

export const MercoinInput: FC<Props> = ({ size = "normal", inputProps }) => {
  const id = useId();
  const [value, setValue] = useState(inputProps?.value || 0);

  useEffect(() => setValue(inputProps?.value || 0), [inputProps?.value]);

  return (
    <div className={clsx(classes.container, size === "small" && classes.small)}>
      <input
        {...inputProps}
        id={id}
        type="number"
        onKeyUp={(e) => {
          if (e.key === "Enter") e.currentTarget.blur();
        }}
        onChange={(e) => {
          setValue(e.target.value || 0);
          if (inputProps?.onChange) inputProps.onChange(e);
        }}
      />
      <label htmlFor={id}>
        <div className={classes.value}>
          <p>{value}</p>
          <Mercoin className={classes.icon} />
        </div>
      </label>
    </div>
  );
};
