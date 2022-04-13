import { Button } from "components/button";
import { Search } from "components/search";
import { ArrowSquareIn, Export, Pencil } from "phosphor-react";
import { EditableCellProps, Table } from "components/table";
import { useMemo, useState } from "react";
import { Column } from "react-table";
import { Select } from "components/select";
import { IUser } from "app";

import classes from "./styles.module.scss";

export const UsersScreen = () => {
  const [search, setSearch] = useState("");
  const [selectionCount] = useState(0);

  const data = useMemo<Array<IUser>>(
    () => [
      {
        name: "Иван Иванов",
        email: "ivan.ivanov@mercurydevelopment.com",
        role: "Пользователь",
      },
      {
        name: "Иван Неиванов",
        email: "ivan.neivanov@mercurydevelopment.com",
        role: "Пользователь",
      },
      {
        name: "Иван Орлов",
        email: "ivan.orlov@mercurydevelopment.com",
        role: "Пользователь",
      },
      {
        name: "Иван Дроздов",
        email: "ivan.drozdov@mercurydevelopment.com",
        role: "Пользователь",
      },
      {
        name: "Иван Птицев",
        email: "ivan.ptisev@mercurydevelopment.com",
        role: "Пользователь",
      },
    ],
    []
  );
  const columns = useMemo<Array<Column<IUser>>>(
    () => [
      {
        Header: "Пользователь",
        accessor: "name",
      },
      {
        Header: "Почта",
        accessor: "email",
      },
      {
        Header: "Роль",
        accessor: "role",
        Cell: ({ value }: EditableCellProps) => (
          <Select
            isSearchable={false}
            placeholder="Роль"
            defaultValue={{ value: value, label: value }}
            onChange={(v) => console.log(v)}
            options={["Пользователь", "Управленец", "Админ", "Супер-админ"].map(
              (v) => ({
                label: v,
                value: v,
              })
            )}
          />
        ),
      },
    ],
    []
  );

  return (
    <>
      <header>
        <h1>Меркдевы</h1>
      </header>

      <div className={classes.heading}>
        <h2>1 позиций</h2>

        <div className={classes.toolbar}>
          <Button icon={ArrowSquareIn} variety="brief">
            Импортировать данные
          </Button>
          <Button icon={Export} variety="brief">
            Экспортировать данные
          </Button>
          {selectionCount > 0 && (
            <Button icon={Pencil} variety="brief">
              Массовое редактирование
            </Button>
          )}
          <Search
            setSearch={setSearch}
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            placeholder="Введите имя или почту..."
          />
        </div>
      </div>

      <Table
        className={classes.table}
        data={data}
        columns={columns}
        search={search}
      />
    </>
  );
};
