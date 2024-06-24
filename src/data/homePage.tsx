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
