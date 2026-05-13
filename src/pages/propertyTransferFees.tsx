import { TabContext, TabPanel } from "@mui/lab"
import {
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
  Calculate,
  Cottage,
  Grass,
  Home,
  Landscape,
  Receipt,
  RestartAlt
} from "@mui/icons-material"
import React, { useEffect, useState } from "react"
import Layout from "../layout"
import * as styles from "../scss/propertyTransferFees.module.scss"
import {
  AgriculturalInput,
  FeeResult,
  LocationType,
  MapApprovalStatus,
  PropertyStatus,
  ResidentialInput,
  TaxFilerStatus,
  calculateAgriculturalFees,
  calculateAgriculturalValuation,
  calculateResidentialFees,
  calculateResidentialValuation
} from "../utils/propertyTransferFees"

export const Head = () => (
  <>
    <title>Taxmate - Punjab Property Transfer Fee Calculator</title>
  </>
)

export default () => {
  const [tabValue, setTabValue] = useState<"Residential" | "Agricultural">(
    "Residential"
  )

  return (
    <Layout>
      <Box className={styles.pageWrapper}>
        <Box className={styles.container}>
          <Box className={styles.heroSection}>
            <Typography variant="h4" className={styles.title}>
              Property Transfer Fee Calculator
            </Typography>
            <Typography className={styles.subtitle}>
              Calculate Punjab property transfer fees for both residential and agricultural land
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
                    icon={<Home fontSize="small" />}
                    iconPosition="start"
                    label="Residential / Commercial"
                    value="Residential"
                    classes={{
                      root: styles.tabRoot,
                      selected: styles.tabSelected
                    }}
                  />
                  <Tab
                    icon={<Grass fontSize="small" />}
                    iconPosition="start"
                    label="Agricultural Land"
                    value="Agricultural"
                    classes={{
                      root: styles.tabRoot,
                      selected: styles.tabSelected
                    }}
                  />
                </Tabs>
              </Box>

              <TabPanel value="Residential" className={styles.panelContent}>
                <ResidentialCalculator />
              </TabPanel>
              <TabPanel value="Agricultural" className={styles.panelContent}>
                <AgriculturalCalculator />
              </TabPanel>
            </TabContext>
          </Paper>
        </Box>
      </Box>
    </Layout>
  )
}

const formatNumber = (value: number) =>
  new Intl.NumberFormat().format(Math.round(value * 100) / 100)

const unformatNumber = (value: string) =>
  parseFloat(value.replace(/,/g, "")) || 0

