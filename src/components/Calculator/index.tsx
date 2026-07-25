import {
  Button,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
  Box,
  Paper
} from "@mui/material"
import { ArrowForward, RestartAlt } from "@mui/icons-material"
import React, { Dispatch, SetStateAction } from "react"

export const GRADIENT = "linear-gradient(135deg, #4caf50 0%, #2196f3 100%)"

export const formatNumber = (value: number) =>
  new Intl.NumberFormat().format(Math.round(value))

export const formatNumber2dp = (value: number) =>
  new Intl.NumberFormat().format(Math.round(value * 100) / 100)

export const unformatNumber = (value: string) =>
  parseFloat(value.replace(/,/g, "")) || 0

const surfaceSx = {
  backgroundColor: "background.paper"
} as const

// Shared sx style for outlined inputs used across calculators
const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    background: "action.hover",
    transition: "all 0.2s ease",
    "&:hover": { background: "action.selected" },
    "&.Mui-focused": {
      background: "background.paper",
      boxShadow: "0 0 0 3px rgba(76, 175, 80, 0.12)"
    }
  },
  "& .MuiInputLabel-root": { fontWeight: 500 }
} as const

type AmountInputProps = {
  label: string
  value: number
  onChange: Dispatch<SetStateAction<number>>
  icon?: React.ReactNode
  helperText?: string
  noPrefix?: boolean
}

export const AmountInput = ({
  label,
  value,
  onChange,
  icon,
  helperText,
  noPrefix
}: AmountInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const unformattedValue = unformatNumber(event.target.value)
    onChange(unformattedValue)
  }

  return (
    <TextField
      fullWidth
      label={label}
      type="text"
      inputMode="numeric"
      inputProps={{ enterKeyHint: "done" }}
      value={value ? formatNumber(value) : ""}
      onChange={handleChange}
      helperText={helperText}
      sx={inputSx}
      InputProps={{
        startAdornment:
          icon || noPrefix ? (
            icon ? (
              <InputAdornment position="start">{icon}</InputAdornment>
            ) : null
          ) : (
            <InputAdornment position="start">
              <span style={{ fontWeight: 600, marginRight: 4 }}>Rs</span>
            </InputAdornment>
          )
      }}
    />
  )
}

export const TaxYears = [2026, 2025, 2024, 2023, 2022, 2021, 2020]

type TaxYearSelectProps = {
  value: number
  onChange: Dispatch<SetStateAction<number>>
}

export const TaxYearSelect = ({ value, onChange }: TaxYearSelectProps) => (
  <TextField
    select
    fullWidth
    label="Tax Year"
    value={value}
    onChange={(e) => onChange(+e.target.value)}
    sx={inputSx}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <span aria-hidden>📅</span>
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

type ResetButtonProps = {
  onClick: () => void
}

export const ResetButton = ({ onClick }: ResetButtonProps) => (
  <Button
    variant="text"
    onClick={onClick}
    startIcon={<RestartAlt />}
    sx={{
      color: "text.secondary",
      "&:hover": { color: "error.main", backgroundColor: "error.main" }
    }}
  >
    Reset
  </Button>
)

type CalculateButtonProps = {
  onClick: () => void
  label: string
}

export const CalculateButton = ({ onClick, label }: CalculateButtonProps) => (
  <Button
    variant="contained"
    onClick={onClick}
    endIcon={<ArrowForward />}
    disableElevation
    sx={{
      flex: 1,
      padding: "14px 36px",
      borderRadius: 8,
      fontWeight: 700,
      fontSize: "1.05rem",
      textTransform: "none",
      letterSpacing: "0.01em",
      background: GRADIENT,
      boxShadow: "0 6px 20px rgba(76, 175, 80, 0.28)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      "&:hover": {
        boxShadow: "0 8px 28px rgba(76, 175, 80, 0.38)",
        transform: "translateY(-2px)",
        background: GRADIENT
      },
      "&:active": {
        transform: "translateY(0)",
        boxShadow: "0 4px 12px rgba(76, 175, 80, 0.3)"
      }
    }}
  >
    {label}
  </Button>
)

type ResultRow = {
  label: string
  value: number
  isTotal?: boolean
}

type ResultSectionProps = {
  title: string
  rows: ResultRow[]
  marginTop?: number
}

