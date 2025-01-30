export class AdvertisementPausedException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AdvertisementPausedException';
  }
}
