import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { AboutUs } from "./internal/AboutUs"
import { ContactUs } from "./internal/ContactUs"
import { Feedback } from "./internal/Feedback"
import { Home } from "./internal/Home"
import { Services } from "./internal/Services"
import { Tools } from "./internal/Tools"

export const HomePage = () => {
  const location = useLocation()

  useEffect(() => {
    const section = location.pathname.slice(1)
    scrollToSection(section)
  }, [location.pathname])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const topPosition =
        element.getBoundingClientRect().top + window.scrollY - 60
      window.scrollTo({
        top: topPosition,
        behavior: "smooth"
      })
    }
  }

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