const ResidentialCalculator = () => {
  const [locationType, setLocationType] = useState<LocationType>("Urban")
  const [dcRatePerMarla, setDcRatePerMarla] = useState(0)
  const [dcSqftRate, setDcSqftRate] = useState(0)
  const [kanal, setKanal] = useState(0)
  const [marla, setMarla] = useState(0)
  const [sarsahi, setSarsahi] = useState(0)
  const [sqFeet, setSqFeet] = useState(0)
  const [purchaserTaxStatus, setPurchaserTaxStatus] =
    useState<TaxFilerStatus>("Non-Filer")
  const [sellerTaxStatus, setSellerTaxStatus] =
    useState<TaxFilerStatus>("Non-Filer")
  const [propertyStatus, setPropertyStatus] =
    useState<PropertyStatus>("Not Declared")
  const [mapApprovalStatus, setMapApprovalStatus] =
    useState<MapApprovalStatus>("Not Approved")
  const [hasCalculated, setHasCalculated] = useState(false)
  const [fees, setFees] = useState<FeeResult | null>(null)
  const [valuation, setValuation] = useState({
    totalLandValue: 0,
    totalConstructionValue: 0,
    totalPropertyValue: 0
  })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const handleCalculate = () => {
    const input: ResidentialInput = {
      locationType,
      dcRatePerMarla,
      dcSqftRate,
      kanal,
      marla,
      sarsahi,
      sqFeet,
      purchaserTaxStatus,
      sellerTaxStatus,
      propertyStatus,
      mapApprovalStatus
    }
    setValuation(calculateResidentialValuation(input))
    setFees(calculateResidentialFees(input))
    setHasCalculated(true)
  }

  const handleReset = () => {
    setDcRatePerMarla(0)
    setDcSqftRate(0)
    setKanal(0)
    setMarla(0)
    setSarsahi(0)
    setSqFeet(0)
    setHasCalculated(false)
    setFees(null)
  }

  return (
    <>
      <Box className={styles.formSection}>
        <Typography className={styles.sectionLabel}>
          <Landscape className={styles.sectionIcon} />
          Property Location
        </Typography>
        <Box className={styles.fieldsGrid}>
          <TextField
            select
            fullWidth
            label="Location Type"
            value={locationType}
            onChange={(e) => setLocationType(e.target.value as LocationType)}
            className={styles.styledInput}
          >
            <MenuItem value="Urban">Urban</MenuItem>
            <MenuItem value="Rural">Rural</MenuItem>
          </TextField>
        </Box>
      </Box>

      <Box className={styles.formSection}>
        <Typography className={styles.sectionLabel}>
          <AccountBalance className={styles.sectionIcon} />
          Property Rates
        </Typography>
        <Box className={styles.fieldsGrid}>
          <TextField
            fullWidth
            label="DC Rate Per Marla"
            type="text"
            value={dcRatePerMarla ? formatNumber(dcRatePerMarla) : ""}
            onChange={(e) => setDcRatePerMarla(unformatNumber(e.target.value))}
            className={styles.styledInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <span className={styles.inputPrefix}>Rs</span>
                </InputAdornment>
              )
            }}
          />
          <TextField
            fullWidth
            label="DC Sq. Feet Rate (If Constructed)"
            type="text"
            value={dcSqftRate ? formatNumber(dcSqftRate) : ""}
            onChange={(e) => setDcSqftRate(unformatNumber(e.target.value))}
            className={styles.styledInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <span className={styles.inputPrefix}>Rs</span>
                </InputAdornment>
              )
            }}
          />
        </Box>
      </Box>

      <Box className={styles.formSection}>
        <Typography className={styles.sectionLabel}>
          <Cottage className={styles.sectionIcon} />
          Property Details
        </Typography>
        <Box className={styles.fieldsGrid}>
          <TextField
            fullWidth
            label="Kanal"
            type="text"
            value={kanal || ""}
            onChange={(e) => setKanal(parseFloat(e.target.value) || 0)}
            className={styles.styledInput}
          />
          <TextField
            fullWidth
            label="Marla"
            type="text"
            value={marla || ""}
            onChange={(e) => setMarla(parseFloat(e.target.value) || 0)}
            className={styles.styledInput}
          />
          <TextField
            fullWidth
            label="Sarsahi"
            type="text"
            value={sarsahi || ""}
            onChange={(e) => setSarsahi(parseFloat(e.target.value) || 0)}
            className={styles.styledInput}
          />
          <TextField
            fullWidth
            label="Square Feet"
            type="text"
            value={sqFeet || ""}
            onChange={(e) => setSqFeet(parseFloat(e.target.value) || 0)}
            className={styles.styledInput}
          />
        </Box>
      </Box>

      <Box className={styles.formSection}>
        <Typography className={styles.sectionLabel}>
          <Receipt className={styles.sectionIcon} />
          Tax Status
        </Typography>
        <Box className={styles.fieldsGrid}>
          <TextField
            select
            fullWidth
            label="Purchaser Tax Status"
            value={purchaserTaxStatus}
            onChange={(e) =>
              setPurchaserTaxStatus(e.target.value as TaxFilerStatus)
            }
            className={styles.styledInput}
          >
            <MenuItem value="Non-Filer">Non-Filer (10.5%)</MenuItem>
            <MenuItem value="Late Filer">Late Filer (4.5%)</MenuItem>
            <MenuItem value="Filer">Filer (1.5%)</MenuItem>
          </TextField>
          <TextField
            select
            fullWidth
            label="Seller Tax Status"
            value={sellerTaxStatus}
            onChange={(e) =>
              setSellerTaxStatus(e.target.value as TaxFilerStatus)
            }
            className={styles.styledInput}
          >
            <MenuItem value="Non-Filer">Non-Filer (11.5%)</MenuItem>
            <MenuItem value="Late Filer">Late Filer (7.5%)</MenuItem>
            <MenuItem value="Filer">Filer (4.5%)</MenuItem>
          </TextField>
          <TextField
            select
            fullWidth
            label="Property Status"
            value={propertyStatus}
            onChange={(e) =>
              setPropertyStatus(e.target.value as PropertyStatus)
            }
            className={styles.styledInput}
          >
            <MenuItem value="Not Declared">Not Declared</MenuItem>
            <MenuItem value="Declared">Declared</MenuItem>
          </TextField>
          {dcSqftRate > 0 && (
            <TextField
              select
              fullWidth
              label="Map Approval Status"
              value={mapApprovalStatus}
              onChange={(e) =>
                setMapApprovalStatus(e.target.value as MapApprovalStatus)
              }
              className={styles.styledInput}
            >
              <MenuItem value="Not Approved">Not Approved</MenuItem>
              <MenuItem value="Approved">Approved</MenuItem>
            </TextField>
          )}
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
          Calculate Fees
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

      {hasCalculated && fees && (
        <Box className={styles.resultsSection}>
          <Box className={styles.resultsHeader}>
            <Box className={styles.resultsIcon}>
              <Calculate fontSize="small" />
            </Box>
            <Typography className={styles.resultsTitle}>
              Valuation Details
            </Typography>
          </Box>

          <Paper className={styles.resultsCard} elevation={0}>
            <Box className={styles.resultRow}>
              <Typography className={styles.resultLabel}>
                Total Land Value
              </Typography>
              <Typography className={styles.resultValue}>
                Rs {formatNumber(valuation.totalLandValue)}
              </Typography>
            </Box>
            <Box className={styles.resultRow}>
              <Typography className={styles.resultLabel}>
                Total Construction Value
              </Typography>
              <Typography className={styles.resultValue}>
                Rs {formatNumber(valuation.totalConstructionValue)}
              </Typography>
            </Box>
            <Box className={`${styles.resultRow} ${styles.totalRow}`}>
              <Typography className={styles.resultLabel}>
                Total Property Value
              </Typography>
              <Typography className={styles.resultValue}>
                Rs {formatNumber(valuation.totalPropertyValue)}
              </Typography>
            </Box>
          </Paper>

          <Box className={styles.resultsHeader} style={{ marginTop: 24 }}>
            <Box className={styles.resultsIcon}>
              <Receipt fontSize="small" />
            </Box>
            <Typography className={styles.resultsTitle}>Fee Details</Typography>
          </Box>

          <Paper className={styles.resultsCard} elevation={0}>
            <Box className={styles.resultRow}>
              <Typography className={styles.resultLabel}>
                Registration Fee
              </Typography>
              <Typography className={styles.resultValue}>
                Rs {formatNumber(fees.registrationFee)}
              </Typography>
            </Box>
            <Box className={styles.resultRow}>
              <Typography className={styles.resultLabel}>
                Estamp Duty
              </Typography>
              <Typography className={styles.resultValue}>
                Rs {formatNumber(fees.estampDuty)}
              </Typography>
            </Box>
            <Box className={styles.resultRow}>
              <Typography className={styles.resultLabel}>
                Others (BOR Service Charges)
              </Typography>
              <Typography className={styles.resultValue}>
                Rs {formatNumber(fees.borServiceCharges)}
              </Typography>
            </Box>
            <Box className={styles.resultRow}>
              <Typography className={styles.resultLabel}>PLRA</Typography>
              <Typography className={styles.resultValue}>
                Rs {formatNumber(fees.plra)}
              </Typography>
            </Box>
            <Box className={styles.resultRow}>
              <Typography className={styles.resultLabel}>
                Mutation Fee
              </Typography>
              <Typography className={styles.resultValue}>
                Rs {formatNumber(fees.mutationFee)}
              </Typography>
            </Box>
            <Box className={styles.resultRow}>
              <Typography className={styles.resultLabel}>
                {locationType === "Rural" ? "District Council" : "Tehsil Council"}
              </Typography>
              <Typography className={styles.resultValue}>
                Rs {formatNumber(fees.tehsilCouncil)}
              </Typography>
            </Box>
            {dcSqftRate > 0 && (
              <Box className={styles.resultRow}>
                <Typography className={styles.resultLabel}>Map Fee</Typography>
                <Typography className={styles.resultValue}>
                  Rs {formatNumber(fees.mapFee)}
                </Typography>
              </Box>
            )}
            <Box className={styles.resultRow}>
              <Typography className={styles.resultLabel}>
                Advance Tax 236K
              </Typography>
              <Typography className={styles.resultValue}>
                Rs {formatNumber(fees.advanceTax236K)}
              </Typography>
            </Box>
            <Box className={styles.resultRow}>
              <Typography className={styles.resultLabel}>
                Gain Tax 236C
              </Typography>
              <Typography className={styles.resultValue}>
                Rs {formatNumber(fees.gainTax236C)}
              </Typography>
            </Box>
            <Box className={styles.resultRow}>
              <Typography className={styles.resultLabel}>7E Tax</Typography>
              <Typography className={styles.resultValue}>
                Rs {formatNumber(fees.tax7E)}
              </Typography>
            </Box>
            <Box className={`${styles.resultRow} ${styles.totalRow}`}>
              <Typography className={styles.resultLabel}>TOTAL FEES</Typography>
              <Typography className={styles.resultValue}>
                Rs {formatNumber(fees.totalFees)}
              </Typography>
            </Box>
          </Paper>

          <Paper
            className={styles.resultsCard}
            elevation={0}
            style={{ marginTop: 16 }}
          >
            <Box className={styles.resultRow}>
              <Typography className={styles.resultLabel}>
                Hibba/Gift Total Fee
              </Typography>
              <Typography className={styles.resultValue}>
                Rs {formatNumber(fees.hibbaGiftTotalFee)}
              </Typography>
            </Box>
            <Box className={styles.resultRow}>
              <Typography className={styles.resultLabel}>
                Tamleek Total Fee
              </Typography>
              <Typography className={styles.resultValue}>
                Rs {formatNumber(fees.tamleekTotalFee)}
              </Typography>
            </Box>
          </Paper>
        </Box>
      )}
    </>
  )
}

