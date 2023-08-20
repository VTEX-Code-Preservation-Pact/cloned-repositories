export class GeneralResponse {
  constructor(message: string, data?: any) {
    Object.assign(this, {
      message: message,
      data: data ? data : null,
    });
  }

  message: string;

  data?: any;
}
