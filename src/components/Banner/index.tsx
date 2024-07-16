import React from "react"
import { Box, Typography } from "@mui/material"
import * as styles from "./style.module.scss"

interface BannerProps {
  message: string
}

export const Banner = ({ message }: BannerProps) => {
  return (
    <Box className={styles.bannerContainer}>
      <Typography component="div" className={styles.bannerText}>
        {message}
      </Typography>
    </Box>
  )
}
