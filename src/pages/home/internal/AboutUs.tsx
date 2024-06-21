import { Box, Typography, Grid, Paper } from "@mui/material"
import styles from "../style.module.scss"

const members = [
  {
    name: "John Doe",
    qualification: "CPA, MBA",
    description:
      "John has over 15 years of experience in tax consulting and has worked with a variety of clients.",
    image: "./John.jpg"
  },
  {
    name: "Jane Smith",
    qualification: "CA, B.Com",
    description:
      "Jane specializes in corporate tax planning and compliance, helping businesses optimize their tax strategies.",
    image: "./Jane.jpg"
  },
  {
    name: "Alice Brown",
    qualification: "LLB, LLM",
    description:
      "Alice provides expert advice on tax law and represents clients in tax disputes and audits.",
    image: "./Alice.jpg"
  }
  // Add more members as needed
]

export const AboutUs = () => {
  return (
    <Box className={styles.aboutUsContainer}>
      <Typography variant="h4" align="center" gutterBottom>
        About Us
      </Typography>
      <Grid container spacing={4}>
        {members.map((member, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper className={styles.memberBox} elevation={3}>
              <img
                src={member.image}
                alt={member.name}
                className={styles.avatar}
              />
              <Typography variant="h6" className={styles.name}>
                {member.name}
              </Typography>
              <Typography variant="body2" className={styles.qualification}>
                {member.qualification}
              </Typography>
              <Typography variant="body2" className={styles.description}>
                {member.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
