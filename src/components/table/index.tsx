import clsx from "clsx";
import { Checkbox } from "components/checkbox";
import {
  ChangeEventHandler,
  TableHTMLAttributes,
  useEffect,
  useState,
} from "react";
import {
  Column,
  useRowSelect,
  useTable,
  useGlobalFilter,
  TableOptions,
  TableInstance,
  usePagination,
} from "react-table";
import {
  TableInstanceWithFilter,
  TableInstanceWithPagination,
  TableInstanceWithSelection,
  TableOptionsWithSelection,
} from "./types";
import { usePreviousImmediate } from "rooks";
import { Button } from "components/button";
import { Select } from "components/select";

import classes from "./styles.module.scss";

type Props<T extends object> = {
  pagination?: boolean;
  pageSize?: number;
  search?: string;
  data: readonly T[];
  columns: readonly Column<T>[];
  selectable?: boolean;
  editable?: boolean;
  onEdit?: (index: number, id: number, value: T) => void;
  onSelectionChange?: (rows: Array<T>) => void;
} & TableHTMLAttributes<HTMLTableElement>;

export interface EditableCellProps {
  value: string | number;
  row: { index: number };
  column: { id: number };
  onEdit?: (
    index: number,
    id: number,
    value: EditableCellProps["value"]
  ) => void;
}

function EditableCell({
  value: initialValue,
  row: { index },
  column: { id },
  onEdit,
}: EditableCellProps) {
  const [value, setValue] = useState(initialValue);
  const prevValue = usePreviousImmediate(value);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    if (onEdit && Boolean(prevValue !== value)) onEdit(index, id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      value={value}
      onKeyUp={(e) => {
        if (e.key === "Enter") e.currentTarget.blur();
      }}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}

export function Table<T extends object>({
  pagination,
  pageSize: defaultPageSize,
  search,
  data,
  columns,
  selectable = false,
  editable = false,
  onEdit,
  onSelectionChange,
  ...props
}: Props<T>) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    setGlobalFilter,
    page,
    state: { pageIndex },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    initialState: { pageSize = defaultPageSize },
    canNextPage,
    canPreviousPage,
    nextPage,
    previousPage,
    gotoPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      onEdit,
      defaultColumn: editable
        ? {
            Cell: EditableCell,
          }
        : undefined,
    } as TableOptions<T> & TableOptionsWithSelection,
    useGlobalFilter,
    usePagination,
    useRowSelect,
    (hooks) =>
      hooks.visibleColumns.push((columns) =>
        selectable
          ? [
              {
                id: "selection",
                Header: ({
                  getToggleAllRowsSelectedProps,
                }: {
                  getToggleAllRowsSelectedProps: any;
                }) => <Checkbox {...getToggleAllRowsSelectedProps()} />,
                Cell: ({ row }: { row: any }) => (
                  <Checkbox {...row.getToggleRowSelectedProps()} />
                ),
              },
              ...columns,
            ]
          : columns
      )
  ) as TableInstance<T> &
    TableInstanceWithSelection &
    TableInstanceWithFilter &
    TableInstanceWithPagination;

  useEffect(() => {
    if (selectedFlatRows && onSelectionChange)
      onSelectionChange(selectedFlatRows);
  }, [selectedFlatRows, onSelectionChange]);

  useEffect(() => {
    if (setGlobalFilter) setGlobalFilter(search || null);
  }, [search, setGlobalFilter]);

  return (
    <>
      <table
        {...getTableProps()}
        {...props}
        className={clsx(
          props.className,
          classes.container,
          selectable && classes.selectable
        )}
      >
        <thead className={classes.head}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className={classes.row}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className={classes.cell}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className={classes.body}>
          {(pagination ? page : rows).map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className={classes.row}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} className={classes.cell}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className={classes.footer}>
        <div className={classes.pagination}>
          <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Предыдущая страница
          </Button>
          <input
            type="number"
            value={pageIndex}
            onChange={(e) => gotoPage(e.target.valueAsNumber || 0)}
          />
          <Button onClick={() => nextPage()} disabled={!canNextPage}>
            Следующая страница
          </Button>
        </div>

        <Select
          isSearchable={false}
          fullHeight
          placeholder="Позиций на страницу"
          fullWidth={false}
          defaultValue={{ label: "10 позиций", value: pageSize }}
          onChange={({ value }: any) => setPageSize(value)}
          options={[
            { label: "10 позиций", value: 10 },
            { label: "15 позиций", value: 15 },
            { label: "25 позиций", value: 20 },
            { label: "25 позиций", value: 25 },
          ]}
          styles={{
            singleValue: (provided) => ({ ...provided, fontSize: "14px" }),
            option: (provided) => ({ ...provided, fontSize: "14px" }),
          }}
        />
      </div>
    </>
  );
}
