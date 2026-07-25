import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography
} from "@mui/material"
import { graphql, navigate, useStaticQuery } from "gatsby"
import {
  GatsbyImage,
  IGatsbyImageData,
  StaticImage,
  getImage
} from "gatsby-plugin-image"
import React, { Suspense, lazy, useRef, useState } from "react"
import { members, services, tools } from "../data/homePage"
import Layout from "../layout"
import * as styles from "../scss/index.module.scss"
import { LoadingButton } from "@mui/lab"
import emailjs from "@emailjs/browser"
import { toast } from "react-toastify"
import { QueryResult } from "../types"

// Lazy-load the Google Map so visitors who never reach the contact form
// don't pay the cost of loading the Maps API script.
const Map = lazy(() => import("../components/Map"))

const RECAPTCHA_SITE_KEY = process.env.GATSBY_RECAPTCHA_SITE_KEY as string

const IndexPage = () => {
  return (
    <>
      <Home />
      <Services />
      <Tools />
      <AboutUs />
      <ContactUs />
    </>
  )
}

export const Head = () => {
  return (
    <>
      <title>Taxmate</title>
      {RECAPTCHA_SITE_KEY && (
        <script
          src="https://www.google.com/recaptcha/api.js"
          async
          defer
        ></script>
      )}
    </>
  )
}

export default () => (
  <Layout>
    <IndexPage />
  </Layout>
)

const Home = () => (
  <Box className={styles.homeContainer} id="home">
    <Box className={styles.content}>
      <Typography variant="h3">Welcome to Taxmate</Typography>
      <Typography variant="h5">
        Your Trusted Partner in Tax Solutions
      </Typography>
      <Typography variant="body1" className={styles.heroDescription}>
        At Taxmate, we specialize in providing comprehensive tax consultancy
        services tailored to meet the unique needs of individuals, businesses,
        and organizations. With our expertise and commitment, we aim to help
        you navigate the complex world of taxes with ease and confidence.
      </Typography>
      <Box className={styles.heroActions}>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/taxCalculator")}
          sx={{
            backgroundColor: "#fff",
            color: "primary.main",
            "&:hover": { backgroundColor: "#f0f0f0" }
          }}
        >
          Calculate Your Tax
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate("/#contactUs")}
          sx={{
            borderColor: "#fff",
            color: "#fff",
            "&:hover": { borderColor: "#fff", backgroundColor: "rgba(255,255,255,0.08)" }
          }}
        >
          Contact Us
        </Button>
      </Box>
    </Box>
    <Box
      className={styles.imageContainer}
      sx={{ display: { xs: "none", md: "flex" } }}
    >
      <StaticImage
        src="../images/image-1.jpg"
        alt="Tax consultancy"
        placeholder="blurred"
        layout="fullWidth"
        style={{ width: "100%", height: "100%" }}
        imgStyle={{ objectFit: "cover" }}
      />
    </Box>
  </Box>
)

