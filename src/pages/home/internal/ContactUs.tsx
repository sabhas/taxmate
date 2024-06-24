import emailjs from "@emailjs/browser"
import { LoadingButton } from "@mui/lab"
import { Box, TextField, Typography } from "@mui/material"
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"
import { useCallback, useRef, useState } from "react"
import { toast } from "react-toastify"
import styles from "../style.module.scss"

export const ContactUs = () => {
  const form = useRef<HTMLFormElement | null>(null)
  const [isSendingEmail, setIsSendingEmail] = useState(false)

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (form.current) {
      setIsSendingEmail(true)
      emailjs
        .sendForm(
          import.meta.env.VITE_APP_EMAIL_SERVICE_ID as string,
          import.meta.env.VITE_APP_EMAIL_TEMPLATE_ID as string,
          form.current,
          import.meta.env.VITE_APP_EMAIL_ACCOUNT_ID as string
        )
        .then(() => {
          toast.success("Message successfully sent!")
          form.current?.reset()
        })
        .catch((err) => {
          console.log(`Error occurred in sending email`, err)
          toast.error("Failed to send the message")
        })
        .finally(() => {
          setIsSendingEmail(false)
        })
    }
  }

  return (
    <Box className={styles.contactUsContainer} id="contactUs">
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        Contact Us
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          flexDirection: {
            xs: "column",
            md: "row"
          }
        }}
      >
        <Box
          ref={form}
          component="form"
          method="post"
          action=""
          onSubmit={sendEmail}
          className={styles.contactForm}
        >
          <TextField
            label="Name"
            name="name"
            variant="outlined"
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Email"
            name="reply_to"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            type="email"
          />
          <TextField
            label="Phone"
            name="phone"
            variant="outlined"
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Message"
            name="message"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            multiline
            rows={4}
          />
          <div
            className="g-recaptcha"
            data-sitekey="6LfhbvwpAAAAABfVn96TUjhxw9wMfdDIXxw8SbEw"
          ></div>
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            loading={isSendingEmail}
          >
            Send Message
          </LoadingButton>
        </Box>
        <Map />
      </Box>
    </Box>
  )
}

const containerStyle = {
  width: "100%",
  minHeight: "485px",
  flex: 1
}

const taxmateCord = {
  lat: 31.622685,
  lng: 71.059266
}

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY
  })

  const [_, setMap] = useState<google.maps.Map | null>(null)

  const onLoad = useCallback((map: google.maps.Map) => {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(taxmateCord)
    map.fitBounds(bounds)

    setMap(map)
  }, [])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  if (!isLoaded) return null

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={taxmateCord}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker position={taxmateCord} />
    </GoogleMap>
  )
}
