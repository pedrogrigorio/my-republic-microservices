import { Observable } from 'rxjs';

export interface NotificationService {
  getAllNotifications(data: { userId: number }): Observable<any>;
  getUnreadCount(data: { userId: number }): Observable<any>;
  getNotificationById(data: { id: number }): Observable<any>;
  markAsRead(data: { id: number }): Observable<any>;
  markAllAsRead(data: { userId: number }): Observable<any>;
}
