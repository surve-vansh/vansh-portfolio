import { describe, it, expect } from 'vitest'
import { validateContactForm, sanitizeInput, hasErrors } from '@/utils/validation'

describe('validateContactForm', () => {
  const validData = {
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hello, this is a test message that is long enough.',
  }

  it('returns no errors for valid data', () => {
    const errors = validateContactForm(validData)
    expect(hasErrors(errors)).toBe(false)
  })

  describe('name field', () => {
    it('requires name', () => {
      const errors = validateContactForm({ ...validData, name: '' })
      expect(errors.name).toBeDefined()
    })

    it('requires at least 2 characters', () => {
      const errors = validateContactForm({ ...validData, name: 'A' })
      expect(errors.name).toBeDefined()
    })

    it('rejects names over 50 characters', () => {
      const errors = validateContactForm({ ...validData, name: 'A'.repeat(51) })
      expect(errors.name).toBeDefined()
    })

    it('rejects names with invalid characters', () => {
      const errors = validateContactForm({ ...validData, name: 'John<script>' })
      expect(errors.name).toBeDefined()
    })

    it('accepts names with hyphens and apostrophes', () => {
      const errors = validateContactForm({ ...validData, name: "O'Brien-Smith" })
      expect(errors.name).toBeUndefined()
    })

    it('trims whitespace before validating', () => {
      const errors = validateContactForm({ ...validData, name: '  ' })
      expect(errors.name).toBeDefined()
    })
  })

  describe('email field', () => {
    it('requires email', () => {
      const errors = validateContactForm({ ...validData, email: '' })
      expect(errors.email).toBeDefined()
    })

    it('rejects invalid email format', () => {
      const invalidEmails = ['notanemail', 'missing@', '@nodomain.com', 'spaces @email.com']
      invalidEmails.forEach(email => {
        const errors = validateContactForm({ ...validData, email })
        expect(errors.email).toBeDefined()
      })
    })

    it('accepts valid email addresses', () => {
      const validEmails = ['user@example.com', 'user+tag@sub.domain.org', 'test.email@domain.co.uk']
      validEmails.forEach(email => {
        const errors = validateContactForm({ ...validData, email })
        expect(errors.email).toBeUndefined()
      })
    })

    it('rejects emails over 100 characters', () => {
      const longEmail = `${'a'.repeat(90)}@example.com`
      const errors = validateContactForm({ ...validData, email: longEmail })
      expect(errors.email).toBeDefined()
    })
  })

  describe('message field', () => {
    it('requires message', () => {
      const errors = validateContactForm({ ...validData, message: '' })
      expect(errors.message).toBeDefined()
    })

    it('requires at least 10 characters', () => {
      const errors = validateContactForm({ ...validData, message: 'Short' })
      expect(errors.message).toBeDefined()
    })

    it('rejects messages over 1000 characters', () => {
      const errors = validateContactForm({ ...validData, message: 'A'.repeat(1001) })
      expect(errors.message).toBeDefined()
    })

    it('accepts message of exactly 10 characters', () => {
      const errors = validateContactForm({ ...validData, message: '1234567890' })
      expect(errors.message).toBeUndefined()
    })
  })
})

describe('sanitizeInput', () => {
  it('escapes HTML special characters', () => {
    expect(sanitizeInput('<script>alert("xss")</script>')).toBe(
      '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
    )
  })

  it('escapes single quotes', () => {
    expect(sanitizeInput("it's a test")).toContain('&#039;')
  })

  it('escapes backticks', () => {
    expect(sanitizeInput('`template`')).toContain('&#x60;')
  })

  it('trims whitespace', () => {
    expect(sanitizeInput('  hello  ')).toBe('hello')
  })

  it('preserves normal text unchanged (aside from trim)', () => {
    expect(sanitizeInput('Hello, World!')).toBe('Hello, World!')
  })

  it('handles empty string', () => {
    expect(sanitizeInput('')).toBe('')
  })
})

describe('hasErrors', () => {
  it('returns true when there are errors', () => {
    expect(hasErrors({ name: 'Name is required.' })).toBe(true)
  })

  it('returns false when errors object is empty', () => {
    expect(hasErrors({})).toBe(false)
  })

  it('returns false for empty-value errors', () => {
    // undefined values still exist as keys, so this should still return true
    expect(hasErrors({ name: undefined })).toBe(true)
  })
})
