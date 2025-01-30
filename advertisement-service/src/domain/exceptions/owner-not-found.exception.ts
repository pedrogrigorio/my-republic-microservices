export class OwnerNotFoundException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OwnerNotFoundException';
  }
}
