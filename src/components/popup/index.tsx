import { Modal } from "components/modal";
import { FC } from "react";

import classes from "./styles.module.scss";

interface Props {
  onClose: () => void;
  onSubmit: () => void;
  buttons: Array<JSX.Element>;
}

export const Popup: FC<Props> = ({ onClose, onSubmit, children, buttons }) => {
  return (
    <Modal onClose={onClose}>
      <form onSubmit={onSubmit} className={classes.container}>
        {children}
        <div className={classes.buttons}>{buttons}</div>
      </form>
    </Modal>
  );
};
