import { TabContext, TabPanel } from "@mui/lab"
import {
  Alert,
  Autocomplete,
  Box,
  InputAdornment,
  MenuItem,
  Tab,
  Tabs,
  TextField,
  Typography
} from "@mui/material"
import {
  AccountBalance,
  AttachMoney,
  Business,
  Calculate,
  CalendarMonth,
  Savings,
  TrendingUp
} from "@mui/icons-material"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import Layout from "../layout"
import {
  AmountInput,
  ButtonRow,
  CalculateButton,
  FormSection,
  PageShell,
  ResetButton,
  ResultSection,
  TaxYearSelect,
  TaxYears,
  TabsCard,
  TabsHeader,
  tabSx,
  formatNumber
} from "../components/Calculator"
import { IncomeSource, Sector, TaxType } from "../types"
import { calculateIncome, calculateTax } from "../utils"
import { Sectors } from "../utils/"

export const Head = () => (
  <>
    <title>Taxmate - Tax Calculator</title>
  </>
)

const panelSx = { padding: { xs: "24px 16px", sm: "32px 28px" } } as const

export default () => {
  const [tabValue, setTabValue] = React.useState<"Tax" | "Income">("Tax")

  return (
    <Layout>
      <PageShell
        title="Tax Calculator"
        subtitle="Calculate your Pakistan income tax quickly and accurately"
      >
        <TabsCard>
          <TabContext value={tabValue}>
            <TabsHeader>
              <Tabs
                variant="fullWidth"
                value={tabValue}
                onChange={(_, value) => setTabValue(value)}
                TabIndicatorProps={{ style: { display: "none" } }}
              >
                <Tab
                  icon={<Calculate fontSize="small" />}
                  iconPosition="start"
                  label="Tax from Income"
                  value="Tax"
                  sx={tabSx.root}
                />
                <Tab
                  icon={<TrendingUp fontSize="small" />}
                  iconPosition="start"
                  label="Income from Tax"
                  value="Income"
                  sx={tabSx.root}
                />
              </Tabs>
            </TabsHeader>

            <TabPanel value="Tax" sx={panelSx}>
              <TaxCalculator />
            </TabPanel>
            <TabPanel value="Income" sx={panelSx}>
              <IncomeCalculator />
            </TabPanel>
          </TabContext>
        </TabsCard>
      </PageShell>
    </Layout>
  )
}

const IncomeSourceSelect = ({
  value,
  onChange
}: {
  value: IncomeSource
  onChange: Dispatch<SetStateAction<IncomeSource>>
}) => (
  <TextField
    select
    fullWidth
    label="Income Source"
    value={value}
    onChange={(e) => onChange(e.target.value as IncomeSource)}
  >
    {Object.values(IncomeSource).map((source) => (
      <MenuItem key={source} value={source}>
        {source}
      </MenuItem>
    ))}
  </TextField>
)

