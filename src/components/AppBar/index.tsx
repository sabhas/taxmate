import {
  Box,
  Button,
  IconButton,
  Link,
  AppBar as MuiAppBar,
  Toolbar
} from "@mui/material"

import styles from "./style.module.scss"
import { Menu as MenuIcon } from "@mui/icons-material"

export const AppBar = () => {
  return (
    <MuiAppBar position="fixed" className={styles.AppBar}>
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
        >
          <MenuIcon />
        </IconButton>

        <Box className={styles.logoWrapper}>
          <img src="/logo.png" alt="Logo" />
        </Box>

        <Box
          className={styles.links}
          sx={{
            display: {
              xs: "none",
              md: "flex"
            }
          }}
        >
          <Link underline="none" variant="button">
            Home
          </Link>
          <Link underline="none" variant="button">
            Services
          </Link>
          <Link underline="none" variant="button">
            Tools
          </Link>
          <Link underline="none" variant="button">
            About Us
          </Link>
        </Box>

        <Box className={styles.rightSideBox}>
          <Button variant="contained">Book Appointment</Button>
        </Box>
      </Toolbar>
    </MuiAppBar>
  )
}
