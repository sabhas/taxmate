import React, { PropsWithChildren } from "react"
import { Header } from "../components/Header"
import { Box } from "@mui/material"
import { WhatsAppFloatingButton } from "../components/FloatingWhatsappButton"
import * as styles from "./style.module.scss"

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <Box className={styles.main}>
        {children}
        <WhatsAppFloatingButton
          phoneNumber="+923336844170"
          message="I'd like to get some help regarding tax matter"
        />
      </Box>
    </>
  )
}

export default Layout
