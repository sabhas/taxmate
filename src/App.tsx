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
      </main>
    </>
  )
}

export default App
