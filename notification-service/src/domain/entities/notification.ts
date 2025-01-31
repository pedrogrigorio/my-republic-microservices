import { NotificationType } from '../enums/notification-type';

interface NotificationProps {
  recipientId: number;
  message: string;
  isRead?: boolean;
  type: NotificationType;
  createdAt?: Date;
}

export class Notification {
  private _id: number;
  private props: NotificationProps;

  constructor(props: NotificationProps, id?: number) {
    this._id = id;
    this.props = props;
  }

  public get id() {
    return this._id;
  }

  public get recipientId() {
    return this.props.recipientId;
  }

  public set recipientId(recipientId: number) {
    this.props.recipientId = recipientId;
  }

  public get message() {
    return this.props.message;
  }

  public set message(message: string) {
    this.props.message = message;
  }

  public get isRead() {
    return this.props.isRead;
  }

  public set isRead(isRead: boolean) {
    this.props.isRead = isRead;
  }

  public get type() {
    return this.props.type;
  }

  public set type(type: NotificationType) {
    this.props.type = type;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }
}
