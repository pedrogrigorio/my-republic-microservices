import { ValidationError } from 'class-validator';

export function buildErrorMessage(errors: ValidationError[]): string[] {
  return errors
    .map((err) => Object.values(err.constraints))
    .reduce((acc, curr) => acc.concat(curr), []);
}
