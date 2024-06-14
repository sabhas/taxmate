import { Drawer, Link, List, ListItemButton, ListItemText } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch } from "../store"
import { toggleDrawer } from "../store/drawer/action"
import { State } from "../store/rootReducer"

export const TemporaryDrawer = () => {
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
          <Link underline="none" variant="button">
            Home
          </Link>
        </ListItemButton>
        <ListItemButton>
          <Link underline="none" variant="button">
            Services
          </Link>
        </ListItemButton>
        <ListItemButton>
          <Link underline="none" variant="button">
            Tools
          </Link>
        </ListItemButton>
        <ListItemButton>
          <Link underline="none" variant="button">
            About Us
          </Link>
        </ListItemButton>
      </List>
    </Drawer>
  )
}
