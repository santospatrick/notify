interface SendgridErrorParams {
  from: string
  to: string
  subject: string
  html: string
}

export class SendgridError extends Error {
  constructor(
    public params: SendgridErrorParams,
    originalError?: Error,
  ) {
    const message = `SendgridService failed while sending email from ${params.from} to ${params.to}. Error: ${originalError?.message || 'Unknown error'}`
    super(message)

    if (originalError?.stack) {
      this.stack = `${this.stack}\nCaused by: ${originalError.stack}`
    }
  }
}
