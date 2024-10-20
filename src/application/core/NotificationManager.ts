import { EmailProviders } from '@/contracts/EmailProviders'
import { NotificationService } from '@/contracts/NotificationService'
import { SendgridService } from '@/application/services/SendgridService'

class NotificationManager {
  private services: NotificationService[] = []

  addEmailService(service: EmailProviders) {
    switch (service) {
      case EmailProviders.SENDGRID:
        this.services.push(new SendgridService())
        break
      default:
        throw new Error('Unknown email provider')
    }
  }

  async send(params: { title: string; message: string }) {
    await Promise.all(
      this.services.map(async (service) => {
        await service.send(params).catch((error) => {
          throw new Error(
            `${service.constructor.name} failed: ${error.message}`,
          )
        })
      }),
    )
  }
}

export { NotificationManager }
