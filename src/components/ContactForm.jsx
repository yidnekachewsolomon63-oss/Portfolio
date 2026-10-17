import { useEffect, useRef, useState } from 'react'
import { CONTACT, SITE } from '../data/site.js'
import Icon from './Icon.jsx'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const MESSAGE_MAX = 2000
const EMPTY_VALUES = { name: '', email: '', message: '' }

/**
 * Client-side rules mirror the HTML constraints that are already on the fields,
 * so the inline messages and the native fallback agree with each other.
 */
function validate(values) {
  const errors = {}
  const name = values.name.trim()
  const email = values.email.trim()
  const message = values.message.trim()

  if (!name) errors.name = 'Please enter your name.'
  else if (name.length < 2) errors.name = 'Your name must be at least 2 characters.'
  else if (values.name.length > 120) errors.name = 'Your name must be 120 characters or fewer.'

  if (!email) errors.email = 'Please enter your email address.'
  else if (values.email.length > 254) errors.email = 'Your email must be 254 characters or fewer.'
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'Enter a valid email address, like name@example.com.'

  if (!message) errors.message = 'Please enter a message.'
  else if (message.length < 20) errors.message = 'Please write at least 20 characters so I have enough context.'
  else if (values.message.length > MESSAGE_MAX) errors.message = `Please keep your message under ${MESSAGE_MAX} characters.`

  return errors
}

