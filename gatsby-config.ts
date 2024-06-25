import type { GatsbyConfig } from "gatsby"

require("dotenv").config({
  path: `.env`
})

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Taxmate`,
    siteUrl: "https://taxmate.pk",
    description: "",
    author: "Sabir Hassan",
    image: "/taxmate.jpg"
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/"
      },
      __key: "images"
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Taxmate",
        start_url: "/",
        icon: "static/taxmate.jpg" // Path to your favicon file
      }
    }
  ]
}

export default config
