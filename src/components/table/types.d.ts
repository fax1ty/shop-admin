import { TableInstance } from "react-table";

export interface TableInstanceWithSelection {
  selectedFlatRows: Array<T>;
}

export interface TableInstanceWithFilter {
  setGlobalFilter: (v: string | null) => void;
}

export interface TableInstanceWithPagination {
  canPreviousPage: boolean;
  canNextPage: boolean;
  page: TableInstance<T>["rows"];
  pageSize: number;
  state: { pageIndex: number };
  initialState: { pageSize: number };
  nextPage: () => void;
  previousPage: () => void;
  pageSize: number;
  gotoPage: (v: number) => void;
  setPageSize: (v: number) => void;
}

export interface TableOptionsWithSelection {
  onEdit?: (index: number, id: number, value: T) => void;
}
