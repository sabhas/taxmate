import React, { Dispatch, SetStateAction } from "react"
import { Drawer, Link, List, ListItemButton } from "@mui/material"

type SidebarProps = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  return (
    <Drawer
      open={isOpen}
      onClose={() => {
        setIsOpen(false)
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
        <ListItemButton>
          <Link underline="none" variant="button">
            Feedback
          </Link>
        </ListItemButton>
      </List>
    </Drawer>
  )
}
