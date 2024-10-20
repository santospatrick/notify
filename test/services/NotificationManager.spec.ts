import { describe, expect, it, MockedFunction, vi } from 'vitest'
import sendgridMail from '@sendgrid/mail'
import { NotificationManager } from '../../src/application/core/NotificationManager'
import { SAMPLE_EMAIL } from '../fixtures/email'
import { EmptyServices } from '../../src/application/errors/EmptyServices'
import { EmailProviders } from '../../src/contracts/EmailProviders'
import { DuplicatedService } from '../../src/application/errors/DuplicatedService'
import { UnknownProvider } from '../../src/application/errors/UnknownProvider'
import { SendgridError } from '../../src/application/errors/SendgridError'

vi.mock('@sendgrid/mail', () => ({
  default: {
    setApiKey: vi.fn(),
    send: vi.fn().mockResolvedValue({}),
  },
}))

describe('NotificationManager', () => {
  it('should throw error if "send" is called without providers added', async () => {
    const notificationManager = new NotificationManager()
    await expect(notificationManager.send(SAMPLE_EMAIL)).rejects.toThrow(
      EmptyServices,
    )
  })

  it('should send an email with SendgridService', async () => {
    const notificationManager = new NotificationManager()

    notificationManager.addEmailService({
      provider: EmailProviders.SENDGRID,
      apiKey: 'test-api-key',
    })

    await notificationManager.send(SAMPLE_EMAIL)

    expect(sendgridMail.send).toHaveBeenCalledWith(SAMPLE_EMAIL)
  })

  it('should throw error if a service is added twice', () => {
    const notificationManager = new NotificationManager()

    notificationManager.addEmailService({
      provider: EmailProviders.SENDGRID,
      apiKey: 'test-api-key',
    })

    expect(() =>
      notificationManager.addEmailService({
        provider: EmailProviders.SENDGRID,
        apiKey: 'test-api-key',
      }),
    ).toThrow(DuplicatedService)
  })

  it('should throw error if an unknown provider is added', () => {
    const notificationManager = new NotificationManager()

    expect(() =>
      notificationManager.addEmailService({
        provider: 'unknown',
        apiKey: 'test-api-key',
      }),
    ).toThrow(UnknownProvider)
  })

  it('should throw an error if a service fails to send an email', async () => {
    const notificationManager = new NotificationManager()
    const sendMock = sendgridMail.send as MockedFunction<
      typeof sendgridMail.send
    >

    sendMock.mockRejectedValue(new Error('Service failed'))

    notificationManager.addEmailService({
      provider: EmailProviders.SENDGRID,
      apiKey: 'test-api-key',
    })

    await expect(notificationManager.send(SAMPLE_EMAIL)).rejects.toThrow(
      new SendgridError(SAMPLE_EMAIL, new Error('Service failed')),
    )
  })
})
