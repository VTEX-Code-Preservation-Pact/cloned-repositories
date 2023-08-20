import { Repository } from 'typeorm';
import { ApiResponse } from '../../shared/responses/api-response';
import { PaginationResponse } from './pagination-response';

export class PaginationService<T> {
  paginate(
    limit: number,
    page: number,
    query: Object,
    genericRepository: Repository<T>,
  ): Promise<PaginationResponse<T>> {
    try {
      return new Promise<PaginationResponse<T>>((resolve, reject) => {
        genericRepository
          .findAndCount({
            where: query,
            take: limit,
            skip: (page - 1) * limit,
          })
          .then((response) => {
            try {
              const paginationResponse = new PaginationResponse<T>({
                total: response[1],
                current: page,
                next: this.nextPage(page, limit, response[1]),
                prev: this.prevPage(page),
                count: response[0].length,
                data: response[0],
              });

              resolve(paginationResponse);
            } catch {
              reject(ApiResponse.error('errors.bad_gateway'));
            }
          })
          .catch(() => reject(ApiResponse.error('errors.bad_gateway')));
      });
    } catch {
      throw ApiResponse.error('errors.bad_gateway');
    }
  }

  private nextPage(current: number, limit: number, total: number): number {
    return limit * current >= total ? current : current + 1;
  }

  private prevPage(current: number): number {
    return current == 1 ? current : current - 1;
  }
}
