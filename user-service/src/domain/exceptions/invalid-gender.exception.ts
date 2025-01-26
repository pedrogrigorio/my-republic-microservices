export class InvalidGenderException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidGenreException';
  }
}
