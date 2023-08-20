import { HttpStatus } from '@nestjs/common';
import { ApiError } from './api-error';
import { GeneralResponse } from './general-response';
import { OldException } from './old-exceptions';

export class ApiResponse extends ApiError {
  static send(message: string, data?: unknown) {
    return new GeneralResponse(message, data);
  }

  static errorWithObject(
    message: string,
    data: Record<string, unknown> = {},
    args: Record<string, unknown> = {},
    status: HttpStatus = HttpStatus.BAD_REQUEST,
  ): OldException {
    return new OldException(
      OldException.createBody(
        new ApiError({ message: message, args: args, data }),
      ),
      status,
    );
  }

  static error(
    message: string,
    args: Record<string, unknown> = {},
    status: HttpStatus = HttpStatus.BAD_REQUEST,
  ): OldException {
    return new OldException(
      OldException.createBody(new ApiError({ message: message, args: args })),
      status,
    );
  }

  static multipleErrors(
    errors: ApiError,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
  ): OldException {
    const context = new this();
    errors.forEach((error) => {
      context.push({ message: error.message, args: error.args });
    });
    return new OldException(OldException.createBody(context), status);
  }
}
