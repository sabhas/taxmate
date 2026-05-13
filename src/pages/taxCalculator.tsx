import { TabContext, TabPanel } from "@mui/lab"
import {
  Autocomplete,
  Box,
  Button,
  InputAdornment,
  MenuItem,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography
} from "@mui/material"
import {
  AccountBalance,
  ArrowForward,
  AttachMoney,
  Business,
  Calculate,
  CalendarMonth,
  Receipt,
  RestartAlt,
  Savings,
  TrendingUp,
  Work
} from "@mui/icons-material"
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
      <Box className={styles.pageWrapper}>
        <Box className={styles.container}>
          <Box className={styles.heroSection}>
            <Typography variant="h4" className={styles.title}>
              Tax Calculator
            </Typography>
            <Typography className={styles.subtitle}>
              Calculate your Pakistan income tax quickly and accurately
            </Typography>
          </Box>

          <Paper className={styles.tabsCard} elevation={0}>
            <TabContext value={tabValue}>
              <Box className={styles.tabsHeader}>
                <Tabs
                  variant="fullWidth"
                  value={tabValue}
                  onChange={(_, value) => setTabValue(value)}
                  classes={{ indicator: styles.tabIndicator }}
                >
                  <Tab
                    icon={<Calculate fontSize="small" />}
                    iconPosition="start"
                    label="Tax from Income"
                    value="Tax"
                    classes={{
                      root: styles.tabRoot,
                      selected: styles.tabSelected
                    }}
                  />
                  <Tab
                    icon={<TrendingUp fontSize="small" />}
                    iconPosition="start"
                    label="Income from Tax"
                    value="Income"
                    classes={{
                      root: styles.tabRoot,
                      selected: styles.tabSelected
                    }}
                  />
                </Tabs>
              </Box>

              <TabPanel value="Tax" className={styles.panelContent}>
                <TaxCalculator />
              </TabPanel>
              <TabPanel value="Income" className={styles.panelContent}>
                <IncomeCalculator />
              </TabPanel>
            </TabContext>
          </Paper>
        </Box>
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
  icon?: React.ReactNode
}

const AmountInput = ({ label, value, onChange, icon }: AmountInputProps) => {
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
      className={styles.styledInput}
      InputProps={{
        startAdornment: icon ? (
          <InputAdornment position="start">{icon}</InputAdornment>
        ) : (
          <InputAdornment position="start">
            <span className={styles.inputPrefix}>Rs</span>
          </InputAdornment>
        )
      }}
    />
  )
}

const TaxYears = [2026, 2025, 2024, 2023, 2022, 2021, 2020]

type TaxYearSelectProps = {
  value: number
  onChange: Dispatch<SetStateAction<number>>
}

const TaxYearSelect = ({ value, onChange }: TaxYearSelectProps) => (
  <TextField
    select
    fullWidth
    label="Tax Year"
    value={value}
    onChange={(e) => onChange(+e.target.value)}
    className={styles.styledInput}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <CalendarMonth fontSize="small" sx={{ color: "#9ca3af" }} />
        </InputAdornment>
      )
    }}
  >
    {TaxYears.map((year) => (
      <MenuItem key={year} value={year}>
        {year}
      </MenuItem>
    ))}
  </TextField>
)

type IncomeSourceSelectProps = {
  value: IncomeSource
  onChange: Dispatch<SetStateAction<IncomeSource>>
}

const IncomeSourceSelect = ({ value, onChange }: IncomeSourceSelectProps) => (
  <TextField
    select
    fullWidth
    label="Income Source"
    value={value}
    onChange={(e) => onChange(e.target.value as IncomeSource)}
    className={styles.styledInput}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <Work fontSize="small" sx={{ color: "#9ca3af" }} />
        </InputAdornment>
      )
    }}
  >
    {Object.values(IncomeSource).map((source) => (
      <MenuItem key={source} value={source}>
        {source}
      </MenuItem>
    ))}
  </TextField>
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
        <TextField
          {...params}
          label="Sector"
          className={styles.styledInput}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <>
                <InputAdornment position="start">
                  <Business fontSize="small" sx={{ color: "#9ca3af" }} />
                </InputAdornment>
                {params.InputProps.startAdornment}
              </>
            )
          }}
        />
      )}
    />
  )
}