/** Turns whatever Formspree answered with into one readable sentence. */
function describeFailure(response, payload) {
  if (payload && Array.isArray(payload.errors) && payload.errors.length > 0) {
    const details = payload.errors
      .map((error) => error?.message)
      .filter(Boolean)
      .join(' ')
    if (details) return details
  }

  if (response.status === 422) {
    return 'Formspree could not accept those details. Please check the fields and try again.'
  }

  if (response.status === 403) {
    return 'Formspree blocked this submission. Please email me directly at ' + SITE.email + '.'
  }

  return `The message could not be sent (error ${response.status}). Please try again, or email me at ${SITE.email}.`
}

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY_VALUES)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [statusMessage, setStatusMessage] = useState('')
  const submittingRef = useRef(false)
  const statusRef = useRef(null)
  const formRef = useRef(null)

  // Move focus to the status text once the outcome is known, so screen readers
  // announce it and keyboard users land in the right place.
  useEffect(() => {
    if (status === 'success' || status === 'error') {
      statusRef.current?.focus()
    }
  }, [status, statusMessage])

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => {
      if (!current[name]) return current
      const next = { ...current }
      delete next[name]
      return next
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const form = event.currentTarget
    if (submittingRef.current) return

    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setStatus('idle')
      setStatusMessage('')
      // The inline errors are rendered by the next React pass, so focus the
      // first offending control by its field name instead of querying the DOM.
      const firstInvalidName = Object.keys(nextErrors)[0]
      const firstInvalidField = form.elements.namedItem(firstInvalidName)
      if (firstInvalidField instanceof HTMLElement) firstInvalidField.focus()
      return
    }

    // Honeypot: a real person never sees this field. Bots that fill it get a
    // success response without the message ever being sent anywhere.
    const honeypot = form.elements.namedItem('_gotcha')
    if (honeypot && typeof honeypot.value === 'string' && honeypot.value.trim() !== '') {
      setValues(EMPTY_VALUES)
      setStatus('success')
      setStatusMessage('Thanks — your message has been received.')
      return
    }

    submittingRef.current = true
    setStatus('submitting')
    setStatusMessage('')

    try {
      const response = await fetch(CONTACT.formspreeEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      })

      let payload = null
      const raw = await response.text()
      if (raw) {
        try {
          payload = JSON.parse(raw)
        } catch {
          payload = null
        }
      }

      if (response.ok) {
        setValues(EMPTY_VALUES)
        setErrors({})
        setStatus('success')
        setStatusMessage('Thanks — your message is on its way. I usually reply within one business day.')
      } else {
        setStatus('error')
        setStatusMessage(describeFailure(response, payload))
      }
    } catch {
      // Never log the entered values: they are personal data.
      setStatus('error')
      setStatusMessage(
        `The message could not be sent — the network request failed. Please try again, or email me at ${SITE.email}.`,
      )
    } finally {
      submittingRef.current = false
    }
  }

  const isSubmitting = status === 'submitting'

  const fieldProps = (name, describedBy) => ({
    id: `cf-${name}`,
    name,
    value: values[name],
    onChange: handleChange,
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': describedBy,
    required: true,
  })

  return (
    <form
      ref={formRef}
      className="pf-form"
      id="contactForm"
      action={CONTACT.formspreeEndpoint}
      method="POST"
      noValidate
      onSubmit={handleSubmit}
      aria-busy={isSubmitting}
    >
      {/* Progressive enhancement: without JavaScript the browser posts this
          form straight to Formspree because action/method are left in place. */}
      <input type="hidden" name="_subject" value="New message from your portfolio" />
      <input type="hidden" name="_template" value="table" />
      <div className="pf-visually-hidden" aria-hidden="true">
        <label htmlFor="cf-gotcha">Leave this field empty</label>
        <input id="cf-gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <header className="pf-form__head">
        <h3 className="pf-form__title">Send a message</h3>
        <p className="pf-form__desc">
          Fields marked with <span className="pf-form__req" aria-hidden="true">*</span> are required. I
          usually reply within one business day.
        </p>
      </header>

      <fieldset className="pf-form__fieldset">
        <legend className="pf-visually-hidden">Contact details</legend>

        <div className="pf-form__grid">
          <div className="pf-form__field" data-invalid={errors.name ? 'true' : 'false'}>
            <label htmlFor="cf-name">
              Full name <span className="pf-form__req" aria-hidden="true">*</span>
            </label>
            <input
              {...fieldProps('name', 'cf-name-error')}
              type="text"
              autoComplete="name"
              autoCapitalize="words"
              spellCheck="false"
              placeholder="Jane Doe"
              minLength={2}
              maxLength={120}
            />
            <span className="pf-form__error" id="cf-name-error" role="alert">
              {errors.name ?? ''}
            </span>
          </div>

          <div className="pf-form__field" data-invalid={errors.email ? 'true' : 'false'}>
            <label htmlFor="cf-email">
              Email address <span className="pf-form__req" aria-hidden="true">*</span>
            </label>
            <input
              {...fieldProps('email', 'cf-email-error')}
              type="email"
              autoComplete="email"
              inputMode="email"
              spellCheck="false"
              placeholder="jane@example.com"
              maxLength={254}
            />
            <span className="pf-form__error" id="cf-email-error" role="alert">
              {errors.email ?? ''}
            </span>
          </div>
        </div>

        <div className="pf-form__field" data-invalid={errors.message ? 'true' : 'false'}>
          <label htmlFor="cf-message">
            Message <span className="pf-form__req" aria-hidden="true">*</span>
          </label>
          <textarea
            {...fieldProps('message', 'cf-message-hint cf-message-error')}
            rows={6}
            placeholder="Tell me a little about the role, project or question…"
            minLength={20}
            maxLength={MESSAGE_MAX}
          />
          <div className="pf-form__meta">
            <span className="pf-form__hint" id="cf-message-hint">
              At least 20 characters.
            </span>
            <span className="pf-form__count" aria-hidden="true">
              {values.message.length} / {MESSAGE_MAX}
            </span>
          </div>
          <span className="pf-form__error" id="cf-message-error" role="alert">
            {errors.message ?? ''}
          </span>
        </div>
      </fieldset>

      <button
        className="pf-btn pf-btn--primary pf-form__submit"
        id="cf-submit"
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        <span className="pf-form__submit-label">{isSubmitting ? 'Sending…' : 'Send message'}</span>
        <span className="pf-form__spinner" aria-hidden="true" />
      </button>

      <p
        ref={statusRef}
        className="pf-form__status"
        id="cf-status"
        role="status"
        aria-live="polite"
        tabIndex={-1}
        data-state={status === 'success' || status === 'error' ? status : 'idle'}
      >
        {statusMessage}
      </p>

      <p className="pf-form__footnote">
        <Icon name="shield-lock" /> This form sends your message through Formspree to{' '}
        {SITE.email}. It is used only to reply to you.
      </p>
    </form>
  )
}
