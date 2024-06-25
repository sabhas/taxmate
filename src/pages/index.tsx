import { Avatar, Box, Grid, Paper, TextField, Typography } from "@mui/material"
import { graphql, useStaticQuery } from "gatsby"
import {
  GatsbyImage,
  IGatsbyImageData,
  StaticImage,
  getImage
} from "gatsby-plugin-image"
import React, { useCallback, useRef, useState } from "react"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import { feedbacks, members, services, tools } from "../data/homePage"
import Layout from "../layout"
import * as styles from "../scss/index.module.scss"
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"
import { LoadingButton } from "@mui/lab"
import emailjs from "@emailjs/browser"
import { toast } from "react-toastify"

const IndexPage = () => {
  return (
    <Layout>
      <Home />
      <Services />
      <Tools />
      <AboutUs />
      <Feedback />
      <ContactUs />
    </Layout>
  )
}

export const Head = () => {
  return (
    <>
      <title>Taxmate</title>
      <script
        src="https://www.google.com/recaptcha/api.js"
        async
        defer
      ></script>
    </>
  )
}

export default IndexPage

const Home = () => (
  <Box className={styles.homeContainer} id="home">
    <Box className={styles.content}>
      <Typography variant="h3">Welcome to Taxmate</Typography>
      <Typography variant="h5">
        Your Trusted Partner in Tax Solutions
      </Typography>
      <Typography variant="body1">
        At Taxmate, we specialize in providing comprehensive tax consultancy
        services tailored to meet the unique needs of individuals, businesses,
        and organizations. With our expertise and commitment, we aim to help you
        navigate the complex world of taxes with ease and confidence.
      </Typography>
    </Box>
    <Box
      className={styles.imageContainer}
      sx={{
        display: {
          xs: "none",
          md: "flex"
        }
      }}
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
        <Grid item xs={12} sm={6} md={4} key={index}>
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
                    alt={member.name}
                    style={{ borderRadius: "50%", marginBottom: "15px" }}
                    imgStyle={{ objectFit: "cover" }}
                  />
                )}
                <Typography variant="h6" className={styles.name}>
                  {member.name}
                </Typography>
                <Typography variant="body2" className={styles.qualification}>
                  {member.qualification}
                </Typography>
                <Typography variant="body2" className={styles.description}>
                  {member.description}
                </Typography>
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

const Feedback = () => (
  <Box className={styles.feedbackContainer} id="feedback">
    <Typography variant="h4" align="center" color="primary" gutterBottom>
      Customers Feedback
    </Typography>
    <Typography variant="h6" align="center" color="textSecondary" gutterBottom>
      What Customers Think About Taxmate
    </Typography>
    <Carousel
      infinite
      pauseOnHover
      centerMode
      autoPlay
      shouldResetAutoplay={false}
      responsive={{
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 1024, min: 0 },
          items: 1
        }
      }}
      sliderClass={styles.slider}
    >
      {feedbacks.map((feedback, index) => (
        <Box key={index} className={styles.feedbackBox}>
          <img src={feedback.image} alt={feedback.name} />
          <Typography variant="h6" className={styles.customerName}>
            {feedback.name}
          </Typography>
          <Typography variant="body2" className={styles.customerRole}>
            {feedback.role}
          </Typography>
          <Typography variant="body2" className={styles.feedback}>
            {feedback.feedback}
          </Typography>
        </Box>
      ))}
    </Carousel>
  </Box>
)

const ContactUs = () => {
  const form = useRef<HTMLFormElement | null>(null)
  const [isSendingEmail, setIsSendingEmail] = useState(false)

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

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
    googleMapsApiKey: process.env.GATSBY_GOOGLE_MAP_API_KEY as string
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

const query = graphql`
  query {
    allFile {
      edges {
        node {
          relativePath
          childImageSharp {
            gatsbyImageData(
              width: 100
              height: 100
              placeholder: BLURRED
              layout: FIXED
            )
          }
        }
      }
    }
  }
`

type ImageData = {
  node: {
    relativePath: string
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  }
}

type QueryResult = {
  allFile: {
    edges: ImageData[]
  }
}
