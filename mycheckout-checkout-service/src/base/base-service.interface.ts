import { PaginationDto } from './paginator/dto/pagination.dto';
import { PaginationResponse } from './paginator';
import { GeneralResponse } from '../shared/responses/general-response';

export interface IBaseService<T> {
  get(query: string): Promise<T>;
  getAll(paginationDto?: PaginationDto): Promise<PaginationResponse<T>>;
  getAllByQuery(query: string): Promise<any>;
  create(data: T): Promise<T>;
  update(query: string, data: Partial<T>, user?: any): Promise<GeneralResponse>;
  delete(query: string, user?: any): Promise<GeneralResponse>;
}
