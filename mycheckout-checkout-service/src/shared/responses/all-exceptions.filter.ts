import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { CustomHttpException } from '../exceptions/custom-http-exception';
import { ApiError } from './api-error';
import { OldException } from './old-exceptions';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);
  constructor(private readonly _i18n: I18nService) {}

  async catch(exception: unknown, host: ArgumentsHost) {
    let status, message: any, trace: unknown;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (exception instanceof OldException) {
      status = exception.getStatus();
      message = exception.getResponse();
      message = await this.i18n_traslate(message.message);
    } else if (exception instanceof CustomHttpException) {
      status = exception.getStatus();
      message = await Promise.all(
        exception.serializeErrors().map(async (err) => ({
          ...err,
          message: await this.i18n_translate(err.message),
        })),
      );
      trace = {
        stack: exception.stack,
        message: exception.message,
        data: exception.printError(),
        arguments: exception.parameters,
      };
      exception.printError();
    } else if (exception instanceof Error) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = String('An error occurred on the server');
      trace = {
        stack: exception.stack,
        message: exception.message,
      };
    }

    if (![404, 428].includes(status)) {
      this.logger.error({
        error: message,
        trace,
        path: request.url,
      });
    }

    if (request.headers.debug) {
      response.status(status).json({
        error: message,
        trace,
        path: request.url,
      });
    } else {
      response.status(status).json({
        error: message,
        path: request.url,
      });
    }
  }

  private i18n_translate(text: string) {
    return this._i18n.translate(text);
  }

  private async i18n_traslate(response: any): Promise<any> {
    if (typeof response == 'string') return response;
    if (response instanceof ApiError) {
      return Promise.all(
        response.map(async (err) => {
          return this._i18n.translate(err.message, { args: err.args });
        }),
      )
        .then((resp) => {
          return resp.join(', ');
        })
        .catch(() => {
          return response;
        });
    } else return response.error ? response.error : response;
  }
}
