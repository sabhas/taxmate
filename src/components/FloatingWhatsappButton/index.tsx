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
    // Create WhatsApp link
    let whatsappUrl = `https://wa.me/${phoneNumber}`

    // Add message parameter if provided
    if (message) {
      whatsappUrl += `?text=${encodeURIComponent(message)}`
    }

    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank")
  }

  return (
    <button className={styles.whatsappFloatingButton} onClick={handleClick}>
      <WhatsAppIcon />
    </button>
  )
}
