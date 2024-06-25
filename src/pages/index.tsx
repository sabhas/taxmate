import { Avatar, Box, Grid, Paper, Typography } from "@mui/material"
import { graphql, useStaticQuery } from "gatsby"
import {
  GatsbyImage,
  IGatsbyImageData,
  StaticImage,
  getImage
} from "gatsby-plugin-image"
import React from "react"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import { feedbacks, members, services, tools } from "../data/homePage"
import Layout from "../layout"
import * as styles from "../scss/index.module.scss"

const IndexPage = () => {
  return (
    <Layout>
      <Home />
      <Services />
      <Tools />
      <AboutUs />
      <Feedback />
    </Layout>
  )
}

export const Head = () => <title>Taxmate</title>

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
