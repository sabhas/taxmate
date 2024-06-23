import {
  Autocomplete,
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
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { calculateTax } from "../../utils"
import styles from "./style.module.scss"
import { Sector, TaxType } from "../../types"
import { Sectors } from "../../utils/sectors"

export const TaxCalculator = () => {
  const [salaryIncome, setSalaryIncome] = useState(0)
  const [businessIncome, setBusinessIncome] = useState(0)
  const [shareFromAop, setShareFromAop] = useState(0)
  const [propertyIncome, setPropertyIncome] = useState(0)
  const [turnover, setTurnover] = useState(0)
  const [selectedSector, setSelectedSector] = useState(Sectors[0])
  const [taxYear, setTaxYear] = useState(TaxYears[0])
  const [totalTax, setTotalTax] = useState(0)

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }, [])

  const handleReset = () => {
    setSalaryIncome(0)
    setBusinessIncome(0)
    setShareFromAop(0)
    setPropertyIncome(0)
    setTurnover(0)
    setTotalTax(0)
  }

  const handleCalculateTax = () => {
    let propertyTax = 0
    let businessTax = 0
    let salaryTax = 0
    let taxCredit = 0
    let netBusinessIncome = businessIncome + shareFromAop

    if (taxYear <= 2021) {
      propertyTax = calculateTax(propertyIncome, taxYear, TaxType.Property)
    } else {
      // from 2022 property tax was clubbed in to general tax (business)
      // also 20% of the gross property income can be deducted for repair and maintenance costs.
      const netPropertyIncome = propertyIncome * 0.8
      netBusinessIncome += netPropertyIncome
    }

    const totalIncome = salaryIncome + netBusinessIncome

    if (salaryIncome > 0.75 * totalIncome) {
      // apply salary tax rate
      salaryTax = calculateTax(
        salaryIncome + netBusinessIncome,
        taxYear,
        TaxType.Salary
      )
    } else {
      // Apply business tax rate
      businessTax = calculateTax(
        netBusinessIncome + salaryIncome,
        taxYear,
        TaxType.Business
      )
    }

    const grossTotalTax = salaryTax + businessTax
    if (totalIncome > 0) {
      taxCredit = (grossTotalTax / totalIncome) * shareFromAop
    }

    const normalTax = grossTotalTax - taxCredit

    const turnoverTaxRate = selectedSector.taxRate[taxYear]
    const turnoverTax = turnover * turnoverTaxRate

    setTotalTax(Math.max(normalTax, turnoverTax) + propertyTax)
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
          label="Share from AOP"
          value={shareFromAop}
          onChange={setShareFromAop}
        />
        <IncomeInput
          label="Property Income"
          value={propertyIncome}
          onChange={setPropertyIncome}
        />
        <IncomeInput
          label="Annual Turnover"
          value={turnover}
          onChange={setTurnover}
        />
        {turnover > 0 && (
          <SectorSelect
            selectedSector={selectedSector}
            onChange={setSelectedSector}
          />
        )}
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
          onClick={handleReset}
        >
          Reset
        </Button>
        <Typography variant="h5" sx={{ marginTop: "10px" }}>
          Total Tax: {formatNumber(totalTax)}
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

const TaxYears = [2025, 2024, 2023, 2022, 2021, 2020]

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
      {TaxYears.map((year) => (
        <MenuItem key={year} value={year}>
          {year}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
)

type SectorSelectProps = {
  selectedSector: Sector
  onChange: Dispatch<SetStateAction<Sector>>
}

const SectorSelect = ({ selectedSector, onChange }: SectorSelectProps) => {
  return (
    <Autocomplete
      fullWidth
      disableClearable
      options={Sectors}
      getOptionLabel={(option) => option.label}
      value={selectedSector}
      onChange={(_: any, newValue: Sector) => onChange(newValue)}
      renderInput={(params) => (
        <TextField {...params} label="Sector" margin="normal" fullWidth />
      )}
    />
  )
}
