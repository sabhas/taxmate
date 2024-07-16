import {
  Assessment,
  Assignment as AtlStatusIcon,
  Calculate as CalculatorIcon,
  Description,
  Gavel,
  MiscellaneousServices,
  AssignmentInd as NtnStatusIcon
} from "@mui/icons-material"
import React from "react"

export const BANNER_MESSAGE =
  "یاد رہے کہ مالی سال 2023-2024 کے گوشوارہ جمع کروانے کی آخری تاریخ 30 ستمبر 2024 مقرر ہے، مقررہ تاریخ  کے بعد گوشوارہ جمع ہونے کے باوجود لیٹ فائلر تصور ہوں گے اور پراپرٹی کی خرید و فروخت پر %3 کی بجائے %6 ایڈوانس ٹیکس ادا کرنا ہوگا"

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
    title: "Audit & Appeals",
    description:
      "Professional representation in the event of an audit, ensuring your interests are protected.",
    icon: <Gavel fontSize="large" />
  },
  {
    title: "Other Services",
    description:
      "Reconciliation of Wealth, NTN / 7E Certificates, GST / PST (PRA) Matters, Tax Refunds",
    icon: <MiscellaneousServices fontSize="large" />
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
    name: "Muhammad Muaaz Khalid",
    qualification: "MBA (Finance & Accounting)",
    designation: "Inland Revenue Officer (Retd.)",
    description:
      "Have 40+ years of vast experience in Audit, Assessment, Enforcement, Monitoring of WHT and much more.",
    image: "MMK.jpg"
  },
  {
    name: "Muhammad Shahid Mehmood",
    qualification: "MBA (Finance & IT), LLB , B.Com, ITP",
    description: "",
    image: "MSM.jpg"
  },
  {
    name: "Muhammad Musab Ghani",
    qualification: "LLB",
    description: "",
    image: "MMG.jpeg"
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
