import { Box, Typography } from "@mui/material"
import styles from "../style.module.scss"

export const Home = () => {
  return (
    <Box className={styles.homeContainer}>
      <Box className={styles.content}>
        <Typography variant="h3">Welcome to Taxmate</Typography>
        <Typography variant="h5">
          Your Trusted Partner in Tax Solutions
        </Typography>
        <Typography variant="body1">
          At Taxmate, we specialize in providing comprehensive tax consultancy
          services tailored to meet the unique needs of individuals, businesses,
          and organizations. With our expertise and commitment, we aim to help
          you navigate the complex world of taxes with ease and confidence.
        </Typography>
      </Box>
      <Box
        className={styles.imageContainer}
        sx={{
          display: {
            xs: "none",
            md: "flex"
          }
        }}
      >
        <img
          src="./image-1.jpg"
          alt="Tax consultancy"
          className={styles.image}
        />
      </Box>
    </Box>
  )
}
