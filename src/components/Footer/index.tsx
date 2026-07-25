import { Box, Container, Grid, Link, Typography } from "@mui/material"
import { Link as GatsbyLink } from "gatsby"
import React from "react"

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main",
        color: "#fff",
        mt: "auto",
        py: 5,
        px: 2
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
              Taxmate
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.85, mb: 1 }}>
              Your trusted partner in tax solutions. Comprehensive tax
              consultancy services tailored to individuals, businesses, and
              organizations.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
              <GatsbyLink to="/#home" style={linkStyle}>
                Home
              </GatsbyLink>
              <GatsbyLink to="/taxCalculator" style={linkStyle}>
                Tax Calculator
              </GatsbyLink>
              <GatsbyLink to="/propertyTransferFees" style={linkStyle}>
                Property Transfer Fees
              </GatsbyLink>
              <GatsbyLink to="/news" style={linkStyle}>
                News
              </GatsbyLink>
              <GatsbyLink to="/#contactUs" style={linkStyle}>
                Contact Us
              </GatsbyLink>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
              Services
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
              <Typography variant="body2" sx={{ opacity: 0.85 }}>
                Tax Preparation
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.85 }}>
                Tax Planning
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.85 }}>
                Audit & Appeals
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.85 }}>
                NTN / 7E Certificates
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.85 }}>
               GST / PST (PRA) Matters
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 4,
            pt: 2,
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            textAlign: "center"
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © {new Date().getFullYear()} Taxmate. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

const linkStyle: React.CSSProperties = {
  color: "rgba(255, 255, 255, 0.85)",
  textDecoration: "none",
  fontSize: "0.875rem"
}