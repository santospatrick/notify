import { vi, describe, it, beforeEach, expect, MockedFunction } from 'vitest'
import sendgridMail from '@sendgrid/mail'
import { SendgridService } from '../../src/application/services/SendgridService'
import { NotificationSendParams } from '../../src/contracts/NotificationService'
import { MissingApiKeyError } from '../../src/application/errors/MissingApiKeyError'

vi.mock('@sendgrid/mail', () => ({
  default: {
    setApiKey: vi.fn(),
    send: vi.fn().mockResolvedValue({}),
  },
}))

describe('SendgridService', () => {
  let service: SendgridService
  let sendMock: MockedFunction<typeof sendgridMail.send>

  beforeEach(() => {
    service = new SendgridService({
      apiKey: 'test-api-key',
    })
    sendMock = sendgridMail.send as MockedFunction<typeof sendgridMail.send>
  })

  it('should initialize and set the API key', () => {
    expect(sendgridMail.setApiKey).toHaveBeenCalledWith('test-api-key')
  })

  it('should send an email with correct parameters', async () => {
    const params: NotificationSendParams = {
      from: 'sender@example.com',
      to: 'recipient@example.com',
      subject: 'Test Email',
      html: '<p>This is a test email.</p>',
    }

    await service.send(params)

    expect(sendgridMail.send).toHaveBeenCalledWith({
      from: 'sender@example.com',
      to: 'recipient@example.com',
      subject: 'Test Email',
      html: '<p>This is a test email.</p>',
    })
  })

  it('should throw an error if apiKey is missing during initialization', () => {
    expect(() => new SendgridService({ apiKey: '' })).toThrowError(
      MissingApiKeyError,
    )
  })

  it('should throw an error if send fails', async () => {
    const errorMessage = 'Failed to send email'
    sendMock.mockRejectedValueOnce(new Error(errorMessage))

    const params: NotificationSendParams = {
      from: 'sender@example.com',
      to: 'recipient@example.com',
      subject: 'Test Email',
      html: '<p>This is a test email.</p>',
    }

    await expect(service.send(params)).rejects.toThrowError(
      `SendgridService failed while sending email from sender@example.com to recipient@example.com. Error: ${errorMessage}`,
    )
  })

  it('should throw an unknown error if an unknown error is thrown', async () => {
    const unknownError = 'Error that could not be identified'
    sendMock.mockRejectedValueOnce(unknownError)

    const params: NotificationSendParams = {
      from: 'sender@example.com',
      to: 'recipient@example.com',
      subject: 'Test Email',
      html: '<p>This is a test email.</p>',
    }

    await expect(service.send(params)).rejects.toThrowError(
      `SendgridService failed while sending email from sender@example.com to recipient@example.com. Error: Unknown error`,
    )
  })
})
