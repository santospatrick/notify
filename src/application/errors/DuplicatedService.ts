export class DuplicatedService extends Error {
  constructor(serviceName: string) {
    super(`Service "${serviceName}" already exists`)
  }
}
