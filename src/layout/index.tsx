import React, { PropsWithChildren } from "react"
import { Header } from "../components/Header"
import { Box } from "@mui/material"
import { WhatsAppFloatingButton } from "../components/FloatingWhatsappButton"
import * as styles from "./style.module.scss"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { Banner } from "../components/Banner"
import { BANNER_MESSAGE } from "../data/homePage"

const Layout = ({ children }: PropsWithChildren) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          siteUrl
          description
          author
          image
        }
      }
    }
  `)

  const { title, siteUrl, description, author, image } = data.site.siteMetadata

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="author" content={author} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${siteUrl}${image}`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={author} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${siteUrl}${image}`} />
      </Helmet>
      <Header />
      <Banner message={BANNER_MESSAGE} />
      <Box className={styles.main}>
        {children}
        <WhatsAppFloatingButton
          phoneNumber="+923336844170"
          message="I'd like to get some help regarding tax matter"
        />
      </Box>
    </>
  )
}

export default Layout
