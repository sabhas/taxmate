import { Header } from "./components/Header"
import { Home } from "./components/Home"
import { Services } from "./components/Services"

function App() {
  return (
    <>
      <Header />
      <main>
        <Home />
        <Services />
      </main>
    </>
  )
}

export default App
