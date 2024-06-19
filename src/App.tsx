import { AboutUs } from "./components/AboutUs"
import { ContactUs } from "./components/ContactUs"
import { Feedback } from "./components/Feedback"
import { WhatsAppFloatingButton } from "./components/FloatingWhatsappButton"
import { Header } from "./components/Header"
import { Home } from "./components/Home"
import { Services } from "./components/Services"
import { Tools } from "./components/Tools"

function App() {
  return (
    <>
      <Header />
      <main>
        <Home />
        <Services />
        <Tools />
        <AboutUs />
        <Feedback />
        <ContactUs />
        <WhatsAppFloatingButton
          phoneNumber="+923336844170"
          message="I'd like to get some help regarding tax matter"
        />
      </main>
    </>
  )
}

export default App
