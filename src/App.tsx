import { Navigate, Route, Routes } from "react-router-dom"
import { MainLayout } from "./layout/Main"
import { HomePage } from "./pages/home"

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Route>
    </Routes>
  )
}

export default App
