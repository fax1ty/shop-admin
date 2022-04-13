import useId from "@bscop/use-id";
import { FC, InputHTMLAttributes } from "react";

import classes from "./styles.module.scss";

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Switch: FC<Props> = (props) => {
  const id = useId();

  return (
    <div className={classes.container}>
      <input id={id} type="checkbox" {...props} />
      <label htmlFor={id}>
        <div className={classes.handle} />
      </label>
    </div>
  );
};
