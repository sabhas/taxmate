import { Navigate, Route, Routes } from "react-router-dom"
import { MainLayout } from "./layout/Main"
import { HomePage } from "./pages/home"
import { TaxCalculator } from "./pages/taxCalculator"

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/services" element={<HomePage />} />
        <Route path="/tools" element={<HomePage />} />
        <Route path="/aboutUs" element={<HomePage />} />
        <Route path="/feedback" element={<HomePage />} />
        <Route path="/contactUs" element={<HomePage />} />
        <Route path="/taxCalculator" element={<TaxCalculator />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Route>
    </Routes>
  )
}

export default App
