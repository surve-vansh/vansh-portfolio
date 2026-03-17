import { useState, useCallback } from 'react'
import emailjs from '@emailjs/browser'

interface FormData {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

const INITIAL_FORM: FormData = {
  name: '',
  email: '',
  message: '',
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {}

  if (!data.name.trim()) {
    errors.name = 'Name is required'
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters'
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
  }

  return errors
}

export function useContactForm() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setFormData(prev => ({ ...prev, [name]: value }))
      // Clear error on change
      if (errors[name as keyof FormErrors]) {
        setErrors(prev => ({ ...prev, [name]: undefined }))
      }
      if (submitError) setSubmitError(null)
    },
    [errors, submitError]
  )

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      // Validate
      const validationErrors = validate(formData)
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors)
        return
      }

      setIsSubmitting(true)
      setSubmitError(null)

      try {
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_name: 'Vansh',
            reply_to: formData.email,
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )

        setIsSuccess(true)
        setFormData(INITIAL_FORM)
        setErrors({})
      } catch (err) {
        console.error('EmailJS error:', err)
        setSubmitError('Failed to send message. Please try again or email me directly.')
      } finally {
        setIsSubmitting(false)
      }
    },
    [formData]
  )

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM)
    setErrors({})
    setIsSuccess(false)
    setSubmitError(null)
  }, [])

  return {
    formData,
    errors,
    isSubmitting,
    isSuccess,
    submitError,
    handleChange,
    handleSubmit,
    resetForm,
  }
}