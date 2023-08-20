import { HttpStatus } from '@nestjs/common';
import { CustomHttpException } from './custom-http-exception';

export class NotFoundException extends CustomHttpException {
  constructor(public customMessage?: string) {
    super('Resource(s) not found', HttpStatus.NOT_FOUND);
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
