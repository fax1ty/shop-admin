import clsx from "clsx";
import { GearSix, ShoppingBag, SignOut, Users, Wallet } from "phosphor-react";
import { createElement } from "react";
import { Link, useLocation } from "react-router-dom";

import classes from "./styles.module.scss";

export const Menu = () => {
  const location = useLocation();

  return (
    <div className={classes.container}>
      <Link to="/">
        <div className={classes.logo} />
      </Link>
      <div className={classes["pages-container"]}>
        <div className={classes.pages}>
          {[
            {
              l: "/items",
              i: ShoppingBag,
            },
            {
              l: "/coins",
              i: Wallet,
            },
            {
              l: "/users",
              i: Users,
            },
            {
              l: "/settings",
              i: GearSix,
            },
          ].map(({ l, i }) => (
            <Link key={l.replaceAll("/", "")} to={l}>
              {createElement(i, {
                className: clsx(
                  classes.icon,
                  location.pathname === l && classes.active
                ),
                weight: "fill",
              })}
            </Link>
          ))}
        </div>
      </div>
      <SignOut className={clsx(classes.icon, classes.logout)} weight="fill" />
    </div>
  );
};
