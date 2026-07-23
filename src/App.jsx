import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Hero from "./components/home/Hero";
import SelectedWork from "./components/home/SelectedWork";
import WhoIAm from "./components/home/WhoIAm";
import Journey from "./components/home/Journey";
import Exploring from "./components/home/Exploring";
import BeyondTheKeyboard from "./components/home/BeyondTheKeyboard";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Journey />
        <WhoIAm />
        <BeyondTheKeyboard />
        <SelectedWork />
        <Exploring />
      </main>

      <Footer />
    </>
  );
}

export default App;
