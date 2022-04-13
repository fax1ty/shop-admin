import clsx from "clsx";
import { Button } from "components/button";
import { Search } from "components/search";
import { AddItemModal } from "modals/add-item";
import {
  ArrowSquareIn,
  CirclesThreePlus,
  Export,
  Pencil,
  Trash,
} from "phosphor-react";
import {
  createElement,
  FC,
  HTMLAttributes,
  ReactNode,
  useMemo,
  useState,
} from "react";
import { Clamped } from "react-clamped";

import classes from "./styles.module.scss";

type ItemProps = {
  image?: ReactNode;
  text: string;
  icons: Array<FC>;
} & HTMLAttributes<HTMLDivElement>;

const Item: FC<ItemProps> = ({ image, text, icons, ...props }) => {
  return (
    <div {...props} className={clsx(classes.item, props.className)}>
      {image}
      <Clamped clamp={2} className={classes.text}>
        {text}
      </Clamped>
      <div className={classes.icons}>
        {icons.map((icon, i) => createElement(icon, { key: `icon-${i}` }))}
      </div>
    </div>
  );
};

export const ItemsScreen = () => {
  const items = useMemo(
    () => [
      { image: <img alt="" />, title: "Маска Анонимуса" },
      {
        image: <img alt="" />,
        title: "Маска самого длинного названия в мире",
      },
      { image: <img alt="" />, title: "Маска Анонимуса" },
      { image: <img alt="" />, title: "Маска Анонимуса" },
      { image: <img alt="" />, title: "Маска Анонимуса" },
      { image: <img alt="" />, title: "Маска Анонимуса" },
      { image: <img alt="" />, title: "Маска Анонимуса" },
    ],
    []
  );

  const [isModalVisible, setModalVisisble] = useState(false);
  const [search, setSearch] = useState("");

  const visibleItems = useMemo(
    () =>
      items.filter((item) =>
        item.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      ),
    [search, items]
  );

  const toggleModal = () => setModalVisisble((old) => !old);

  return (
    <>
      <header>
        <h1>Товары</h1>
      </header>

      <div className={classes.heading}>
        <h2>{items.length} позиций</h2>

        <div className={classes.toolbar}>
          <Button icon={ArrowSquareIn} variety="brief">
            Импортировать данные
          </Button>
          <Button icon={Export} variety="brief">
            Экспортировать данные
          </Button>
          <Search
            setSearch={setSearch}
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            placeholder="Поиск по товарам..."
          />
        </div>
      </div>

      <div className={classes.items}>
        {visibleItems.map(({ title }, i) => (
          <Item key={`item-${i}`} text={title} icons={[Pencil, Trash]} />
        ))}
        <Item
          text="Добавить новый товар"
          icons={[CirclesThreePlus]}
          className={classes.add}
          onClick={toggleModal}
        />

        {isModalVisible && <AddItemModal onClose={toggleModal} />}
      </div>
    </>
  );
};
