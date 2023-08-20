import { HttpStatus } from '@nestjs/common';
import { CustomHttpException } from './custom-http-exception';

export class ForbiddenException extends CustomHttpException {
  constructor(public customMessage: string) {
    super('Forbidden resource(s)', HttpStatus.FORBIDDEN);
  }

  printError() {
    return null;
  }

  serializeErrors(): { message: string; field?: string }[] {
    return [
      {
        message: this.customMessage || this.message,
      },
    ];
  }
}
