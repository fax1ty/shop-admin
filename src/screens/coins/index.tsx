import { Button } from "components/button";
import { Search } from "components/search";
import { ArrowSquareIn, Export, Pencil } from "phosphor-react";
import { EditableCellProps, Table } from "components/table";
import { FC, useMemo, useState } from "react";
import { Column } from "react-table";
import { MercoinInput } from "components/mercoin-input";
import { usePreviousImmediate } from "rooks";
import { IUser } from "app";

import classes from "./styles.module.scss";

interface MercoinCellProps {
  onEdit: EditableCellProps["onEdit"];
  id: EditableCellProps["column"]["id"];
  index: EditableCellProps["row"]["index"];
  value: EditableCellProps["value"];
}

const MercoinCell: FC<MercoinCellProps> = ({
  onEdit,
  id,
  index,
  value: defaultValue,
}) => {
  const [value, setValue] = useState(defaultValue);
  const prevValue = usePreviousImmediate(value);

  return (
    <MercoinInput
      size="small"
      inputProps={{
        value,
        onChange: (e) => setValue(e.target.valueAsNumber || 0),
        onBlur: (e) => {
          if (onEdit && prevValue !== value)
            onEdit(index, id, e.target.valueAsNumber || 0);
        },
      }}
    />
  );
};

export const CoinsScreen = () => {
  const [search, setSearch] = useState("");
  const [selectionCount, setSelectionCount] = useState(0);

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
        name: "Иван Дроздов",
        email: "ivan.drozdov@mercurydevelopment.com",
        role: "Пользователь",
      },
      {
        name: "Иван Птицев",
        email: "ivan.ptisev@mercurydevelopment.com",
        role: "Пользователь",
      },
      {
        name: "Иван Орлов",
        email: "ivan.orlov@mercurydevelopment.com",
        role: "Пользователь",
      },
      {
        name: "Иван Птицев",
        email: "ivan.ptisev@mercurydevelopment.com",
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
        name: "Иван Орлов",
        email: "ivan.orlov@mercurydevelopment.com",
        role: "Пользователь",
      },
      {
        name: "Иван Дроздов",
        email: "ivan.drozdov@mercurydevelopment.com",
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
        Header: "Баланс",
        accessor: "balance",
        Cell: ({
          value,
          row: { index },
          column: { id },
          onEdit,
        }: EditableCellProps) => (
          <MercoinCell index={index} id={id} onEdit={onEdit} value={value} />
        ),
      },
    ],
    []
  );

  return (
    <>
      <header>
        <h1>Меркоины</h1>
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
        pagination
        selectable
        onSelectionChange={(rows) => {
          console.log(rows);
          setSelectionCount(rows.length);
        }}
        search={search}
        className={classes.table}
        data={data}
        columns={columns}
      />
    </>
  );
};
