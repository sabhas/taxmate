export type LocationType = "Urban" | "Rural"

export type TaxFilerStatus = "Non-Filer" | "Late Filer" | "Filer"

export type PropertyStatus = "Not Declared" | "Declared"

export type MapApprovalStatus = "Not Approved" | "Approved"

export interface ResidentialInput {
  locationType: LocationType
  dcRatePerMarla: number
  dcSqftRate: number
  kanal: number
  marla: number
  sarsahi: number
  sqFeet: number
  purchaserTaxStatus: TaxFilerStatus
  sellerTaxStatus: TaxFilerStatus
  propertyStatus: PropertyStatus
  mapApprovalStatus: MapApprovalStatus
}

export interface AgriculturalInput {
  locationType: LocationType
  dcRatePerAcre: number
  kanal: number
  marla: number
  sarsahi: number
  sqFeet: number
  purchaserTaxStatus: TaxFilerStatus
  sellerTaxStatus: TaxFilerStatus
  propertyStatus: PropertyStatus
}

export interface ValuationResult {
  totalLandValue: number
  totalConstructionValue: number
  totalPropertyValue: number
}

export interface FeeResult {
  registrationFee: number
  estampDuty: number
  borServiceCharges: number
  plra: number
  mutationFee: number
  tehsilCouncil: number
  mapFee: number
  advanceTax236K: number
  gainTax236C: number
  tax7E: number
  totalFees: number
  hibbaGiftTotalFee: number
  tamleekTotalFee: number
}

function getTaxRate236K(status: TaxFilerStatus): number {
  switch (status) {
    case "Non-Filer":
      return 0.105
    case "Late Filer":
      return 0.045
    case "Filer":
      return 0.015
  }
}

function getTaxRate236C(status: TaxFilerStatus): number {
  switch (status) {
    case "Non-Filer":
      return 0.115
    case "Late Filer":
      return 0.075
    case "Filer":
      return 0.045
  }
}

export function calculateResidentialValuation(
  input: ResidentialInput
): ValuationResult {
  const { dcRatePerMarla, dcSqftRate, kanal, marla, sarsahi, sqFeet } = input

  const totalLandValue =
    kanal * 20 * dcRatePerMarla +
    marla * dcRatePerMarla +
    (sarsahi / 9) * dcRatePerMarla +
    (sqFeet / 272) * dcRatePerMarla

  const totalConstructionValue =
    kanal * 4407 * dcSqftRate +
    marla * 272 * dcSqftRate +
    sarsahi * 30.25 * dcSqftRate +
    sqFeet * dcSqftRate

  return {
    totalLandValue,
    totalConstructionValue,
    totalPropertyValue: totalLandValue + totalConstructionValue
  }
}

export function calculateResidentialFees(input: ResidentialInput): FeeResult {
  const valuation = calculateResidentialValuation(input)
  const { totalLandValue, totalPropertyValue } = valuation

  let registrationFee = 0
  if (totalPropertyValue > 0) {
    registrationFee = totalPropertyValue <= 500000 ? 500 : 1000
  }

  const estampDuty = totalPropertyValue * 0.01

  let borServiceCharges = 0
  if (totalPropertyValue > 0) {
    borServiceCharges = 300
  }

  let plra = 0
  if (totalPropertyValue > 0) {
    plra = totalPropertyValue <= 3300000 ? 3300 : totalPropertyValue * 0.001
  }

  let mutationFee = 0
  if (totalPropertyValue > 0) {
    mutationFee = 300
  }

  let tehsilCouncil = 0
  if (totalPropertyValue > 0) {
    tehsilCouncil = totalPropertyValue * 0.01
  }

  let mapFee = 0
  if (input.dcSqftRate > 0 && totalPropertyValue > 0 && input.mapApprovalStatus === "Not Approved") {
    mapFee = totalLandValue * 0.02
  }

  const advanceTax236K = totalPropertyValue * getTaxRate236K(input.purchaserTaxStatus)
  const gainTax236C = totalPropertyValue * getTaxRate236C(input.sellerTaxStatus)

  let tax7E = 0
  if (totalPropertyValue > 0 && input.propertyStatus === "Not Declared") {
    tax7E = totalPropertyValue * 0.01
  }

  const totalFees =
    registrationFee +
    estampDuty +
    borServiceCharges +
    plra +
    mutationFee +
    tehsilCouncil +
    mapFee +
    advanceTax236K +
    gainTax236C +
    tax7E

  const hibbaGiftTotalFee = totalFees - advanceTax236K - gainTax236C - tax7E
  const tamleekTotalFee = hibbaGiftTotalFee

  return {
    registrationFee,
    estampDuty,
    borServiceCharges,
    plra,
    mutationFee,
    tehsilCouncil,
    mapFee,
    advanceTax236K,
    gainTax236C,
    tax7E,
    totalFees,
    hibbaGiftTotalFee,
    tamleekTotalFee
  }
}

export function calculateAgriculturalValuation(
  input: AgriculturalInput
): { totalPropertyValue: number } {
  const { dcRatePerAcre, kanal, marla, sarsahi, sqFeet } = input
  const dcRatePerMarla = dcRatePerAcre / 160

  const totalPropertyValue =
    kanal * 20 * dcRatePerMarla +
    marla * dcRatePerMarla +
    (sarsahi / 9) * dcRatePerMarla +
    (sqFeet / 272) * dcRatePerMarla

  return { totalPropertyValue }
}

export function calculateAgriculturalFees(input: AgriculturalInput): FeeResult {
  const { totalPropertyValue } = calculateAgriculturalValuation(input)

  let registrationFee = 0
  if (totalPropertyValue > 0) {
    registrationFee = totalPropertyValue <= 500000 ? 500 : 1000
  }

  const estampDuty = totalPropertyValue * 0.01

  let borServiceCharges = 0
  if (totalPropertyValue > 0) {
    borServiceCharges = 300
  }

  let plra = 0
  if (totalPropertyValue > 0) {
    plra = totalPropertyValue <= 3300000 ? 3300 : totalPropertyValue * 0.001
  }

  let mutationFee = 0
  if (totalPropertyValue > 0) {
    mutationFee = 300
  }

  let tehsilCouncil = 0
  if (totalPropertyValue > 0) {
    tehsilCouncil = totalPropertyValue * 0.01
  }

  const advanceTax236K = totalPropertyValue * getTaxRate236K(input.purchaserTaxStatus)
  const gainTax236C = totalPropertyValue * getTaxRate236C(input.sellerTaxStatus)

  let tax7E = 0
  if (totalPropertyValue > 0 && input.propertyStatus === "Not Declared") {
    tax7E = totalPropertyValue * 0.01
  }

  const totalFees =
    registrationFee +
    estampDuty +
    borServiceCharges +
    plra +
    mutationFee +
    tehsilCouncil +
    advanceTax236K +
    gainTax236C +
    tax7E

  const hibbaGiftTotalFee = totalFees - advanceTax236K - gainTax236C - tax7E
  const tamleekTotalFee = hibbaGiftTotalFee

  return {
    registrationFee,
    estampDuty,
    borServiceCharges,
    plra,
    mutationFee,
    tehsilCouncil,
    mapFee: 0,
    advanceTax236K,
    gainTax236C,
    tax7E,
    totalFees,
    hibbaGiftTotalFee,
    tamleekTotalFee
  }
}
