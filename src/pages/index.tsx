import React from "react"
import Layout from "../layout"
import * as styles from "../scss/index.module.scss"
import { Avatar, Box, Grid, Paper, Typography } from "@mui/material"
import { members, services, tools } from "../data/homePage"
import { StaticImage } from "gatsby-plugin-image"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"

const IndexPage = () => {
  return (
    <Layout>
      <Home />
      <Services />
      <Tools />
      <AboutUs />
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