const AgriculturalCalculator = () => {
  const [locationType, setLocationType] = useState<LocationType>("Rural")
  const [dcRatePerAcre, setDcRatePerAcre] = useState(0)
  const [kanal, setKanal] = useState(0)
  const [marla, setMarla] = useState(0)
  const [sarsahi, setSarsahi] = useState(0)
  const [sqFeet, setSqFeet] = useState(0)
  const [purchaserTaxStatus, setPurchaserTaxStatus] =
    useState<TaxFilerStatus>("Non-Filer")
  const [sellerTaxStatus, setSellerTaxStatus] =
    useState<TaxFilerStatus>("Non-Filer")
  const [propertyStatus, setPropertyStatus] =
    useState<PropertyStatus>("Not Declared")
  const [hasCalculated, setHasCalculated] = useState(false)
  const [fees, setFees] = useState<FeeResult | null>(null)
  const [totalPropertyValue, setTotalPropertyValue] = useState(0)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const handleCalculate = () => {
    const input: AgriculturalInput = {
      locationType,
      dcRatePerAcre,
      kanal,
      marla,
      sarsahi,
      sqFeet,
      purchaserTaxStatus,
      sellerTaxStatus,
      propertyStatus
    }
    const val = calculateAgriculturalValuation(input)
    setTotalPropertyValue(val.totalPropertyValue)
    setFees(calculateAgriculturalFees(input))
    setHasCalculated(true)
  }

  const handleReset = () => {
    setDcRatePerAcre(0)
    setKanal(0)
    setMarla(0)
    setSarsahi(0)
    setSqFeet(0)
    setHasCalculated(false)
    setFees(null)
  }

  return (
    <>
      <Box className={styles.formSection}>
        <Typography className={styles.sectionLabel}>
          <Landscape className={styles.sectionIcon} />
          Property Location
        </Typography>
        <Box className={styles.fieldsGrid}>
          <TextField
            select
            fullWidth
            label="Location Type"
            value={locationType}
            onChange={(e) => setLocationType(e.target.value as LocationType)}
            className={styles.styledInput}
          >
            <MenuItem value="Rural">Rural</MenuItem>
            <MenuItem value="Urban">Urban</MenuItem>
          </TextField>
        </Box>
      </Box>

      <Box className={styles.formSection}>
        <Typography className={styles.sectionLabel}>
          <AccountBalance className={styles.sectionIcon} />
          Property Rates
        </Typography>
        <Box className={styles.fieldsGrid}>
          <TextField
            fullWidth
            label="DC Rate Per Acre"
            type="text"
            value={dcRatePerAcre ? formatNumber(dcRatePerAcre) : ""}
            onChange={(e) => setDcRatePerAcre(unformatNumber(e.target.value))}
            className={styles.styledInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <span className={styles.inputPrefix}>Rs</span>
                </InputAdornment>
              )
            }}
          />
        </Box>
      </Box>

      <Box className={styles.formSection}>
        <Typography className={styles.sectionLabel}>
          <Grass className={styles.sectionIcon} />
          Property Details
        </Typography>
        <Box className={styles.fieldsGrid}>
          <TextField
            fullWidth
            label="Kanal"
            type="text"
            value={kanal || ""}
            onChange={(e) => setKanal(parseFloat(e.target.value) || 0)}
            className={styles.styledInput}
          />
          <TextField
            fullWidth
            label="Marla"
            type="text"
            value={marla || ""}
            onChange={(e) => setMarla(parseFloat(e.target.value) || 0)}
            className={styles.styledInput}
          />
          <TextField
            fullWidth
            label="Sarsahi"
            type="text"
            value={sarsahi || ""}
            onChange={(e) => setSarsahi(parseFloat(e.target.value) || 0)}
            className={styles.styledInput}
          />
          <TextField
            fullWidth
            label="Square Feet"
            type="text"
            value={sqFeet || ""}
            onChange={(e) => setSqFeet(parseFloat(e.target.value) || 0)}
            className={styles.styledInput}
          />
        </Box>
      </Box>

      <Box className={styles.formSection}>
        <Typography className={styles.sectionLabel}>
          <Receipt className={styles.sectionIcon} />
          Tax Status
        </Typography>
        <Box className={styles.fieldsGrid}>
          <TextField
            select
            fullWidth
            label="Purchaser Tax Status"
            value={purchaserTaxStatus}
            onChange={(e) =>
              setPurchaserTaxStatus(e.target.value as TaxFilerStatus)
            }
            className={styles.styledInput}
          >
            <MenuItem value="Non-Filer">Non-Filer (10.5%)</MenuItem>
            <MenuItem value="Late Filer">Late Filer (4.5%)</MenuItem>
            <MenuItem value="Filer">Filer (1.5%)</MenuItem>
          </TextField>
          <TextField
            select
            fullWidth
            label="Seller Tax Status"
            value={sellerTaxStatus}
            onChange={(e) =>
              setSellerTaxStatus(e.target.value as TaxFilerStatus)
            }
            className={styles.styledInput}
          >
            <MenuItem value="Non-Filer">Non-Filer (11.5%)</MenuItem>
            <MenuItem value="Late Filer">Late Filer (7.5%)</MenuItem>
            <MenuItem value="Filer">Filer (4.5%)</MenuItem>
          </TextField>
          <TextField
            select
            fullWidth
            label="Property Status"
            value={propertyStatus}
            onChange={(e) =>
              setPropertyStatus(e.target.value as PropertyStatus)
            }
            className={styles.styledInput}
          >
            <MenuItem value="Not Declared">Not Declared</MenuItem>
            <MenuItem value="Declared">Declared</MenuItem>
          </TextField>
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
          Calculate Fees
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

      {hasCalculated && fees && (
        <Box className={styles.resultsSection}>
          <Box className={styles.resultsHeader}>
            <Box className={styles.resultsIcon}>
              <Calculate fontSize="small" />
            </Box>
            <Typography className={styles.resultsTitle}>
              Valuation Details
            </Typography>
          </Box>

          <Paper className={styles.resultsCard} elevation={0}>
            <Box className={`${styles.resultRow} ${styles.totalRow}`}>
              <Typography className={styles.resultLabel}>
                Total Property Value
              </Typography>
              <Typography className={styles.resultValue}>
                Rs {formatNumber(totalPropertyValue)}
              </Typography>
            </Box>
          </Paper>

          <Box className={styles.resultsHeader} style={{ marginTop: 24 }}>
            <Box className={styles.resultsIcon}>
              <Receipt fontSize="small" />
            </Box>
            <Typography className={styles.resultsTitle}>Fee Details</Typography>
          </Box>

          <Paper className={styles.resultsCard} elevation={0}>
            <Box className={styles.resultRow}>
              <Typography className={styles.resultLabel}>
                Registration Fee
              </Typography>
              <Typography className={styles.resultValue}>
                Rs {formatNumber(fees.registrationFee)}
              </Typography>
            </Box>
            <Box className={styles.resultRow}>
              <Typography className={styles.resultLabel}>
                Estamp Duty
              </Typography>
              <Typography className={styles.resultValue}>
                Rs {formatNumber(fees.estampDuty)}
              </Typography>
            </Box>
            <Box className={styles.resultRow}>
              <Typography className={styles.resultLabel}>
                Others (BOR Service Charges)
              </Typography>
              <Typography className={styles.resultValue}>
                Rs {formatNumber(fees.borServiceCharges)}
              </Typography>
            </Box>
            <Box className={styles.resultRow}>
              <Typography className={styles.resultLabel}>PLRA</Typography>
              <Typography className={styles.resultValue}>
                Rs {formatNumber(fees.plra)}
              </Typography>
            </Box>
            <Box className={styles.resultRow}>
              <Typography className={styles.resultLabel}>
                Mutation Fee
              </Typography>
              <Typography className={styles.resultValue}>
                Rs {formatNumber(fees.mutationFee)}
              </Typography>
            </Box>
            <Box className={styles.resultRow}>
              <Typography className={styles.resultLabel}>
                {locationType === "Rural" ? "District Council" : "Tehsil Council"}
              </Typography>
              <Typography className={styles.resultValue}>
                Rs {formatNumber(fees.tehsilCouncil)}
              </Typography>
            </Box>
            <Box className={styles.resultRow}>
              <Typography className={styles.resultLabel}>
                Advance Tax 236K
              </Typography>
              <Typography className={styles.resultValue}>
                Rs {formatNumber(fees.advanceTax236K)}
              </Typography>
            </Box>
            <Box className={styles.resultRow}>
              <Typography className={styles.resultLabel}>
                Gain Tax 236C
              </Typography>
              <Typography className={styles.resultValue}>
                Rs {formatNumber(fees.gainTax236C)}
              </Typography>
            </Box>
            <Box className={styles.resultRow}>
              <Typography className={styles.resultLabel}>7E Tax</Typography>
              <Typography className={styles.resultValue}>
                Rs {formatNumber(fees.tax7E)}
              </Typography>
            </Box>
            <Box className={`${styles.resultRow} ${styles.totalRow}`}>
              <Typography className={styles.resultLabel}>TOTAL FEES</Typography>
              <Typography className={styles.resultValue}>
                Rs {formatNumber(fees.totalFees)}
              </Typography>
            </Box>
          </Paper>

          <Paper
            className={styles.resultsCard}
            elevation={0}
            style={{ marginTop: 16 }}
          >
            <Box className={styles.resultRow}>
              <Typography className={styles.resultLabel}>
                Hibba/Gift Total Fee
              </Typography>
              <Typography className={styles.resultValue}>
                Rs {formatNumber(fees.hibbaGiftTotalFee)}
              </Typography>
            </Box>
            <Box className={styles.resultRow}>
              <Typography className={styles.resultLabel}>
                Tamleek Total Fee
              </Typography>
              <Typography className={styles.resultValue}>
                Rs {formatNumber(fees.tamleekTotalFee)}
              </Typography>
            </Box>
          </Paper>
        </Box>
      )}
    </>
  )
}
