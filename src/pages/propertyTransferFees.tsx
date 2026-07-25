import { TabContext, TabPanel } from "@mui/lab"
import {
  Box,
  MenuItem,
  Tab,
  Tabs,
  TextField
} from "@mui/material"
import {
  AccountBalance,
  Cottage,
  Grass,
  Home,
  Landscape,
  Receipt
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
  TabsCard,
  TabsHeader,
  tabSx
} from "../components/Calculator"
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

const panelSx = { padding: { xs: "24px 16px", sm: "32px 28px" } } as const

export default () => {
  const [tabValue, setTabValue] = useState<"Residential" | "Agricultural">(
    "Residential"
  )

  return (
    <Layout>
      <PageShell
        title="Property Transfer Fee Calculator"
        subtitle="Calculate Punjab property transfer fees for both residential and agricultural land"
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
                  icon={<Home fontSize="small" />}
                  iconPosition="start"
                  label="Residential / Commercial"
                  value="Residential"
                  sx={tabSx.root}
                />
                <Tab
                  icon={<Grass fontSize="small" />}
                  iconPosition="start"
                  label="Agricultural Land"
                  value="Agricultural"
                  sx={tabSx.root}
                />
              </Tabs>
            </TabsHeader>

            <TabPanel value="Residential" sx={panelSx}>
              <ResidentialCalculator />
            </TabPanel>
            <TabPanel value="Agricultural" sx={panelSx}>
              <AgriculturalCalculator />
            </TabPanel>
          </TabContext>
        </TabsCard>
      </PageShell>
    </Layout>
  )
}

type MeasurementFieldsProps = {
  kanal: number
  marla: number
  sarsahi: number
  sqFeet: number
  setKanal: Dispatch<SetStateAction<number>>
  setMarla: Dispatch<SetStateAction<number>>
  setSarsahi: Dispatch<SetStateAction<number>>
  setSqFeet: Dispatch<SetStateAction<number>>
}

const MeasurementFields = ({
  kanal,
  marla,
  sarsahi,
  sqFeet,
  setKanal,
  setMarla,
  setSarsahi,
  setSqFeet
}: MeasurementFieldsProps) => (
  <>
    <AmountInput label="Kanal" value={kanal} onChange={setKanal} noPrefix />
    <AmountInput label="Marla" value={marla} onChange={setMarla} noPrefix />
    <AmountInput
      label="Sarsahi"
      value={sarsahi}
      onChange={setSarsahi}
      noPrefix
    />
    <AmountInput
      label="Square Feet"
      value={sqFeet}
      onChange={setSqFeet}
      noPrefix
    />
  </>
)

type TaxStatusFieldsProps = {
  purchaserTaxStatus: TaxFilerStatus
  sellerTaxStatus: TaxFilerStatus
  propertyStatus: PropertyStatus
  setPurchaserTaxStatus: Dispatch<SetStateAction<TaxFilerStatus>>
  setSellerTaxStatus: Dispatch<SetStateAction<TaxFilerStatus>>
  setPropertyStatus: Dispatch<SetStateAction<PropertyStatus>>
  mapApprovalStatus?: MapApprovalStatus
  setMapApprovalStatus?: Dispatch<SetStateAction<MapApprovalStatus>>
  showMapApproval?: boolean
}

const TaxStatusFields = ({
  purchaserTaxStatus,
  sellerTaxStatus,
  propertyStatus,
  setPurchaserTaxStatus,
  setSellerTaxStatus,
  setPropertyStatus,
  mapApprovalStatus,
  setMapApprovalStatus,
  showMapApproval
}: TaxStatusFieldsProps) => (
  <>
    <TextField
      select
      fullWidth
      label="Purchaser Tax Status"
      value={purchaserTaxStatus}
      onChange={(e) =>
        setPurchaserTaxStatus(e.target.value as TaxFilerStatus)
      }
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
      onChange={(e) => setSellerTaxStatus(e.target.value as TaxFilerStatus)}
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
    >
      <MenuItem value="Not Declared">Not Declared</MenuItem>
      <MenuItem value="Declared">Declared</MenuItem>
    </TextField>
    {showMapApproval && setMapApprovalStatus && mapApprovalStatus && (
      <TextField
        select
        fullWidth
        label="Map Approval Status"
        value={mapApprovalStatus}
        onChange={(e) =>
          setMapApprovalStatus(e.target.value as MapApprovalStatus)
        }
      >
        <MenuItem value="Not Approved">Not Approved</MenuItem>
        <MenuItem value="Approved">Approved</MenuItem>
      </TextField>
    )}
  </>
)

