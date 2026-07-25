import { Menu as MenuIcon } from "@mui/icons-material"
import { AppBar, Box, Button, IconButton, Toolbar } from "@mui/material"
import React, { useState } from "react"
import { Sidebar } from "../Sidebar"
import * as styles from "./style.module.scss"
import { StaticImage } from "gatsby-plugin-image"
import { Link, navigate } from "gatsby"
import { ThemeToggleButton } from "../ThemeToggleButton"

export const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <AppBar position="fixed" className={styles.AppBar}>
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <Toolbar className={styles.toolbar}>
        <IconButton
          size="large"
          edge="start"
          aria-label="open navigation menu"
          sx={{ display: { md: "none" } }}
          onClick={() => setIsSidebarOpen((prev) => !prev)}
        >
          <MenuIcon />
        </IconButton>

        <Link
          to="/#home"
          aria-label="Taxmate home"
          className={styles.logoLink}
        >
          <StaticImage
            src="../../images/logo.png"
            alt="Taxmate logo"
            placeholder="blurred"
            layout="fixed"
            width={160}
            height={60}
          />
        </Link>

        <Box
          className={styles.links}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          <NavigationLink label="Home" link="/#home" />
          <NavigationLink label="Calculator" link="/taxCalculator" />
          <NavigationLink
            label="Property Transfer Fees"
            link="/propertyTransferFees"
          />
          <NavigationLink label="News" link="/news" showStar />
        </Box>

        <Box className={styles.rightSideBox}>
          <ThemeToggleButton />
          <Button
            variant="contained"
            onClick={() => navigate("/#contactUs")}
            aria-label="Contact us"
          >
            Contact Us
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

type NavigationLinkProps = {
  label: string
  link: string
  showStar?: boolean
}

export const NavigationLink = ({ label, link, showStar }: NavigationLinkProps) => (
  <Link
    to={link}
    className={styles.link}
    getProps={({ isCurrent }) => {
      // isCurrent is true when this Link's path matches the current route
      const active = isCurrent
      return {
        className: active
          ? `${styles.link} ${styles.linkActive}`
          : styles.link,
        "aria-current": active ? "page" : undefined
      }
    }}
    aria-label={`${label}${showStar ? " (new)" : ""}`}
  >
    {label}
    {showStar && (
      <span className={styles.star} aria-hidden="true">
        ★
      </span>
    )}
  </Link>
)