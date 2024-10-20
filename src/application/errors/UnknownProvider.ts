export class UnknownProvider extends Error {
  constructor(type: string, provider: string) {
    super(`Unknown "${type}" provider: "${provider}"`)
  }
}
