import { describe, it, expect } from 'vitest'
import { NotificationManager, EmailProviders } from '../../src/index'

describe('index.ts', () => {
  it('should export NotificationManager', () => {
    expect(NotificationManager).toBeDefined()
  })

  it('should export EmailProviders', () => {
    expect(EmailProviders).toBeDefined()
  })
})
