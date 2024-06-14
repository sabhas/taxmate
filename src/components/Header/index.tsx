import { Box, Button, IconButton, Link, AppBar, Toolbar } from "@mui/material"
import { Menu as MenuIcon } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch } from "../../store"
import { toggleDrawer } from "../../store/drawer/action"
import styles from "./style.module.scss"
import { State } from "../../store/rootReducer"
import { TemporaryDrawer } from "../TemporaryDrawer"

export const Header = () => {
  const dispatch: Dispatch = useDispatch()
  const drawerState = useSelector((state: State) => state.drawer)

  return (
    <AppBar position="fixed" className={styles.AppBar}>
      {/*on small screens show side bar only when menu icon is clicked*/}
      {drawerState.isOpen && <TemporaryDrawer />}

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
            dispatch(toggleDrawer(true))
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
    </AppBar>
  )
}
