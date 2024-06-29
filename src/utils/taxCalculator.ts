import { IncomeSource, TaxBracket, TaxType } from "../types"

const salaryTaxBrackets: { [key: number]: TaxBracket[] } = {
  2020: [
    { limit: 600000, rate: 0 },
    { limit: 1200000, rate: 0.05 },
    { limit: 1800000, rate: 0.1 },
    { limit: 2500000, rate: 0.15 },
    { limit: 3500000, rate: 0.175 },
    { limit: 5000000, rate: 0.2 },
    { limit: 8000000, rate: 0.225 },
    { limit: 12000000, rate: 0.25 },
    { limit: 30000000, rate: 0.275 },
    { limit: 50000000, rate: 0.3 },
    { limit: 75000000, rate: 0.325 },
    { limit: Infinity, rate: 0.35 }
  ],
  2021: [
    { limit: 600000, rate: 0 },
    { limit: 1200000, rate: 0.05 },
    { limit: 1800000, rate: 0.1 },
    { limit: 2500000, rate: 0.15 },
    { limit: 3500000, rate: 0.175 },
    { limit: 5000000, rate: 0.2 },
    { limit: 8000000, rate: 0.225 },
    { limit: 12000000, rate: 0.25 },
    { limit: 30000000, rate: 0.275 },
    { limit: 50000000, rate: 0.3 },
    { limit: 75000000, rate: 0.325 },
    { limit: Infinity, rate: 0.35 }
  ],
  2022: [
    { limit: 600000, rate: 0 },
    { limit: 1200000, rate: 0.05 },
    { limit: 1800000, rate: 0.1 },
    { limit: 2500000, rate: 0.15 },
    { limit: 3500000, rate: 0.175 },
    { limit: 5000000, rate: 0.2 },
    { limit: 8000000, rate: 0.225 },
    { limit: 12000000, rate: 0.25 },
    { limit: 30000000, rate: 0.275 },
    { limit: 50000000, rate: 0.3 },
    { limit: 75000000, rate: 0.325 },
    { limit: Infinity, rate: 0.35 }
  ],
  2023: [
    { limit: 600000, rate: 0 },
    { limit: 1200000, rate: 0.025 },
    { limit: 2400000, rate: 0.125 },
    { limit: 3600000, rate: 0.2 },
    { limit: 6000000, rate: 0.25 },
    { limit: 12000000, rate: 0.325 },
    { limit: Infinity, rate: 0.35 }
  ],
  2024: [
    { limit: 600000, rate: 0 },
    { limit: 1200000, rate: 0.025 },
    { limit: 2400000, rate: 0.125 },
    { limit: 3600000, rate: 0.225 },
    { limit: 6000000, rate: 0.275 },
    { limit: Infinity, rate: 0.35 }
  ],
  2025: [
    { limit: 600000, rate: 0 },
    { limit: 1200000, rate: 0.05 },
    { limit: 2200000, rate: 0.15 },
    { limit: 3200000, rate: 0.25 },
    { limit: 4100000, rate: 0.3 },
    { limit: Infinity, rate: 0.35 }
  ]
}

