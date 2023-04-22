export interface PaginationObj {
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
  nextPage: number;
  perPage: number;
  previousPage: number;
  remainingCount: number;
  total: number;
  totalPages: number;
}
export interface DataWithPagination<T> extends Pagination {
  data: T;
}
