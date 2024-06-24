import { Menu as MenuIcon } from "@mui/icons-material"
import { AppBar, Box, Button, IconButton, Link, Toolbar } from "@mui/material"
import React, { useState } from "react"
import { Sidebar } from "../Sidebar"
import * as styles from "./style.module.scss"
import { StaticImage } from "gatsby-plugin-image"

export const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  console.log(styles)
  return (
    <AppBar position="fixed" className={styles.AppBar}>
      {/*on small screens show side bar only when menu icon is clicked*/}
      {isSidebarOpen && (
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      )}

      <Toolbar className={styles.toolbar}>
        <IconButton
          size="large"
          edge="start"
          aria-label="menu"
          sx={{
            display: {
              md: "none"
            }
          }}
          onClick={() => {
            setIsSidebarOpen((prev) => !prev)
          }}
        >
          <MenuIcon />
        </IconButton>

        <StaticImage
          src="../../images/logo.png"
          alt="Logo"
          placeholder="blurred"
          layout="fixed"
          width={160}
          height={60}
        />

        <Box
          className={styles.links}
          sx={{
            display: {
              xs: "none",
              md: "flex"
            }
          }}
        >
          <NavigationLink label="Home" link="home" />
          <NavigationLink label="Services" link="services" />
          <NavigationLink label="Tools" link="tools" />
          <NavigationLink label="AboutUs" link="aboutUs" />
          <NavigationLink label="Feedback" link="feedback" />
        </Box>

        <Box className={styles.rightSideBox}>
          <Button variant="contained">Book Appointment</Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

type NavigationLinkProps = {
  label: string
  link: string
}

const NavigationLink = ({ label, link }: NavigationLinkProps) => {
  return (
    <Link underline="none" variant="button" sx={{ cursor: "pointer" }}>
      {label}
    </Link>
  )
}
