import { useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Data from "./pages/Data";

import "./App.css";

function App() {
  const [page, setPage] = useState("Home");

  return (
    <div className="app">
      <Header setPage={setPage} />

      {page === "Home" && <Home />}
      {page === "About" && <About />}
      {page === "Contact" && <Contact />}
      {page === "Data" && <Data />}

      <Footer />
    </div>
  );
}

export default App;