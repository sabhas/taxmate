import { AboutUs } from "./internal/AboutUs"
import { ContactUs } from "./internal/ContactUs"
import { Feedback } from "./internal/Feedback"
import { Home } from "./internal/Home"
import { Services } from "./internal/Services"
import { Tools } from "./internal/Tools"

export const HomePage = () => {
  return (
    <>
      <Home />
      <Services />
      <Tools />
      <AboutUs />
      <Feedback />
      <ContactUs />
    </>
  )
}
