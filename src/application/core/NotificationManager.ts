import { EmailProviders } from '@/contracts/EmailProviders'
import {
  NotificationSendParams,
  NotificationService,
} from '@/contracts/NotificationService'
import { SendgridService } from '@/application/services/SendgridService'

interface EmailServiceProps {
  provider: EmailProviders
  apiKey: string
}

class NotificationManager {
  private services: NotificationService[] = []

  addEmailService({ provider, apiKey }: EmailServiceProps) {
    switch (provider) {
      case EmailProviders.SENDGRID:
        if (
          this.services.some((service) => service instanceof SendgridService)
        ) {
          throw new Error('SendgridService is already added')
        }
        this.services.push(new SendgridService({ apiKey }))
        break
      default:
        throw new Error('Unknown email provider')
    }
  }

  async send(params: NotificationSendParams) {
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
