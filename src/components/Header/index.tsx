import { Menu as MenuIcon } from "@mui/icons-material"
import { AppBar, Box, Button, IconButton, Link, Toolbar } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Dispatch } from "../../store"
import { toggleDrawer } from "../../store/drawer/action"
import { State } from "../../store/rootReducer"
import { TemporaryDrawer } from "../TemporaryDrawer"
import styles from "./style.module.scss"

export const Header = () => {
  const navigate = useNavigate()
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
          <img src="./logo.png" alt="Logo" />
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
          <Link
            underline="none"
            variant="button"
            onClick={() => navigate("home")}
          >
            Home
          </Link>
          <Link
            underline="none"
            variant="button"
            onClick={() => navigate("services")}
          >
            Services
          </Link>
          <Link
            underline="none"
            variant="button"
            onClick={() => navigate("tools")}
          >
            Tools
          </Link>
          <Link
            underline="none"
            variant="button"
            onClick={() => navigate("aboutUs")}
          >
            About Us
          </Link>
          <Link
            underline="none"
            variant="button"
            onClick={() => navigate("feedback")}
          >
            feedback
          </Link>
        </Box>

        <Box className={styles.rightSideBox}>
          <Button
            variant="contained"
            onClick={() => {
              navigate("contactUs")
            }}
          >
            Book Appointment
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
