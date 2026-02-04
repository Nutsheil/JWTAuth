import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationErrorResponse } from './interfaces/validation-error.interface';

export class ValidationException extends HttpException {
  public readonly messages: string[];

  constructor(messages: string[]) {
    const response: ValidationErrorResponse = { messages };
    super(response, HttpStatus.BAD_REQUEST);
    this.messages = messages;
  }
}
