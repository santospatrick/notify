export interface NotificationSendParams {
  from: string
  to: string
  subject: string
  html: string
}

export interface NotificationService {
  send(params: NotificationSendParams): Promise<void>
}
