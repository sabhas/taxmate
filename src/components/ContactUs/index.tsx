import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { useRef } from "react"
import emailjs from "@emailjs/browser"
import styles from "./style.module.scss"
import { toast } from "react-toastify"
import { Box, Button, TextField, Typography } from "@mui/material"
import "leaflet/dist/leaflet.css"

export const ContactUs = () => {
  const form = useRef<HTMLFormElement | null>(null)

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (form.current)
      emailjs
        .sendForm(
          process.env.REACT_APP_EMAIL_SERVICE_ID as string,
          process.env.REACT_APP_EMAIL_TEMPLATE_ID as string,
          form.current,
          process.env.REACT_APP_EMAIL_ACCOUNT_ID as string
        )
        .then(() => {
          toast.success("Message successfully sent!")
        })
        .catch((err) => {
          console.log(`Error occurred in sending email: ${err}`)
          toast.error("Failed to send the message")
        })
  }

  return (
    <Box className={styles.contactUsContainer}>
      <Typography variant="h4" align="center" gutterBottom>
        Contact Us
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row"
          }
        }}
      >
        <Box
          component="form"
          onSubmit={sendEmail}
          className={styles.contactForm}
        >
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            type="email"
          />
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            type="email"
          />
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            multiline
            rows={4}
          />
          <Button type="submit" variant="contained" color="primary">
            Send Message
          </Button>
        </Box>
        <Box className={styles.mapWrapper}>
          <MapContainer
            center={[31.62284081866109, 71.05924573734055]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[31.62284081866109, 71.05924573734055]}>
              <Popup>
                Taxmate,
                <br />
                Pakistan,
                <br />
                Punjab, Bhakkar <br />
                <br />
                <span>support@taxmate.pk</span>
              </Popup>
            </Marker>
          </MapContainer>
        </Box>
      </Box>
    </Box>
  )
}
