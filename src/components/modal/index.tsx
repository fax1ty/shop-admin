import { FC, useEffect } from "react";
import { Portal } from "react-portal";

import classes from "./styles.module.scss";

interface Props {
  onClose?: () => void;
}

export const Modal: FC<Props> = ({ children, onClose }) => {
  useEffect(() => {
    document.body.style.userSelect = "none";
    return () => {
      document.body.style.userSelect = "unset";
    };
  }, []);

  useEffect(() => {
    const listener = ({ key }: KeyboardEvent) => {
      if (key === "Escape" && onClose) onClose();
    };
    document.addEventListener("keyup", listener);
    return () => {
      document.removeEventListener("keyup", listener);
    };
  }, [onClose]);

  return (
    <Portal>
      <div className={classes.dim} onClick={onClose} />
      <div className={classes.container}>{children}</div>
    </Portal>
  );
};
