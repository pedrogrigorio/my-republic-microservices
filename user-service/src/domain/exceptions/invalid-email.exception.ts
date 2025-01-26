export class InvalidEmailException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidEmailException';
  }
}