const Services = () => (
  <Box className={styles.servicesContainer} id="services">
    <Typography variant="h4" align="center" color="primary" gutterBottom>
      Our Services
    </Typography>
    <Grid container spacing={4}>
      {services.map((service, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Paper className={styles.serviceBox} elevation={3}>
            <Avatar className={styles.icon}>{service.icon}</Avatar>
            <Typography variant="h6">{service.title}</Typography>
            <Typography variant="body2" className={styles.description}>
              {service.description}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Box>
)

const Tools = () => (
  <Box className={styles.toolsContainer} id="tools">
    <Typography variant="h4" align="center" color="primary" gutterBottom>
      Tools
    </Typography>
    <Grid container spacing={4}>
      {tools.map((tool, index) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          key={index}
          onClick={() => {
            if (tool.link) navigate(tool.link)
          }}
        >
          <Paper className={styles.toolBox} elevation={3}>
            <Avatar className={styles.icon}>{tool.icon}</Avatar>
            <Typography variant="h6" className={styles.title}>
              {tool.title}
            </Typography>
            <Typography variant="body2" className={styles.description}>
              {tool.description}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Box>
)

const AboutUs = () => {
  const data: QueryResult = useStaticQuery(query)

  const imageMap = data.allFile.edges.reduce((acc, edge) => {
    acc[edge.node.relativePath] = edge.node.childImageSharp.gatsbyImageData
    return acc
  }, {} as { [key: string]: IGatsbyImageData })

  return (
    <Box className={styles.aboutUsContainer} id="aboutUs">
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        About Us
      </Typography>
      <Grid container spacing={4}>
        {members.map((member, index) => {
          const image = getImage(imageMap[member.image])
          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper className={styles.memberBox} elevation={3}>
                {image && (
                  <GatsbyImage
                    image={image}
                    alt={`Portrait of ${member.name}`}
                    style={{ borderRadius: "50%", marginBottom: "15px" }}
                    imgStyle={{
                      objectFit: "cover",
                      objectPosition: "center"
                    }}
                  />
                )}
                <Typography variant="h6" className={styles.name}>
                  {member.name}
                </Typography>
                {member.designation && (
                  <Typography variant="body2" className={styles.qualification}>
                    {member.designation}
                  </Typography>
                )}
                <Typography variant="body2" className={styles.qualification}>
                  {member.qualification}
                </Typography>
                {member.description && (
                  <Typography variant="body2" className={styles.description}>
                    {member.description}
                  </Typography>
                )}
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

type FormState = {
  name: string
  reply_to: string
  phone: string
  message: string
}

const ContactUs = () => {
  const form = useRef<HTMLFormElement | null>(null)
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const [values, setValues] = useState<FormState>({
    name: "",
    reply_to: "",
    phone: "",
    message: ""
  })
  const [errors, setErrors] = useState<Partial<FormState>>({})

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const validate = (): boolean => {
    const next: Partial<FormState> = {}
    if (!values.name.trim()) next.name = "Name is required"
    if (!values.reply_to.trim())
      next.reply_to = "Email is required"
    else if (!emailRegex.test(values.reply_to))
      next.reply_to = "Enter a valid email address"
    if (!values.phone.trim()) next.phone = "Phone is required"
    if (!values.message.trim()) next.message = "Message is required"
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) return

    if (form.current) {
      setIsSendingEmail(true)
      emailjs
        .sendForm(
          process.env.GATSBY_EMAIL_SERVICE_ID as string,
          process.env.GATSBY_EMAIL_TEMPLATE_ID as string,
          form.current,
          process.env.GATSBY_EMAIL_ACCOUNT_ID as string
        )
        .then(() => {
          toast.success("Message successfully sent!")
          form.current?.reset()
          setValues({ name: "", reply_to: "", phone: "", message: "" })
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
          flexDirection: { xs: "column", md: "row" }
        }}
      >
        <Box
          ref={form}
          component="form"
          onSubmit={sendEmail}
          className={styles.contactForm}
          noValidate
        >
          <TextField
            label="Name"
            name="name"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Email"
            name="reply_to"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            type="email"
            value={values.reply_to}
            onChange={(e) =>
              setValues((v) => ({ ...v, reply_to: e.target.value }))
            }
            error={!!errors.reply_to}
            helperText={errors.reply_to}
          />
          <TextField
            label="Phone"
            name="phone"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={values.phone}
            onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
            error={!!errors.phone}
            helperText={errors.phone}
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
            value={values.message}
            onChange={(e) =>
              setValues((v) => ({ ...v, message: e.target.value }))
            }
            error={!!errors.message}
            helperText={errors.message}
          />
          {RECAPTCHA_SITE_KEY && (
            <div
              className="g-recaptcha"
              data-sitekey={RECAPTCHA_SITE_KEY}
            ></div>
          )}
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            loading={isSendingEmail}
            sx={{ mt: 2 }}
          >
            Send Message
          </LoadingButton>
        </Box>
        <Suspense fallback={<Box sx={{ flex: 1, minHeight: 485 }} />}>
          <Map />
        </Suspense>
      </Box>
    </Box>
  )
}

const query = graphql`
  query {
    allFile {
      edges {
        node {
          relativePath
          childImageSharp {
            gatsbyImageData(
              width: 200
              height: 200
              placeholder: BLURRED
              layout: FIXED
            )
          }
        }
      }
    }
  }
`