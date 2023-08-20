import { HttpException } from '@nestjs/common';

export abstract class CustomHttpException extends HttpException {
  parameters: unknown;
  constructor(message, status: number, parameters?: unknown) {
    super(message, status);
    this.parameters = parameters;
  }

  abstract printError(): unknown;

  abstract serializeErrors(): { message: string; field?: string }[];
}
