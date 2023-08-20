import { Repository } from 'typeorm';
import { HttpStatus } from '@nestjs/common';
import { IBaseService } from './base-service.interface';
import { BaseEntity } from './base.entity';
import { PaginationDto } from './paginator/dto/pagination.dto';
import { PaginationService } from './paginator';
import { ApiResponse } from '../shared/responses';

export class BaseService<T extends BaseEntity> implements IBaseService<T> {
  private readonly paginationService: PaginationService<T>;

  constructor(private readonly genericRepository: Repository<T>) {
    this.paginationService = new PaginationService<T>();
  }

  get(query: string): Promise<T> {
    try {
      return this.genericRepository.findOne(query);
    } catch {
      throw ApiResponse.error('errors.bad_gateway');
    }
  }

  getAll(paginationDto?: PaginationDto): Promise<any> {
    try {
      return this.paginate(paginationDto?.limit, paginationDto?.page);
    } catch {
      throw ApiResponse.error('errors.bad_gateway');
    }
  }

  create(data: any): Promise<any> {
    try {
      return new Promise<any>((resolve, reject) => {
        delete data.id;
        delete data._id;
        this.genericRepository
          .save(data)
          .then((created) => resolve(created))
          .catch(() => reject(ApiResponse.error('errors.internal_error')));
      });
    } catch {
      throw ApiResponse.error('errors.bad_gateway');
    }
  }

  update(query: string, data: any, user?: any): Promise<any> {
    try {
      return new Promise<any>((resolve, reject) => {
        this.genericRepository
          .findOneOrFail(query)
          .then((responseGet: any) => {
            try {
              if (user && user.email !== responseGet.email)
                reject(ApiResponse.error('errors.forbidden'));
              else {
                this.genericRepository
                  .update(responseGet.id, data)
                  .then(() => {
                    Object.assign(responseGet, data);
                    resolve(
                      ApiResponse.send(
                        'responses.resource_updated',
                        responseGet,
                      ),
                    );
                  })
                  .catch((e) => {
                    console.log(e);
                    reject(ApiResponse.error('errors.internal_error'));
                  });
              }
            } catch {
              reject(ApiResponse.error('errors.internal_error'));
            }
          })
          .catch(() =>
            reject(
              ApiResponse.error('errors.not_found', {}, HttpStatus.NOT_FOUND),
            ),
          );
      });
    } catch {
      throw ApiResponse.error('errors.bad_gateway');
    }
  }

  delete(query: string, user?: any): Promise<any> {
    try {
      return new Promise<any>((resolve, reject) => {
        this.genericRepository
          .findOneOrFail(query)
          .then((responseGet: any) => {
            try {
              if (user && user.email !== responseGet.email)
                reject(ApiResponse.error('errors.forbidden'));
              else {
                this.genericRepository
                  .delete(responseGet.id)
                  .then(() => {
                    resolve(
                      ApiResponse.send(
                        'responses.resource_deleted',
                        responseGet,
                      ),
                    );
                  })
                  .catch(() =>
                    reject(ApiResponse.error('errors.internal_error')),
                  );
              }
            } catch {
              reject(reject(ApiResponse.error('errors.internal_error')));
            }
          })
          .catch(() =>
            reject(
              ApiResponse.error('errors.not_found', {}, HttpStatus.NOT_FOUND),
            ),
          );
      });
    } catch {
      throw ApiResponse.error('errors.bad_gateway');
    }
  }

  createOrUpdate(query: string, data: any): Promise<any> {
    try {
      return this.update(query, data).catch(() => {
        return this.create(data).then((response) => {
          return ApiResponse.send(
            'responses.resource_created_updated',
            response,
          );
        });
      });
    } catch {
      throw ApiResponse.error('errors.bad_gateway');
    }
  }

  getAllByQuery(query: unknown): Promise<any> {
    try {
      return this.genericRepository.find(query);
    } catch {
      throw ApiResponse.error('errors.bad_gateway');
    }
  }

  paginate(limit = 10, page = 1, query?: unknown): Promise<any> {
    return this.paginationService.paginate(
      limit,
      page,
      query,
      this.genericRepository,
    );
  }
}
