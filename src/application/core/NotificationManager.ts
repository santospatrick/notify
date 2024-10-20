import { EmailProviders } from '@/contracts/EmailProviders'
import {
  NotificationSendParams,
  NotificationService,
} from '@/contracts/NotificationService'
import { SendgridService } from '@/application/services/SendgridService'
import { EmptyServices } from '../errors/EmptyServices'
import { DuplicatedService } from '../errors/DuplicatedService'
import { UnknownProvider } from '../errors/UnknownProvider'

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
          throw new DuplicatedService('SendgridService')
        }
        this.services.push(new SendgridService({ apiKey }))
        break
      default:
        throw new UnknownProvider('email', provider)
    }
  }

  async send(params: NotificationSendParams) {
    if (!this.services.length) {
      throw new EmptyServices()
    }

    await Promise.all(
      this.services.map(async (service) => {
        await service.send(params).catch((error) => {
          throw new Error(error.message)
        })
      }),
    )
  }
}

export { NotificationManager }
