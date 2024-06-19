import React, { useEffect, useRef } from "react"

interface RecaptchaProps {
  onChange: (token: string | null) => void
}

export const Recaptcha: React.FC<RecaptchaProps> = ({ onChange }) => {
  const recaptchaRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const loadRecaptcha = () => {
      if (window.grecaptcha && recaptchaRef.current) {
        window.grecaptcha.render(recaptchaRef.current, {
          sitekey: "6LfhbvwpAAAAABfVn96TUjhxw9wMfdDIXxw8SbEw",
          callback: onChange
        })
      }
    }

    if (window.grecaptcha) {
      loadRecaptcha()
    } else {
      const intervalId = setInterval(() => {
        if (window.grecaptcha) {
          clearInterval(intervalId)
          loadRecaptcha()
        }
      }, 500)
    }
  }, [onChange])

  return <div ref={recaptchaRef}></div>
}
