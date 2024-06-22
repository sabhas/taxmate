// src/TaxCalculator.js
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from "@mui/material"
import { Dispatch, SetStateAction, useState } from "react"
import { calculateTax, TaxType } from "../../utils"
import styles from "./style.module.scss"

export const TaxCalculator = () => {
  const [salaryIncome, setSalaryIncome] = useState(0)
  const [businessIncome, setBusinessIncome] = useState(0)
  const [propertyIncome, setPropertyIncome] = useState(0)
  const [taxYear, setTaxYear] = useState(2022)
  const [totalTax, setTotalTax] = useState(0)

  const handleCalculateTax = () => {
    let propertyTax = 0
    let businessTax = 0
    let salaryTax = 0
    let netBusinessIncome = businessIncome

    if (taxYear <= 2021) {
      propertyTax = calculateTax(propertyIncome, taxYear, TaxType.Property)
    } else {
      // from 2022 property tax was clubbed in to general tax (business)
      // also 20% of the gross property income can be deducted for repair and maintenance costs.
      const netPropertyIncome = propertyIncome * 0.8
      netBusinessIncome += netPropertyIncome
    }

    const totalIncome = salaryIncome + netBusinessIncome

    if (salaryIncome < 0.75 * totalIncome) {
      // Apply business tax rate to salary income
      businessTax = calculateTax(
        netBusinessIncome + salaryIncome,
        taxYear,
        TaxType.Business
      )
    } else {
      salaryTax = calculateTax(
        salaryIncome + netBusinessIncome,
        taxYear,
        TaxType.Salary
      )
    }

    setTotalTax(propertyTax + salaryTax + businessTax)
  }

  return (
    <Box className={styles.container}>
      <Typography variant="h4" gutterBottom>
        Tax Calculator
      </Typography>
      <Paper elevation={3} className={styles.inputWrapper}>
        <IncomeInput
          label="Salary Income"
          value={salaryIncome}
          onChange={setSalaryIncome}
        />
        <IncomeInput
          label="Business Income"
          value={businessIncome}
          onChange={setBusinessIncome}
        />
        <IncomeInput
          label="Property Income"
          value={propertyIncome}
          onChange={setPropertyIncome}
        />
        <TaxYearSelect value={taxYear} onChange={setTaxYear} />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCalculateTax}
        >
          Calculate Tax
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "darkred",
            marginTop: "10px"
          }}
          onClick={handleCalculateTax}
        >
          Reset
        </Button>
        <Typography variant="h5" sx={{ marginTop: "10px" }}>
          Total Tax: {totalTax}
        </Typography>
      </Paper>
    </Box>
  )
}

const formatNumber = (value: number) => {
  return new Intl.NumberFormat().format(value)
}

const unformatNumber = (value: string) => {
  return parseFloat(value.replace(/,/g, "")) || 0
}

type IncomeInputProps = {
  label: string
  value: number
  onChange: Dispatch<SetStateAction<number>>
}

const IncomeInput = ({ label, value, onChange }: IncomeInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const unformattedValue = unformatNumber(event.target.value)
    onChange(unformattedValue)
  }

  return (
    <TextField
      fullWidth
      label={label}
      type="text"
      value={value ? formatNumber(value) : ""}
      onChange={handleChange}
      margin="normal"
    />
  )
}
type TaxYearSelectProps = {
  value: number
  onChange: Dispatch<SetStateAction<number>>
}

const TaxYearSelect = ({ value, onChange }: TaxYearSelectProps) => (
  <FormControl fullWidth margin="normal">
    <InputLabel id="tax-year-select-label">Tax Year</InputLabel>
    <Select
      labelId="tax-year-select-label"
      label="Tax Year"
      value={value}
      onChange={(e) => onChange(+e.target.value)}
    >
      {[2020, 2021, 2022, 2023, 2024, 2025].map((year) => (
        <MenuItem key={year} value={year}>
          {year}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
)
