export enum TaxType {
  Salary = "salary",
  Business = "business",
  Property = "property"
}

export interface TaxBracket {
  limit: number
  rate: number
}

export interface TaxRates {
  [year: number]: number
}

export interface Sector {
  label: string
  taxRate: TaxRates
}
