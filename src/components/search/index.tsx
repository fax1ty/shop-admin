import clsx from "clsx";
import { MagnifyingGlass, X } from "phosphor-react";
import { FC, InputHTMLAttributes, useRef } from "react";

import classes from "./styles.module.scss";

export const Search: FC<
  InputHTMLAttributes<HTMLInputElement> & {
    setSearch: (v: string) => void;
  }
> = ({ setSearch, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={classes.container}>
      <input ref={inputRef} type="text" {...props} />
      {inputRef.current?.value ? (
        <X
          className={clsx(classes.icon, classes.clear)}
          onClick={() => {
            if (inputRef && inputRef.current) {
              inputRef.current.value = "";
              setSearch("");
            }
          }}
        />
      ) : (
        <MagnifyingGlass className={classes.icon} />
      )}
    </div>
  );
};