const businessTaxBrackets: { [key: number]: TaxBracket[] } = {
  2020: [
    { limit: 400000, rate: 0 },
    { limit: 600000, rate: 0.05 },
    { limit: 1200000, rate: 0.1 },
    { limit: 2400000, rate: 0.15 },
    { limit: 3000000, rate: 0.2 },
    { limit: 4000000, rate: 0.25 },
    { limit: 6000000, rate: 0.3 },
    { limit: Infinity, rate: 0.35 }
  ],
  2021: [
    { limit: 400000, rate: 0 },
    { limit: 600000, rate: 0.05 },
    { limit: 1200000, rate: 0.1 },
    { limit: 2400000, rate: 0.15 },
    { limit: 3000000, rate: 0.2 },
    { limit: 4000000, rate: 0.25 },
    { limit: 6000000, rate: 0.3 },
    { limit: Infinity, rate: 0.35 }
  ],
  2022: [
    { limit: 400000, rate: 0 },
    { limit: 600000, rate: 0.05 },
    { limit: 1200000, rate: 0.1 },
    { limit: 2400000, rate: 0.15 },
    { limit: 3000000, rate: 0.2 },
    { limit: 4000000, rate: 0.25 },
    { limit: 6000000, rate: 0.3 },
    { limit: Infinity, rate: 0.35 }
  ],
  2023: [
    { limit: 600000, rate: 0 },
    { limit: 800000, rate: 0.05 },
    { limit: 1200000, rate: 0.125 },
    { limit: 2400000, rate: 0.175 },
    { limit: 3000000, rate: 0.225 },
    { limit: 4000000, rate: 0.275 },
    { limit: 6000000, rate: 0.325 },
    { limit: Infinity, rate: 0.35 }
  ],
  2024: [
    { limit: 600000, rate: 0 },
    { limit: 800000, rate: 0.075 },
    { limit: 1200000, rate: 0.15 },
    { limit: 2400000, rate: 0.2 },
    { limit: 3000000, rate: 0.25 },
    { limit: 4000000, rate: 0.3 },
    { limit: Infinity, rate: 0.35 }
  ],
  2025: [
    { limit: 600000, rate: 0 },
    { limit: 1200000, rate: 0.15 },
    { limit: 1600000, rate: 0.2 },
    { limit: 3200000, rate: 0.3 },
    { limit: 5600000, rate: 0.4 },
    { limit: Infinity, rate: 0.45 }
  ]
}

const propertyTaxBrackets: { [key: number]: TaxBracket[] } = {
  2020: [
    { limit: 200000, rate: 0 },
    { limit: 600000, rate: 0.05 },
    { limit: 1000000, rate: 0.1 },
    { limit: 2000000, rate: 0.15 },
    { limit: 4000000, rate: 0.2 },
    { limit: 6000000, rate: 0.25 },
    { limit: 8000000, rate: 0.3 },
    { limit: Infinity, rate: 0.35 }
  ],
  2021: [
    { limit: 200000, rate: 0 },
    { limit: 600000, rate: 0.05 },
    { limit: 1000000, rate: 0.1 },
    { limit: 2000000, rate: 0.15 },
    { limit: 4000000, rate: 0.2 },
    { limit: 6000000, rate: 0.25 },
    { limit: 8000000, rate: 0.3 },
    { limit: Infinity, rate: 0.35 }
  ]
}

export const calculateTax = (
  income: number,
  taxYear: number,
  taxType: TaxType
): number => {
  let brackets: TaxBracket[] = []

  switch (taxType) {
    case TaxType.Salary:
      brackets = salaryTaxBrackets[taxYear]
      break
    case TaxType.Business:
      brackets = businessTaxBrackets[taxYear]
      break
    case TaxType.Property:
      brackets =
        taxYear <= 2021
          ? propertyTaxBrackets[taxYear]
          : businessTaxBrackets[taxYear]
      break
    default:
      throw new Error("Invalid tax type")
  }

  let tax = 0
  let previousLimit = 0

  for (const { limit, rate } of brackets) {
    if (income <= limit) {
      tax += (income - previousLimit) * rate
      break
    } else {
      tax += (limit - previousLimit) * rate
      previousLimit = limit
    }
  }

  return tax
}

export const calculateIncome = (
  totalTax: number,
  taxYear: number,
  incomeSource: IncomeSource
) => {
  let brackets: TaxBracket[] = []

  switch (incomeSource) {
    case IncomeSource.Salary:
      brackets = salaryTaxBrackets[taxYear]
      break
    case IncomeSource.Business:
      brackets = businessTaxBrackets[taxYear]
      break
    case IncomeSource.Property:
      brackets =
        taxYear <= 2021
          ? propertyTaxBrackets[taxYear]
          : businessTaxBrackets[taxYear]
      break
    default:
      throw new Error("Invalid tax type")
  }

  let income = 0
  let previousLimit = 0
  let remainingTax = totalTax

  for (const { limit, rate } of brackets) {
    // calculate tax on current limit
    const taxOnCurrentLimit = (limit - previousLimit) * rate

    if (remainingTax > taxOnCurrentLimit) {
      income += limit - previousLimit
      previousLimit = limit
      remainingTax -= taxOnCurrentLimit
    } else {
      income += remainingTax / rate
      break
    }
  }

  if (incomeSource === IncomeSource.Property && taxYear >= 2022) {
    // added 20% repair and maintenance cost that is not taxable for years more than 2021
    income = income / 0.8
  }

  return income
}
