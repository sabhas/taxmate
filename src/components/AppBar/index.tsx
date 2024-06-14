import { Box, Button, AppBar as MuiAppBar, Toolbar } from "@mui/material"

import styles from "./style.module.scss"

export const AppBar = () => {
  return (
    <MuiAppBar position="fixed" className={styles.AppBar}>
      <Toolbar className={styles.toolbar}>
        <Box className={styles.logoWrapper}>
          <img src="/logo.png" alt="Logo" />
        </Box>

        <Box className={styles.rightSideBox}>
          <Button variant="contained">Book Appointment</Button>
        </Box>
      </Toolbar>
    </MuiAppBar>
  )
}
