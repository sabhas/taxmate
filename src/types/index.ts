import { IGatsbyImageData } from "gatsby-plugin-image"

export enum TaxType {
  Salary = "salary",
  Business = "business",
  Property = "property",
  Pension = "pension"
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

export enum IncomeSource {
  Salary = "Salary",
  Business = "Business",
  Property = "Property",
  Pension = "Pension"
}

export type ImageData = {
  node: {
    relativePath: string
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  }
}

export type QueryResult = {
  allFile: {
    edges: ImageData[]
  }
}
