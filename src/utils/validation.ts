import type { ContactFormData, FormErrors } from '@/types'

/**
 * Validates contact form fields.
 * Returns an object with field-level error messages.
 */
export function validateContactForm(data: ContactFormData): FormErrors {
  const errors: FormErrors = {}

  // Name validation
  const trimmedName = data.name.trim()
  if (!trimmedName) {
    errors.name = 'Name is required.'
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters.'
  } else if (trimmedName.length > 50) {
    errors.name = 'Name must be under 50 characters.'
  } else if (!/^[a-zA-Z\s'-]+$/.test(trimmedName)) {
    errors.name = 'Name contains invalid characters.'
  }

  // Email validation
  const trimmedEmail = data.email.trim()
  if (!trimmedEmail) {
    errors.email = 'Email address is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.'
  } else if (trimmedEmail.length > 100) {
    errors.email = 'Email must be under 100 characters.'
  }

  // Message validation
  const trimmedMessage = data.message.trim()
  if (!trimmedMessage) {
    errors.message = 'Message is required.'
  } else if (trimmedMessage.length < 10) {
    errors.message = 'Message must be at least 10 characters.'
  } else if (trimmedMessage.length > 1000) {
    errors.message = 'Message must be under 1000 characters.'
  }

  return errors
}

/**
 * Basic HTML sanitizer to strip dangerous tags from input strings.
 * Used to prevent XSS in form submissions.
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/`/g, '&#x60;')
    .trim()
}

/**
 * Checks if a FormErrors object has any errors.
 */
export function hasErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0
}
