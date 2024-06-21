import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"
import { WhatsAppFloatingButton } from "../components/FloatingWhatsappButton"
import { Header } from "../components/Header"

export const MainLayout = () => {
  return (
    <>
      <Header />
      <Box className="main">
        <Outlet />
        <WhatsAppFloatingButton
          phoneNumber="+923336844170"
          message="I'd like to get some help regarding tax matter"
        />
      </Box>
    </>
  )
}
