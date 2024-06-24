import React from "react"
import Layout from "../layout"
import * as styles from "../scss/index.module.scss"
import { Avatar, Box, Grid, Paper, Typography } from "@mui/material"
import { services, tools } from "../data/homePage"
import { StaticImage } from "gatsby-plugin-image"

const IndexPage = () => {
  return (
    <Layout>
      <Home />
      <Services />
      <Tools />
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
