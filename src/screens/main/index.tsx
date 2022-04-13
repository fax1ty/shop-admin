import { Coins, FadersHorizontal, Storefront, UserList } from "phosphor-react";
import { createElement, useMemo } from "react";
import { Link } from "react-router-dom";
import Twemoji from "react-twemoji";
import { cannots } from "./cannots";

import classes from "./styles.module.scss";

function randomItem<T>(items: Array<T>) {
  return items[Math.floor(Math.random() * items.length)];
}

export const MainScreen = () => {
  const cannot = useMemo(
    () =>
      [randomItem(cannots), randomItem(cannots), randomItem(cannots)].join(
        ", "
      ),
    []
  );

  return (
    <>
      <header>
        <div className={classes.heading}>
          <h1>Добро пожаловать</h1>
          <Twemoji options={{ className: classes.hand }}>👋</Twemoji>
        </div>

        <h2>
          Это админка магазина. Здесь Вы можете делать разные штуки.
          <br />
          Конечно, Вы не сможете {cannot}
        </h2>

        <h3>Но зато можно сделать следующее</h3>
      </header>

      <div className={classes.actions}>
        {[
          {
            t: "Товары",
            d: "Посмотреть, отредактировать или удалить товар",
            l: "/items",
            i: Storefront,
          },
          {
            t: "Меркоины",
            d: "Посмотреть, отредактировать или удалить товар",
            l: "/coins",
            i: Coins,
          },
          {
            t: "Пользователи",
            d: "Посмотреть, отредактировать или удалить товар",
            l: "/users",
            i: UserList,
          },
          {
            t: "Настройки",
            d: "Изменить дополнительные параметры, доступность магазина и т.д.",
            l: "/settings",
            i: FadersHorizontal,
          },
        ].map(({ t, d, l, i }) => (
          <Link key={l.replaceAll("/", "")} to={l}>
            <div className={classes.action}>
              {createElement(i, { className: classes.icon })}
              <div className={classes.description}>
                <h1>{t}</h1>
                <p>{d}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};
