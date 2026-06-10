import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Hero from "./components/home/Hero";
import IdentityCards from "./components/home/IdentityCards";
import BeyondTechnology from "./components/home/BeyondTechnology";
import Journey from "./components/home/Journey";
import Exploring from "./components/home/Exploring";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <IdentityCards />
        <BeyondTechnology />
        <Journey />
        <Exploring />
      </main>

      <Footer />
    </>
  );
}

export default App;
