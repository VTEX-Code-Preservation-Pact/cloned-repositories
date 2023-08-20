import { HttpStatus } from '@nestjs/common';
import { CustomHttpException } from './custom-http-exception';

export class GatewayException extends CustomHttpException {
  constructor(
    public message: string,
    public trace: unknown,
    parameters?: unknown,
  ) {
    super(message, HttpStatus.BAD_GATEWAY, parameters);
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
