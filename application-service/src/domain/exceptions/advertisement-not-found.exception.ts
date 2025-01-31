export class AdvertisementNotFoundException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AdvertisementNotFoundException';
  }
}