export const ResultSection = ({
  title,
  rows,
  marginTop = 32
}: ResultSectionProps) => (
  <Box sx={{ mt: marginTop }}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 2.5 }}>
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: GRADIENT,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff"
        }}
      />
      <Typography
        sx={{ fontWeight: 700, fontSize: "1.15rem", color: "text.primary" }}
      >
        {title}
      </Typography>
    </Box>
    <Paper
      elevation={0}
      sx={{
        borderRadius: 8,
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "action.hover"
      }}
    >
      {rows.map(({ label, value, isTotal }, idx) => (
        <Box
          key={label}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: isTotal ? "18px 20px" : "14px 20px",
            borderBottom:
              idx === rows.length - 1 ? "none" : "1px solid",
            borderColor: "divider",
            background: isTotal ? GRADIENT : undefined,
            "&:hover": { background: isTotal ? GRADIENT : "action.selected" },
            transition: "background 0.15s ease"
          }}
        >
          <Typography
            sx={{
              fontSize: isTotal ? "1rem" : "0.92rem",
              fontWeight: isTotal ? 700 : 500,
              color: isTotal ? "#fff" : "text.secondary"
            }}
          >
            {label}
          </Typography>
          <Typography
            sx={{
              fontSize: isTotal ? "1.2rem" : "0.95rem",
              fontWeight: isTotal ? 800 : 600,
              color: isTotal ? "#fff" : "text.primary",
              fontVariantNumeric: "tabular-nums"
            }}
          >
            Rs {formatNumber(value)}
          </Typography>
        </Box>
      ))}
    </Paper>
  </Box>
)

type FormSectionProps = {
  label: string
  icon?: React.ReactNode
  children: React.ReactNode
}

export const FormSection = ({ label, icon, children }: FormSectionProps) => (
  <Box sx={{ mb: 3.5 }}>
    <Typography
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        fontWeight: 700,
        fontSize: "0.82rem",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: "text.secondary",
        mb: 2,
        pb: 1,
        borderBottom: "2px solid",
        borderColor: "divider"
      }}
    >
      {icon && (
        <Box sx={{ color: "success.main", fontSize: "1.1rem" }}>{icon}</Box>
      )}
      {label}
    </Typography>
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
        gap: 2
      }}
    >
      {children}
    </Box>
  </Box>
)

type ButtonGroupProps = {
  children: React.ReactNode
}

export const ButtonRow = ({ children }: ButtonGroupProps) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 2,
      mt: 1,
      flexDirection: { xs: "column", sm: "row" },
      "& > button": { width: { xs: "100%", sm: "auto" } }
    }}
  >
    {children}
  </Box>
)

type PageShellProps = {
  title: string
  subtitle: string
  children: React.ReactNode
}

export const PageShell = ({ title, subtitle, children }: PageShellProps) => (
  <Box
    sx={{
      minHeight: "calc(100vh - 104px)",
      backgroundColor: "background.default",
      padding: { xs: "32px 16px 48px", sm: "40px 20px 60px" }
    }}
  >
    <Box sx={{ maxWidth: 900, mx: "auto" }}>
      <Box sx={{ textAlign: "center", mb: 4.5 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            background: GRADIENT,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            mb: 1,
            fontSize: "2.2rem"
          }}
        >
          {title}
        </Typography>
        <Typography sx={{ color: "text.secondary", fontSize: "1.05rem" }}>
          {subtitle}
        </Typography>
      </Box>
      {children}
    </Box>
  </Box>
)

export const TabsCard = ({ children }: { children: React.ReactNode }) => (
  <Paper
    elevation={0}
    sx={{
      borderRadius: 8,
      overflow: "hidden",
      boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
      border: "1px solid",
      borderColor: "divider",
      backgroundColor: "background.paper"
    }}
  >
    {children}
  </Paper>
)

export const TabsHeader = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ background: GRADIENT, padding: "6px" }}>{children}</Box>
)

export const tabSx = {
  root: {
    color: "rgba(255,255,255,0.7)",
    fontWeight: 600,
    fontSize: "0.95rem",
    textTransform: "none",
    borderRadius: "8px",
    minHeight: "44px",
    transition: "all 0.25s ease",
    mx: 0.5,
    "&:hover": {
      color: "#fff",
      background: "rgba(255,255,255,0.12)"
    },
    "&.Mui-selected": {
      color: "#4caf50 !important",
      background: "background.paper !important",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    }
  }
} as const
