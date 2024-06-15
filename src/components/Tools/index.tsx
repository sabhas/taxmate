import { Box, Typography, Grid, Paper, Avatar } from "@mui/material"
import CalculatorIcon from "@mui/icons-material/Calculate"
import NtnStatusIcon from "@mui/icons-material/AssignmentInd"
import AtlStatusIcon from "@mui/icons-material/Assignment"
import styles from "./style.module.scss"

const tools = [
  {
    title: "Calculator",
    description:
      "Use our advanced calculator to compute your tax liabilities quickly and accurately.",
    icon: <CalculatorIcon fontSize="large" />
  },
  {
    title: "NTN Status",
    description:
      "Check the status of your National Tax Number (NTN) effortlessly.",
    icon: <NtnStatusIcon fontSize="large" />
  },
  {
    title: "ATL Status",
    description: "Verify your Active Taxpayer List (ATL) status with ease.",
    icon: <AtlStatusIcon fontSize="large" />
  }
]

export const Tools = () => {
  return (
    <Box className={styles.container}>
      <Typography variant="h4" align="center" gutterBottom>
        Tools
      </Typography>
      <Grid container spacing={4}>
        {tools.map((tool, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper className={styles.toolBox} elevation={3}>
              <Avatar className={styles.icon}>{tool.icon}</Avatar>
              <Typography variant="h6" className={styles.title}>
                {tool.title}
              </Typography>
              <Typography variant="body2" className={styles.description}>
                {tool.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
