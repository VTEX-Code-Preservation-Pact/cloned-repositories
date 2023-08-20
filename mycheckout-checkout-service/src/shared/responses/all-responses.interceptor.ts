import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GeneralResponse } from './general-response';

export class AllResponsesInterceptor implements NestInterceptor {
  constructor(@Inject(I18nService) private readonly _i18n: I18nService) {}

  async intercept(
    _context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    return await next.handle().pipe(
      map(async (result) => {
        if (result instanceof GeneralResponse) {
          result.message = await this._i18n.translate(result.message);
          if (!result.data) delete result.data;
        }
        return result;
      }),
    );
  }
}