const SectorSelect = ({
  selectedSector,
  onChange
}: {
  selectedSector: Sector
  onChange: Dispatch<SetStateAction<Sector>>
}) => (
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
        InputProps={{
          ...params.InputProps,
          startAdornment: (
            <>
              <InputAdornment position="start">
                <Business fontSize="small" sx={{ color: "text.disabled" }} />
              </InputAdornment>
              {params.InputProps.startAdornment}
            </>
          )
        }}
      />
    )}
  />
)

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
  const [showEmptyWarning, setShowEmptyWarning] = useState(false)
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
    setShowEmptyWarning(false)
  }

  const handleCalculateTax = () => {
    const hasAnyIncome =
      salaryIncome +
        businessIncome +
        shareFromAop +
        propertyIncome +
        pensionIncome +
        turnover >
      0

    if (!hasAnyIncome) {
      setShowEmptyWarning(true)
      setHasCalculated(false)
      return
    }
    setShowEmptyWarning(false)

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

  const taxRows = [
    { label: "Gross Tax", value: taxDetail.grossTax },
    { label: "Tax Credit", value: taxDetail.taxCredit },
    { label: "Net Tax", value: taxDetail.netTax },
    { label: "Turnover Tax", value: taxDetail.turnoverTax },
    { label: "Property Tax", value: taxDetail.propertyTax },
    { label: "Pension Tax", value: taxDetail.pensionTax }
  ]

  return (
    <Box
      component="form"
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault()
        handleCalculateTax()
      }}
    >
      <FormSection label="Tax Year" icon={<CalendarMonth />}>
        <TaxYearSelect value={taxYear} onChange={setTaxYear} />
      </FormSection>

      <FormSection label="Income Sources" icon={<AttachMoney />}>
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
            helperText="Pension income tax applies from FY2026"
          />
        )}
      </FormSection>

      <FormSection label="Turnover" icon={<AccountBalance />}>
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
      </FormSection>

      <ButtonRow>
        <CalculateButton onClick={handleCalculateTax} label="Calculate Tax" />
        {hasCalculated && <ResetButton onClick={handleReset} />}
      </ButtonRow>

      {showEmptyWarning && (
        <Alert severity="warning" sx={{ mt: 2 }} icon={false}>
          Please enter at least one income or turnover amount.
        </Alert>
      )}

      {hasCalculated && (
        <ResultSection title="Tax Breakdown" rows={taxRows} />
      )}

      {hasCalculated && (
        <Box
          mt={3}
          pt={2}
          borderTop="1px solid #e5e7eb"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px={2.5}
            py={2}
          >
            <Typography fontWeight={700}>Total Tax</Typography>
            <Typography fontWeight={800} fontSize="1.2rem">
              Rs {formatNumber(totalTax)}
            </Typography>
          </Box>
        </Box>
      )}
      <button type="submit" style={{ display: "none" }} aria-hidden="true" />
    </Box>
  )
}

const IncomeCalculator = () => {
  const [totalTax, setTotalTax] = useState(0)
  const [incomeSource, setIncomeSource] = useState(IncomeSource.Salary)
  const [taxYear, setTaxYear] = useState(TaxYears[0])
  const [income, setIncome] = useState(0)
  const [hasCalculated, setHasCalculated] = useState(false)
  const [showEmptyWarning, setShowEmptyWarning] = useState(false)

  const handleCalculate = () => {
    if (totalTax <= 0) {
      setShowEmptyWarning(true)
      setHasCalculated(false)
      return
    }
    setShowEmptyWarning(false)
    setIncome(calculateIncome(totalTax, taxYear, incomeSource))
    setHasCalculated(true)
  }

  const handleReset = () => {
    setTotalTax(0)
    setIncome(0)
    setHasCalculated(false)
    setShowEmptyWarning(false)
  }

  return (
    <Box
      component="form"
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault()
        handleCalculate()
      }}
    >
      <FormSection label="Tax Year" icon={<CalendarMonth />}>
        <TaxYearSelect value={taxYear} onChange={setTaxYear} />
      </FormSection>

      <FormSection label="Reverse Calculation" icon={<Savings />}>
        <AmountInput
          label="Total Tax Paid"
          value={totalTax}
          onChange={setTotalTax}
        />
        <IncomeSourceSelect value={incomeSource} onChange={setIncomeSource} />
      </FormSection>

      <ButtonRow>
        <CalculateButton onClick={handleCalculate} label="Calculate Income" />
        {hasCalculated && <ResetButton onClick={handleReset} />}
      </ButtonRow>

      {showEmptyWarning && (
        <Alert severity="warning" sx={{ mt: 2 }} icon={false}>
          Please enter a non-zero total tax paid.
        </Alert>
      )}

      {hasCalculated && (
        <Box
          mt={3.5}
          sx={{
            borderRadius: 16,
            overflow: "hidden",
            background: "linear-gradient(135deg, #4caf50, #2196f3)",
            padding: "28px",
            textAlign: "center"
          }}
        >
          <Typography
            sx={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "0.9rem",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              mb: 1
            }}
          >
            Estimated Income
          </Typography>
          <Typography
            sx={{
              color: "#fff",
              fontSize: "2rem",
              fontWeight: 800,
              fontVariantNumeric: "tabular-nums"
            }}
          >
            Rs {formatNumber(income)}
          </Typography>
        </Box>
      )}
      <button type="submit" style={{ display: "none" }} aria-hidden="true" />
    </Box>
  )
}