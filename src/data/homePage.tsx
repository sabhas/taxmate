import {
  AccountBalance,
  Assessment,
  Assignment as AtlStatusIcon,
  Calculate as CalculatorIcon,
  Description,
  Gavel,
  AssignmentInd as NtnStatusIcon
} from "@mui/icons-material"
import React from "react"

export const services = [
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

export const tools = [
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

export const members = [
  {
    name: "John Doe",
    qualification: "CPA, MBA",
    description:
      "John has over 15 years of experience in tax consulting and has worked with a variety of clients.",
    image: "John.jpg"
  },
  {
    name: "Jane Smith",
    qualification: "CA, B.Com",
    description:
      "Jane specializes in corporate tax planning and compliance, helping businesses optimize their tax strategies.",
    image: "Jane.jpg"
  },
  {
    name: "Alice Brown",
    qualification: "LLB, LLM",
    description:
      "Alice provides expert advice on tax law and represents clients in tax disputes and audits.",
    image: "Alice.jpg"
  }
  // Add more members as needed
]

export const feedbacks = [
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
