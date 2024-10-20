export interface NotificationService {
  send(params: { title: string; message: string }): Promise<void>
}
