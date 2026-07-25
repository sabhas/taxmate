import React, { Dispatch, SetStateAction, useState } from "react"
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  List
} from "@mui/material"
import CalculateIcon from "@mui/icons-material/Calculate"
import HomeIcon from "@mui/icons-material/Home"
import NewspaperIcon from "@mui/icons-material/Newspaper"
import HomeWorkIcon from "@mui/icons-material/HomeWork"
import { Link } from "gatsby"

type SidebarProps = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const links = [
  { label: "Home", href: "/#home", icon: <HomeIcon /> },
  { label: "Calculator", href: "/taxCalculator", icon: <CalculateIcon /> },
  {
    label: "Property Transfer Fees",
    href: "/propertyTransferFees",
    icon: <HomeWorkIcon />
  },
  { label: "News", href: "/news", icon: <NewspaperIcon /> }
]

const getCurrentPath = () =>
  typeof window !== "undefined" ? window.location.pathname : "/"

export const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  // Sidebar remounts each time it opens, so reading the current pathname
  // at mount is accurate for highlighting the active route.
  const [currentPath] = useState(getCurrentPath)

  return (
    <Drawer
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-label="Site navigation"
    >
      <List
        sx={{
          minWidth: 260,
          paddingTop: "64px",
          bgcolor: "background.paper"
        }}
        component="nav"
        dense
      >
        {links.map(({ label, href, icon }) => {
          const linkPath = href.startsWith("/#") ? "/" : href
          const isActive = currentPath === linkPath

          return (
            <ListItemButton
              key={href}
              component={Link}
              to={href}
              selected={isActive}
              onClick={() => setIsOpen(false)}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                  "& .MuiListItemIcon-root": {
                    color: "primary.contrastText"
                  }
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "primary.dark"
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{icon}</ListItemIcon>
              <ListItemText
                primary={label}
                primaryTypographyProps={{ fontWeight: 500 }}
              />
            </ListItemButton>
          )
        })}
      </List>
    </Drawer>
  )
}