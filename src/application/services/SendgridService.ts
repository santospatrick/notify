import {
  NotificationSendParams,
  NotificationService,
} from '@/contracts/NotificationService'
import sendgridMail from '@sendgrid/mail'

interface SendgridServiceProps {
  apiKey: string
}

export class SendgridService implements NotificationService {
  private client: typeof sendgridMail

  constructor({ apiKey }: SendgridServiceProps) {
    if (!apiKey) {
      throw new Error('SendgridService failed: Missing apiKey')
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
      if (error instanceof Error) {
        throw new Error(`SendgridService failed: ${error.message}`)
      } else {
        throw new Error('SendgridService failed: Unknown error')
      }
    }
  }
}