const TaxCalculator = () => {
  const [salaryIncome, setSalaryIncome] = useState(0)
  const [businessIncome, setBusinessIncome] = useState(0)
  const [shareFromAop, setShareFromAop] = useState(0)
  const [propertyIncome, setPropertyIncome] = useState(0)
  const [pensionIncome, setPensionIncome] = useState(0)
  const [turnover, setTurnover] = useState(0)
  const [selectedSector, setSelectedSector] = useState(Sectors[0])
  const [taxYear, setTaxYear] = useState(TaxYears[0])
  const [totalTax, setTotalTax] = useState(0)
  const [hasCalculated, setHasCalculated] = useState(false)
  const [taxDetail, setTaxDetail] = useState({
    propertyTax: 0,
    pensionTax: 0,
    grossTax: 0,
    taxCredit: 0,
    netTax: 0,
    turnoverTax: 0
  })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const handleReset = () => {
    setSalaryIncome(0)
    setBusinessIncome(0)
    setShareFromAop(0)
    setPropertyIncome(0)
    setPensionIncome(0)
    setTurnover(0)
    setTotalTax(0)
    setHasCalculated(false)
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
      const netPropertyIncome = propertyIncome * 0.8
      netBusinessIncome += netPropertyIncome
    }

    const totalIncome = salaryIncome + netBusinessIncome

    if (salaryIncome > 0.75 * totalIncome) {
      salaryTax = calculateTax(
        salaryIncome + netBusinessIncome,
        taxYear,
        TaxType.Salary
      )
    } else {
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

    if (turnover >= 100000000) {
      const turnoverTaxRate = selectedSector.taxRate[taxYear]
      turnoverTax = turnover * turnoverTaxRate
    }

    const pensionTax = calculateTax(pensionIncome, taxYear, TaxType.Pension)

    setTotalTax(Math.max(netTax, turnoverTax) + propertyTax + pensionTax)
    setTaxDetail({
      propertyTax,
      pensionTax,
      grossTax,
      taxCredit,
      netTax,
      turnoverTax
    })
    setHasCalculated(true)
  }

  const resultRows = [
    { label: "Gross Tax", value: taxDetail.grossTax },
    { label: "Tax Credit", value: taxDetail.taxCredit },
    { label: "Net Tax", value: taxDetail.netTax },
    { label: "Turnover Tax", value: taxDetail.turnoverTax },
    { label: "Property Tax", value: taxDetail.propertyTax },
    { label: "Pension Tax", value: taxDetail.pensionTax }
  ]

  return (
    <>
      <Box className={styles.formSection}>
        <Typography className={styles.sectionLabel}>
          <CalendarMonth className={styles.sectionIcon} />
          Tax Year
        </Typography>
        <Box className={styles.fieldsGrid}>
          <TaxYearSelect value={taxYear} onChange={setTaxYear} />
        </Box>
      </Box>

      <Box className={styles.formSection}>
        <Typography className={styles.sectionLabel}>
          <AttachMoney className={styles.sectionIcon} />
          Income Sources
        </Typography>
        <Box className={styles.fieldsGrid}>
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
          {taxYear >= 2026 && (
            <AmountInput
              label="Pension Income"
              value={pensionIncome}
              onChange={setPensionIncome}
            />
          )}
        </Box>
      </Box>

      <Box className={styles.formSection}>
        <Typography className={styles.sectionLabel}>
          <AccountBalance className={styles.sectionIcon} />
          Turnover
        </Typography>
        <Box className={styles.fieldsGrid}>
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
        </Box>
      </Box>

      <Box className={styles.buttonGroup}>
        <Button
          variant="contained"
          className={styles.calculateBtn}
          onClick={handleCalculateTax}
          endIcon={<ArrowForward />}
          disableElevation
        >
          Calculate Tax
        </Button>
        {hasCalculated && (
          <Button
            variant="text"
            className={styles.resetBtn}
            onClick={handleReset}
            startIcon={<RestartAlt />}
          >
            Reset
          </Button>
        )}
      </Box>

      {hasCalculated && (
        <Box className={styles.resultsSection}>
          <Box className={styles.resultsHeader}>
            <Box className={styles.resultsIcon}>
              <Receipt fontSize="small" />
            </Box>
            <Typography className={styles.resultsTitle}>
              Tax Breakdown
            </Typography>
          </Box>

          <Paper className={styles.resultsCard} elevation={0}>
            {resultRows.map(({ label, value }) => (
              <Box key={label} className={styles.resultRow}>
                <Typography className={styles.resultLabel}>{label}</Typography>
                <Typography className={styles.resultValue}>
                  Rs {formatNumber(value)}
                </Typography>
              </Box>
            ))}
            <Box className={`${styles.resultRow} ${styles.totalRow}`}>
              <Typography className={styles.resultLabel}>Total Tax</Typography>
              <Typography className={styles.resultValue}>
                Rs {formatNumber(totalTax)}
              </Typography>
            </Box>
          </Paper>
        </Box>
      )}
    </>
  )
}

const IncomeCalculator = () => {
  const [totalTax, setTotalTax] = useState(0)
  const [incomeSource, setIncomeSource] = useState(IncomeSource.Salary)
  const [taxYear, setTaxYear] = useState(TaxYears[0])
  const [income, setIncome] = useState(0)
  const [hasCalculated, setHasCalculated] = useState(false)

  const handleCalculate = () => {
    setIncome(calculateIncome(totalTax, taxYear, incomeSource))
    setHasCalculated(true)
  }

  const handleReset = () => {
    setTotalTax(0)
    setIncome(0)
    setHasCalculated(false)
  }

  return (
    <>
      <Box className={styles.formSection}>
        <Typography className={styles.sectionLabel}>
          <CalendarMonth className={styles.sectionIcon} />
          Tax Year
        </Typography>
        <Box className={styles.fieldsGrid}>
          <TaxYearSelect value={taxYear} onChange={setTaxYear} />
        </Box>
      </Box>

      <Box className={styles.formSection}>
        <Typography className={styles.sectionLabel}>
          <Savings className={styles.sectionIcon} />
          Reverse Calculation
        </Typography>
        <Box className={styles.fieldsGrid}>
          <AmountInput
            label="Total Tax Paid"
            value={totalTax}
            onChange={setTotalTax}
          />
          <IncomeSourceSelect value={incomeSource} onChange={setIncomeSource} />
        </Box>
      </Box>

      <Box className={styles.buttonGroup}>
        <Button
          variant="contained"
          className={styles.calculateBtn}
          onClick={handleCalculate}
          endIcon={<ArrowForward />}
          disableElevation
        >
          Calculate Income
        </Button>
        {hasCalculated && (
          <Button
            variant="text"
            className={styles.resetBtn}
            onClick={handleReset}
            startIcon={<RestartAlt />}
          >
            Reset
          </Button>
        )}
      </Box>

      {hasCalculated && (
        <Box className={styles.incomeResult}>
          <Typography className={styles.incomeLabel}>
            Estimated Income
          </Typography>
          <Typography className={styles.incomeValue}>
            Rs {formatNumber(income)}
          </Typography>
        </Box>
      )}
    </>
  )
}
