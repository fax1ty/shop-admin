import clsx from "clsx";
import { ButtonHTMLAttributes, createElement, FC } from "react";

import classes from "./styles.module.scss";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variety?: "full" | "brief";
  icon?: FC<any>;
  iconPosition?: "left" | "right";
  children: string;
  priority?: "normal" | "lead";
  size?: "normal" | "big";
};

export const Button: FC<Props> = ({
  children,
  icon,
  variety = "full",
  priority = "normal",
  size = "normal",
  iconPosition = "right",
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx(
        classes.container,
        variety === "brief" && classes.brief,
        priority === "lead" && classes.lead,
        size === "big" && classes.big,
        iconPosition === "left" && classes["icon-left"],
        props.className
      )}
    >
      <span className={classes.text}>{children}</span>
      {icon && createElement(icon, { className: classes.icon })}
    </button>
  );
};
