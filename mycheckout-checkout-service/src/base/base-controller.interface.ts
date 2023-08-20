import { PaginationDto } from './paginator/dto/pagination.dto';
import { PaginationResponse } from './paginator';
import { GeneralResponse } from '../shared/responses/general-response';

export interface IBaseController<T> {
  get(query: any): Promise<T>;
  getAll(paginationDto?: PaginationDto): Promise<PaginationResponse<T>>;
  create(data: T): Promise<T>;
  update(query: any, data: Partial<T>): Promise<GeneralResponse>;
  delete(query: any): Promise<GeneralResponse>;
}
