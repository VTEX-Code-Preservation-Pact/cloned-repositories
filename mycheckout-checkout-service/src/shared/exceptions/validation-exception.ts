import { HttpStatus } from '@nestjs/common';
import { CustomHttpException } from './custom-http-exception';

export class ValidationException extends CustomHttpException {
  constructor(
    public message: string,
    public trace: unknown,
    parameters?: unknown,
  ) {
    super(message, HttpStatus.BAD_REQUEST, parameters);
  }
  serializeErrors(): { message: string; field?: string }[] {
    return [
      {
        message: this.message,
      },
    ];
  }

  printError(): unknown {
    return this.trace;
  }
}
