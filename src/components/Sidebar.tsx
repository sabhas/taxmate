import React, { Dispatch, SetStateAction } from "react"
import { Drawer, Link, List, ListItemButton } from "@mui/material"
import { navigate } from "gatsby"

type SidebarProps = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const links = [
  { label: "Home", href: "/#home" },
  { label: "Calculator", href: "/taxCalculator" },
  { label: "News", href: "/news" }
]

export const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const handleNavigation = (href: string) => {
    navigate(href)
    setIsOpen(false)
  }

  return (
    <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
      <List
        sx={{
          minWidth: 150,
          paddingTop: "64px",
          bgcolor: "background.paper"
        }}
        component="nav"
        dense
      >
        {links.map(({ label, href }) => (
          <ListItemButton key={href}>
            <Link
              underline="none"
              variant="button"
              onClick={() => handleNavigation(href)}
            >
              {label}
            </Link>
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  )
}
