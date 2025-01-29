export class CityNotFoundException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CityNotFoundException';
  }
}
