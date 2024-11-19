import { HttpStatus } from '@nestjs/common';

export class ResponseData<T> {
  data: T;
  message?: string;
  statusCode: HttpStatus;
  error?: string;
  status: boolean;
}
