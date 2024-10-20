import { NotificationService } from '@/contracts/NotificationService'

export class SendgridService implements NotificationService {
  send(_params: { title: string; message: string }): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
