import { useState, useCallback } from 'react'
import type { ContactFormData, FormErrors } from '@/types'

interface UseContactFormReturn {
  formData: ContactFormData
  errors: FormErrors
  isSubmitting: boolean
  isSuccess: boolean
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent) => Promise<void>
  resetForm: () => void
}

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  message: '',
}

function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim()
}

function validateForm(data: ContactFormData): FormErrors {
  const errors: FormErrors = {}

  if (!data.name.trim()) {
    errors.name = 'Name is required'
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters'
  } else if (data.name.trim().length > 100) {
    errors.name = 'Name must be under 100 characters'
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address'
  }

  if (!data.message.trim()) {
    errors.message = 'Message is required'
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters'
  } else if (data.message.trim().length > 1000) {
    errors.message = 'Message must be under 1000 characters'
  }

  return errors
}

export function useContactForm(): UseContactFormReturn {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setFormData(prev => ({ ...prev, [name]: value }))
      // Clear error on change
      if (errors[name as keyof FormErrors]) {
        setErrors(prev => ({ ...prev, [name]: undefined }))
      }
    },
    [errors]
  )

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      const validationErrors = validateForm(formData)
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors)
        return
      }

      setIsSubmitting(true)
      setErrors({})

      try {
        // Sanitize inputs before sending
        const sanitizedData = {
          name: sanitizeInput(formData.name),
          email: sanitizeInput(formData.email),
          message: sanitizeInput(formData.message),
        }

        // Simulate API call (replace with real serverless function)
        await new Promise(resolve => setTimeout(resolve, 1500))
        console.log('Form submitted:', sanitizedData)

        setIsSuccess(true)
        setFormData(initialFormData)
      } catch {
        setErrors({ message: 'Failed to send message. Please try again.' })
      } finally {
        setIsSubmitting(false)
      }
    },
    [formData]
  )

  const resetForm = useCallback(() => {
    setFormData(initialFormData)
    setErrors({})
    setIsSuccess(false)
  }, [])

  return { formData, errors, isSubmitting, isSuccess, handleChange, handleSubmit, resetForm }
}
