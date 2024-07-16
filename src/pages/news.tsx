import { Box, Typography } from "@mui/material"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image"
import React, { useState } from "react"
import Lightbox from "yet-another-react-lightbox"
import { Fullscreen, Zoom } from "yet-another-react-lightbox/plugins"
import "yet-another-react-lightbox/styles.css"
import Layout from "../layout"
import { QueryResult } from "../types"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

export default () => {
  const data: QueryResult = useStaticQuery(query)
  const images = data.allFile.edges

  const slides = images.map(({ node }) => ({
    src: getSrc(node.childImageSharp.gatsbyImageData)!
  }))

  const [index, setIndex] = useState<number>(-1)

  return (
    <Layout>
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h4" align="center" color="primary" gutterBottom>
          Important Information
        </Typography>

        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry gutter="10px">
            {images.map(({ node }, index) => {
              const image = getImage(node.childImageSharp.gatsbyImageData)
              if (!image) return null

              return (
                <Box key={index} onClick={() => setIndex(index)}>
                  <GatsbyImage
                    image={image}
                    alt={`Gallery image ${index + 1}`}
                  />
                </Box>
              )
            })}
          </Masonry>
        </ResponsiveMasonry>

        <Lightbox
          index={index}
          open={index >= 0}
          close={() => setIndex(-1)}
          slides={slides}
          animation={{
            fade: 500,
            swipe: 1000
          }}
          plugins={[Fullscreen, Zoom]}
          on={{
            view: ({ index }) => setIndex(index)
          }}
        />
      </Box>
    </Layout>
  )
}

const query = graphql`
  query {
    allFile(filter: { relativeDirectory: { eq: "news" } }) {
      edges {
        node {
          relativePath
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
          }
        }
      }
    }
  }
`
