export interface PaginateData<T> {
  total: number;
  perPage: number;
  data: T;
  nextPage: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
  currentPage: number;
  remainingCount: number;
}
