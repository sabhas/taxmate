import {
  AccountBalance,
  Assessment,
  Description,
  Gavel
} from "@mui/icons-material"
import { Avatar, Box, Grid, Paper, Typography } from "@mui/material"
import styles from "../style.module.scss"

const services = [
  {
    title: "Tax Preparation",
    description:
      "We provide comprehensive tax preparation services for individuals and businesses.",
    icon: <Description fontSize="large" />
  },
  {
    title: "Tax Planning",
    description:
      "Strategic tax planning to minimize your tax liabilities and maximize your savings.",
    icon: <Assessment fontSize="large" />
  },
  {
    title: "Audit Representation",
    description:
      "Professional representation in the event of an audit, ensuring your interests are protected.",
    icon: <Gavel fontSize="large" />
  },
  {
    title: "Payroll Services",
    description:
      "Complete payroll services to manage your employees' salaries and deductions efficiently.",
    icon: <AccountBalance fontSize="large" />
  }
]

export const Services = () => {
  return (
    <Box className={styles.servicesContainer} id="services">
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        Our Services
      </Typography>
      <Grid container spacing={4}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper className={styles.serviceBox} elevation={3}>
              <Avatar className={styles.icon}>{service.icon}</Avatar>
              <Typography variant="h6">{service.title}</Typography>
              <Typography variant="body2" className={styles.description}>
                {service.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
