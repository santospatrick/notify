import { EmailProviders } from '@/contracts/EmailProviders'
import {
  NotificationSendParams,
  NotificationService,
} from '@/contracts/NotificationService'
import sendgridMail from '@sendgrid/mail'
import { MissingApiKeyError } from '@/application/errors/MissingApiKeyError'
import { SendgridError } from '@/application/errors/SendgridError'

interface SendgridServiceProps {
  apiKey: string
}

export class SendgridService implements NotificationService {
  private client: typeof sendgridMail

  constructor({ apiKey }: SendgridServiceProps) {
    if (!apiKey) {
      throw new MissingApiKeyError(EmailProviders.SENDGRID)
    }
    sendgridMail.setApiKey(apiKey)
    this.client = sendgridMail
  }

  async send(params: NotificationSendParams): Promise<void> {
    const { from, to, subject, html } = params

    try {
      await this.client.send({
        from,
        to,
        subject,
        html,
      })
    } catch (error) {
      throw new SendgridError(
        params,
        error instanceof Error ? error : undefined,
      )
    }
  }
}
