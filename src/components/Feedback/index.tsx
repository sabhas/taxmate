import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import { Box, Typography } from "@mui/material"
import styles from "./style.module.scss"

const feedbacks = [
  {
    name: "John Doe",
    role: "Co-Founder",
    feedback:
      "While looking in the matter of Company Registration in Pakistan. I contacted Tax Calculator for Company Registration for doing work in Medical Science Research. Outstanding services and highly recommended to work with.",
    image: "https://picsum.photos/id/1005/60/60"
  },
  {
    name: "Alice Green",
    role: "HR Manager",
    feedback:
      "Tax Calculator is a Professional Firm who help people for Company Registration in Lahore and filing Income Tax Return. Me and my colleagues in Company have get benefited filing Tax Calculator.",
    image: "https://picsum.photos/id/1011/60/60"
  },
  {
    name: "Mathew Brown",
    role: "Co-Founder",
    feedback:
      "While looking in the matter of Company Registration in Pakistan. I contacted Tax Calculator for Company Registration for doing work in Medical Science Research. Outstanding services and highly recommended to work with.",
    image: "https://picsum.photos/id/1005/60/60"
  },
  {
    name: "Mike Robert",
    role: "HR Manager",
    feedback:
      "Tax Calculator is a Professional Firm who help people for Company Registration in Lahore and filing Income Tax Return. Me and my colleagues in Company have get benefited filing Tax Calculator.",
    image: "https://picsum.photos/id/1011/60/60"
  },
  {
    name: "Garry Simpson",
    role: "Co-Founder",
    feedback:
      "While looking in the matter of Company Registration in Pakistan. I contacted Tax Calculator for Company Registration for doing work in Medical Science Research. Outstanding services and highly recommended to work with.",
    image: "https://picsum.photos/id/1005/60/60"
  },
  {
    name: "Tom Holland",
    role: "HR Manager",
    feedback:
      "Tax Calculator is a Professional Firm who help people for Company Registration in Lahore and filing Income Tax Return. Me and my colleagues in Company have get benefited filing Tax Calculator.",
    image: "https://picsum.photos/id/1011/60/60"
  }
  // Add more feedbacks as needed
]

export const Feedback = () => {
  return (
    <Box className={styles.container}>
      <Typography variant="h4" align="center" gutterBottom>
        Customers Feedback
      </Typography>
      <Typography
        variant="h6"
        align="center"
        color="textSecondary"
        gutterBottom
      >
        What Customers Think About Taxmate
      </Typography>
      <Carousel
        infinite
        pauseOnHover
        centerMode
        autoPlay
        shouldResetAutoplay={false}
        responsive={{
          desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 2
          },
          mobile: {
            breakpoint: { max: 1024, min: 0 },
            items: 1
          }
        }}
        sliderClass={styles.slider}
      >
        {feedbacks.map((feedback, index) => (
          <Box key={index} className={styles.feedbackBox}>
            <img src={feedback.image} alt={feedback.name} />
            <Typography variant="h6" className={styles.customerName}>
              {feedback.name}
            </Typography>
            <Typography variant="body2" className={styles.customerRole}>
              {feedback.role}
            </Typography>
            <Typography variant="body2" className={styles.feedback}>
              {feedback.feedback}
            </Typography>
          </Box>
        ))}
      </Carousel>
    </Box>
  )
}
