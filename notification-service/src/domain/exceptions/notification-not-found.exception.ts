export class NotificationNotFoundException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotificationNotFoundException';
  }
}