const buildFeeRows = (
  fees: FeeResult,
  locationType: LocationType,
  includeMapFee: boolean
) => [
  { label: "Registration Fee", value: fees.registrationFee },
  { label: "Estamp Duty", value: fees.estampDuty },
  { label: "Others (BOR Service Charges)", value: fees.borServiceCharges },
  { label: "PLRA", value: fees.plra },
  { label: "Mutation Fee", value: fees.mutationFee },
  {
    label: locationType === "Rural" ? "District Council" : "Tehsil Council",
    value: fees.tehsilCouncil
  },
  ...(includeMapFee
    ? [{ label: "Map Fee", value: fees.mapFee }]
    : []),
  { label: "Advance Tax 236K", value: fees.advanceTax236K },
  { label: "Gain Tax 236C", value: fees.gainTax236C },
  { label: "7E Tax", value: fees.tax7E },
  { label: "TOTAL FEES", value: fees.totalFees, isTotal: true }
]

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
    <Box
      component="form"
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault()
        handleCalculate()
      }}
    >
      <FormSection label="Property Location" icon={<Landscape />}>
        <TextField
          select
          fullWidth
          label="Location Type"
          value={locationType}
          onChange={(e) => setLocationType(e.target.value as LocationType)}
        >
          <MenuItem value="Urban">Urban</MenuItem>
          <MenuItem value="Rural">Rural</MenuItem>
        </TextField>
      </FormSection>

      <FormSection label="Property Rates" icon={<AccountBalance />}>
        <AmountInput
          label="DC Rate Per Marla"
          value={dcRatePerMarla}
          onChange={setDcRatePerMarla}
        />
        <AmountInput
          label="DC Sq. Feet Rate (If Constructed)"
          value={dcSqftRate}
          onChange={setDcSqftRate}
        />
      </FormSection>

      <FormSection label="Property Details" icon={<Cottage />}>
        <MeasurementFields
          kanal={kanal}
          marla={marla}
          sarsahi={sarsahi}
          sqFeet={sqFeet}
          setKanal={setKanal}
          setMarla={setMarla}
          setSarsahi={setSarsahi}
          setSqFeet={setSqFeet}
        />
      </FormSection>

      <FormSection label="Tax Status" icon={<Receipt />}>
        <TaxStatusFields
          purchaserTaxStatus={purchaserTaxStatus}
          sellerTaxStatus={sellerTaxStatus}
          propertyStatus={propertyStatus}
          setPurchaserTaxStatus={setPurchaserTaxStatus}
          setSellerTaxStatus={setSellerTaxStatus}
          setPropertyStatus={setPropertyStatus}
          mapApprovalStatus={mapApprovalStatus}
          setMapApprovalStatus={setMapApprovalStatus}
          showMapApproval={dcSqftRate > 0}
        />
      </FormSection>

      <ButtonRow>
        <CalculateButton onClick={handleCalculate} label="Calculate Fees" />
        {hasCalculated && <ResetButton onClick={handleReset} />}
      </ButtonRow>

      {hasCalculated && fees && (
        <>
          <ResultSection
            title="Valuation Details"
            rows={[
              { label: "Total Land Value", value: valuation.totalLandValue },
              {
                label: "Total Construction Value",
                value: valuation.totalConstructionValue
              },
              {
                label: "Total Property Value",
                value: valuation.totalPropertyValue,
                isTotal: true
              }
            ]}
          />
          <ResultSection
            title="Fee Details"
            rows={buildFeeRows(fees, locationType, dcSqftRate > 0)}
          />
          <ResultSection
            title="Variant Fees"
            rows={[
              {
                label: "Hibba/Gift Total Fee",
                value: fees.hibbaGiftTotalFee
              },
              {
                label: "Tamleek Total Fee",
                value: fees.tamleekTotalFee
              }
            ]}
            marginTop={16}
          />
        </>
      )}
      <button type="submit" style={{ display: "none" }} aria-hidden="true" />
    </Box>
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
    <Box
      component="form"
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault()
        handleCalculate()
      }}
    >
      <FormSection label="Property Location" icon={<Landscape />}>
        <TextField
          select
          fullWidth
          label="Location Type"
          value={locationType}
          onChange={(e) => setLocationType(e.target.value as LocationType)}
        >
          <MenuItem value="Rural">Rural</MenuItem>
          <MenuItem value="Urban">Urban</MenuItem>
        </TextField>
      </FormSection>

      <FormSection label="Property Rates" icon={<AccountBalance />}>
        <AmountInput
          label="DC Rate Per Acre"
          value={dcRatePerAcre}
          onChange={setDcRatePerAcre}
        />
      </FormSection>

      <FormSection label="Property Details" icon={<Grass />}>
        <MeasurementFields
          kanal={kanal}
          marla={marla}
          sarsahi={sarsahi}
          sqFeet={sqFeet}
          setKanal={setKanal}
          setMarla={setMarla}
          setSarsahi={setSarsahi}
          setSqFeet={setSqFeet}
        />
      </FormSection>

      <FormSection label="Tax Status" icon={<Receipt />}>
        <TaxStatusFields
          purchaserTaxStatus={purchaserTaxStatus}
          sellerTaxStatus={sellerTaxStatus}
          propertyStatus={propertyStatus}
          setPurchaserTaxStatus={setPurchaserTaxStatus}
          setSellerTaxStatus={setSellerTaxStatus}
          setPropertyStatus={setPropertyStatus}
        />
      </FormSection>

      <ButtonRow>
        <CalculateButton onClick={handleCalculate} label="Calculate Fees" />
        {hasCalculated && <ResetButton onClick={handleReset} />}
      </ButtonRow>

      {hasCalculated && fees && (
        <>
          <ResultSection
            title="Valuation Details"
            rows={[
              {
                label: "Total Property Value",
                value: totalPropertyValue,
                isTotal: true
              }
            ]}
          />
          <ResultSection
            title="Fee Details"
            rows={buildFeeRows(fees, locationType, false)}
          />
          <ResultSection
            title="Variant Fees"
            rows={[
              {
                label: "Hibba/Gift Total Fee",
                value: fees.hibbaGiftTotalFee
              },
              {
                label: "Tamleek Total Fee",
                value: fees.tamleekTotalFee
              }
            ]}
            marginTop={16}
          />
        </>
      )}
      <button type="submit" style={{ display: "none" }} aria-hidden="true" />
    </Box>
  )
}