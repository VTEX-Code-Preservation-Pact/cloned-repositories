export class PaginationResponse<T> {
  constructor(o: PaginationResponse<T>) {
    Object.assign(this, o);
  }

  count: number;
  total: number;
  current: number;
  prev: number;
  next: number;

  data: T[];
}
