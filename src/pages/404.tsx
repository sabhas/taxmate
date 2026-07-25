import * as React from "react"
import { Link, PageProps } from "gatsby"
import { Box, Button, Typography } from "@mui/material"
import Layout from "../layout"

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Box
        sx={{
          textAlign: "center",
          py: 8,
          px: 2,
          maxWidth: 600,
          mx: "auto"
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "4rem", md: "6rem" },
            fontWeight: 800,
            mb: 2,
            background: "linear-gradient(135deg, #4caf50, #2196f3)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          404
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
          Page not found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Sorry, we couldn't find what you were looking for.
          {process.env.NODE_ENV === "development" && (
            <>
              {" "}
              Try creating a page in <code>src/pages/</code>.
            </>
          )}
        </Typography>
        <Button variant="contained" component={Link} to="/">
          Go home
        </Button>
      </Box>
    </Layout>
  )
}

export default NotFoundPage

export const Head = () => <title>Not found - Taxmate</title>