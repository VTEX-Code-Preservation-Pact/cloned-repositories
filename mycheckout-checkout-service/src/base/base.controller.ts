import {
  Get,
  Post,
  Delete,
  Put,
  Body,
  Query,
  Controller,
  Param,
  Inject,
} from '@nestjs/common';
import { Type } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { IBaseService } from './base-service.interface';
import { BaseEntity } from './base.entity';
import { PaginationDto } from './paginator/dto/pagination.dto';
import { PaginationResponse } from './paginator';
import { GeneralResponse } from '../shared/responses/general-response';
import { ExtendTypes } from './base-inheritance/extends-types.enum';
import { DecoratorExtendTypeSelector } from './base-inheritance/decorators-extends';
import { ExtendTypeSelector } from './base-inheritance/extend-type-selector';
import { BaseOptionsA, BaseOptionsB } from './base-options.interface';
import { DecoratorAssing } from './base-inheritance/decorators-assing';
import { IBaseController } from './base-controller.interface';

export function BaseController<
  T extends BaseEntity,
  K extends keyof IBaseService<T>,
>(
  Entity: Type<T>,
  _options?: BaseOptionsA<K, Type<T>> | BaseOptionsB<K, Type<T>>,
) {
  const options: any = _options;
  const type = options?.omit
    ? ExtendTypes.omit
    : options?.pick
    ? ExtendTypes.pick
    : null;
  const methods = options?.omit ? options.omit : options?.pick;
  const decorators = options?.decorators;
  const ValidateDecorator = DecoratorExtendTypeSelector(type);
  const ExtendType = ExtendTypeSelector(type);
  const PartialEntity = options?.partialEntity ? options.partialEntity : Entity;

  @Controller()
  abstract class BaseController implements IBaseController<T> {
    constructor(
      @Inject(REQUEST) protected readonly request: any,
      private readonly IBaseService: IBaseService<T>,
    ) {}
    update(query: any, data: Partial<T>): Promise<GeneralResponse> {
      throw new Error('Method not implemented.');
    }

    @ValidateDecorator(Get(`/:id`), methods, 'get')
    @DecoratorAssing(decorators, 'get')
    async get(@Param('id') id: string): Promise<T> {
      return this.IBaseService.get(id);
    }

    @ValidateDecorator(Get(), methods, 'getAll')
    @DecoratorAssing(decorators, 'getAll')
    async getAll(
      @Query() paginationDto: PaginationDto,
    ): Promise<PaginationResponse<T>> {
      return this.IBaseService.getAll(paginationDto);
    }

    @ValidateDecorator(Post(), methods, 'create')
    @DecoratorAssing(decorators, 'create')
    //@ts-ignore
    async create(@Body() entity: Entity): Promise<T> {
      // TODO: Remove it, when it is implemented in the front
      const data = entity;
      if (data.email) {
        data.email = data.email.toLowerCase();
      }

      return this.IBaseService.create(data);
    }

    @ValidateDecorator(Delete(`/:id`), methods, 'delete')
    @DecoratorAssing(decorators, 'delete')
    async delete(@Param('id') id: string): Promise<GeneralResponse> {
      return this.IBaseService.delete(id, this.request.user);
    }

    /*@ValidateDecorator(Put(), methods, 'update')
    @DecoratorAssing(decorators, 'update')
    async update(
      @Body() entity: PartialEntity,
      @Body('id') id: string,
    ): Promise<GeneralResponse> {
      return this.IBaseService.update(id, entity, this.request.user);
    }*/
  }
  const controller = ExtendType(BaseController, methods);
  return <Type<typeof controller>>controller;
}
