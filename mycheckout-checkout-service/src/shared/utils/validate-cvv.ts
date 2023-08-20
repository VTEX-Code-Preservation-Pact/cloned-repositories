import { ApiResponse } from '../responses';

export async function ValidateCVV(cvv: string, service: any): Promise<any> {
  try {
    return true;
  } catch {
    throw ApiResponse.error('errors.invalid_cvv');
  }
}
