import React, { useEffect, useState } from "react"
import { IconButton } from "@mui/material"
import LightModeIcon from "@mui/icons-material/LightMode"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import { useColorScheme } from "@mui/material/styles"

const STORAGE_KEY = "taxmate-color-scheme"

export const ThemeToggleButton = () => {
  const { mode, setMode } = useColorScheme()
  const [mounted, setMounted] = useState(false)

  // On mount, pick up the choice stored by the no-flash script (or default).
  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem(STORAGE_KEY) as "light" | "dark" | null
    if (stored === "light" || stored === "dark") {
      setMode(stored)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!mounted || !mode) {
    return (
      <IconButton disabled aria-label="Toggle color scheme" sx={{ color: "primary.main" }}>
        <LightModeIcon />
      </IconButton>
    )
  }

  const handleToggle = () => {
    const next = mode === "dark" ? "light" : "dark"
    setMode(next)
    localStorage.setItem(STORAGE_KEY, next)
  }

  const isDark = mode === "dark"

  return (
    <IconButton
      onClick={handleToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      sx={{ color: "primary.main" }}
    >
      {isDark ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  )
}