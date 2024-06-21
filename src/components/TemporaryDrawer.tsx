import { Drawer, Link, List, ListItemButton } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Dispatch } from "../store"
import { toggleDrawer } from "../store/drawer/action"
import { State } from "../store/rootReducer"

export const TemporaryDrawer = () => {
  const navigate = useNavigate()
  const drawerState = useSelector((state: State) => state.drawer)
  const dispatch: Dispatch = useDispatch()

  return (
    <Drawer
      open={drawerState.isOpen}
      onClose={() => {
        dispatch(toggleDrawer(false))
      }}
    >
      <List
        sx={{
          minWidth: 150,
          paddingTop: "64px",
          bgcolor: "background.paper"
        }}
        component="nav"
        dense={true}
      >
        <ListItemButton>
          <Link
            underline="none"
            variant="button"
            onClick={() => navigate("home")}
          >
            Home
          </Link>
        </ListItemButton>
        <ListItemButton>
          <Link
            underline="none"
            variant="button"
            onClick={() => navigate("services")}
          >
            Services
          </Link>
        </ListItemButton>
        <ListItemButton>
          <Link
            underline="none"
            variant="button"
            onClick={() => navigate("tools")}
          >
            Tools
          </Link>
        </ListItemButton>
        <ListItemButton>
          <Link
            underline="none"
            variant="button"
            onClick={() => navigate("aboutUs")}
          >
            About Us
          </Link>
        </ListItemButton>
        <ListItemButton>
          <Link
            underline="none"
            variant="button"
            onClick={() => navigate("feedback")}
          >
            Feedback
          </Link>
        </ListItemButton>
      </List>
    </Drawer>
  )
}
