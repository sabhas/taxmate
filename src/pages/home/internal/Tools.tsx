import AtlStatusIcon from "@mui/icons-material/Assignment"
import NtnStatusIcon from "@mui/icons-material/AssignmentInd"
import CalculatorIcon from "@mui/icons-material/Calculate"
import { Avatar, Box, Grid, Paper, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import styles from "../style.module.scss"

const tools = [
  {
    title: "Calculator",
    description:
      "Use our advanced calculator to compute your tax liabilities quickly and accurately.",
    icon: <CalculatorIcon fontSize="large" />,
    link: "/taxCalculator"
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
  const navigate = useNavigate()

  return (
    <Box className={styles.toolsContainer} id="tools">
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        Tools
      </Typography>
      <Grid container spacing={4}>
        {tools.map((tool, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
            onClick={() => {
              if (tool.link) navigate(tool.link)
            }}
          >
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
