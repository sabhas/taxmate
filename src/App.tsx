import { AboutUs } from "./components/AboutUs"
import { Feedback } from "./components/Feedback"
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
      </main>
    </>
  )
}

export default App
