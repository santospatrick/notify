export class MissingApiKeyError extends Error {
  constructor(serviceName: string) {
    super(`Service failed: Missing API key for ${serviceName}`)
  }
}
