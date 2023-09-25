import { Message } from './message';

export type NotificationIcon = 'confirmation' | 'general' | 'connection' | 'removal' | 'subscription' | 'attention';

export interface INotification {
  type: Message;
  icon: NotificationIcon;
  title: string;
  message: string;
  date: string;
}
