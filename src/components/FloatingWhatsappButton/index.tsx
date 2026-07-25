import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import React from "react"
import * as styles from "./style.module.scss"

type Props = {
  phoneNumber: string
  message?: string
}

export const WhatsAppFloatingButton = ({
  phoneNumber,
  message = ""
}: Props) => {
  const handleClick = () => {
    let whatsappUrl = `https://wa.me/${phoneNumber}`

    if (message) {
      whatsappUrl += `?text=${encodeURIComponent(message)}`
    }

    window.open(whatsappUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <button
      type="button"
      className={styles.whatsappFloatingButton}
      onClick={handleClick}
      aria-label="Chat with us on WhatsApp"
    >
      <WhatsAppIcon />
    </button>
  )
}