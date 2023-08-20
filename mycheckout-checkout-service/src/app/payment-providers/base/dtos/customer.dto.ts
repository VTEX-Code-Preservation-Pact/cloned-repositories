export class CustomerDto {
  constructor(o: CustomerDto) {
    Object.assign(this, o);
  }

  email: string;
  id: any;
  documentType?: string;
  documentNumber?: string;
}
