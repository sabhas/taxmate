import { TabContext, TabPanel } from "@mui/lab"
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tabs,
  TextField,
  Typography
} from "@mui/material"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import Layout from "../layout"
import * as styles from "../scss/taxCalculator.module.scss"
import { IncomeSource, Sector, TaxType } from "../types"
import { calculateIncome, calculateTax } from "../utils"
import { Sectors } from "../utils/"

export const Head = () => {
  return (
    <>
      <title>Taxmate - Tax Calculator</title>
    </>
  )
}

export default () => {
  const [tabValue, setTabValue] = React.useState<"Tax" | "Income">("Tax")

  return (
    <Layout>
      <Box className={styles.container}>
        <Typography variant="h4" color="primary" gutterBottom>
          Tax Calculator
        </Typography>
        <Paper elevation={3}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                variant="fullWidth"
                value={tabValue}
                onChange={(e, value) => setTabValue(value)}
              >
                <Tab label="Tax" value={"Tax"} />
                <Tab label="Income" value={"Income"} />
              </Tabs>
            </Box>
            <TabPanel value="Tax">
              <Box className={styles.inputWrapper}>
                <TaxCalculator />
              </Box>
            </TabPanel>
            <TabPanel value="Income">
              <Box className={styles.inputWrapper}>
                <IncomeCalculator />
              </Box>
            </TabPanel>
          </TabContext>
        </Paper>
      </Box>
    </Layout>
  )
}

const formatNumber = (value: number) => {
  return new Intl.NumberFormat().format(Math.round(value))
}

const unformatNumber = (value: string) => {
  return parseFloat(value.replace(/,/g, "")) || 0
}

type AmountInputProps = {
  label: string
  value: number
  onChange: Dispatch<SetStateAction<number>>
}

const AmountInput = ({ label, value, onChange }: AmountInputProps) => {
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

type IncomeSourceSelectProps = {
  value: IncomeSource
  onChange: Dispatch<SetStateAction<IncomeSource>>
}

const IncomeSourceSelect = ({ value, onChange }: IncomeSourceSelectProps) => (
  <FormControl fullWidth margin="normal">
    <InputLabel id="income-source-select-label">Income Source</InputLabel>
    <Select
      labelId="income-source-select-label"
      label="Income Source"
      value={value}
      onChange={(e) => onChange(e.target.value as IncomeSource)}
    >
      {Object.values(IncomeSource).map((source) => (
        <MenuItem key={source} value={source}>
          {source}
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

const TaxCalculator = () => {
  const [salaryIncome, setSalaryIncome] = useState(0)
  const [businessIncome, setBusinessIncome] = useState(0)
  const [shareFromAop, setShareFromAop] = useState(0)
  const [propertyIncome, setPropertyIncome] = useState(0)
  const [turnover, setTurnover] = useState(0)
  const [selectedSector, setSelectedSector] = useState(Sectors[0])
  const [taxYear, setTaxYear] = useState(TaxYears[0])
  const [totalTax, setTotalTax] = useState(0)
  const [taxDetail, setTaxDetail] = useState({
    propertyTax: 0,
    grossTax: 0,
    taxCredit: 0,
    netTax: 0,
    turnoverTax: 0
  })

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
    let turnoverTax = 0
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

    const grossTax = salaryTax + businessTax
    if (totalIncome > 0) {
      taxCredit = (grossTax / totalIncome) * shareFromAop
    }

    const netTax = grossTax - taxCredit

    // consider turnover tax only if it is more than or equal to 100 million
    if (turnover >= 100000000) {
      const turnoverTaxRate = selectedSector.taxRate[taxYear]
      turnoverTax = turnover * turnoverTaxRate
    }

    setTotalTax(Math.max(netTax, turnoverTax) + propertyTax)
    setTaxDetail({
      propertyTax,
      grossTax,
      taxCredit,
      netTax,
      turnoverTax
    })
  }

  return (
    <>
      <AmountInput
        label="Salary Income"
        value={salaryIncome}
        onChange={setSalaryIncome}
      />
      <AmountInput
        label="Business Income"
        value={businessIncome}
        onChange={setBusinessIncome}
      />
      <AmountInput
        label="Share from AOP"
        value={shareFromAop}
        onChange={setShareFromAop}
      />
      <AmountInput
        label="Property Income"
        value={propertyIncome}
        onChange={setPropertyIncome}
      />
      <AmountInput
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
      <Button variant="contained" color="primary" onClick={handleCalculateTax}>
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
        Tax Details
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Property Tax</TableCell>
              <TableCell>{formatNumber(taxDetail.propertyTax)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Gross Tax</TableCell>
              <TableCell>{formatNumber(taxDetail.grossTax)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tax Credit</TableCell>
              <TableCell>{formatNumber(taxDetail.taxCredit)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Net Tax</TableCell>
              <TableCell>{formatNumber(taxDetail.netTax)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Turnover Tax</TableCell>
              <TableCell>{formatNumber(taxDetail.turnoverTax)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Total Tax</TableCell>
              <TableCell>{formatNumber(totalTax)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

const IncomeCalculator = () => {
  const [totalTax, setTotalTax] = useState(0)
  const [incomeSource, setIncomeSource] = useState(IncomeSource.Salary)
  const [taxYear, setTaxYear] = useState(TaxYears[0])
  const [income, setIncome] = useState(0)

  const handleCalculate = () => {
    setIncome(calculateIncome(totalTax, taxYear, incomeSource))
  }

  return (
    <>
      <AmountInput label="Total Tax" value={totalTax} onChange={setTotalTax} />
      <IncomeSourceSelect value={incomeSource} onChange={setIncomeSource} />
      <TaxYearSelect value={taxYear} onChange={setTaxYear} />
      <Button variant="contained" color="primary" onClick={handleCalculate}>
        Calculate
      </Button>
      <Typography variant="h5" sx={{ marginTop: "10px" }}>
        Income: {formatNumber(income)}
      </Typography>
    </>
  )
}
