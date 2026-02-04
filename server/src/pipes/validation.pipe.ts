import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { ValidationException } from 'src/exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform<T>(value: T, metadata: ArgumentMetadata): Promise<T> {
    const { metatype } = metadata;

    if (!metatype) {
      return value;
    }

    const obj = plainToInstance(metatype, value);
    const errors = await validate(obj);

    if (errors.length) {
      const messages = this.formatErrors(errors);
      throw new ValidationException(messages);
    }
    return value;
  }

  private formatErrors(errors: ValidationError[]): string[] {
    return errors.flatMap((item) =>
      item.constraints
        ? Object.values(item.constraints).map((message) => `${item.property} - ${message as string}`)
        : [],
    );
  }
}
