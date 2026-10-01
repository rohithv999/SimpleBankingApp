import { useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Data from "./pages/Data";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Users from "./pages/Users";

import "./App.css";

function App() {
  const [page, setPage] = useState("Home");
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <div className="app">
      <Header
        setPage={setPage}
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
      />

      {page === "Home" && <Home />}
      {page === "About" && <About />}
      {page === "Contact" && <Contact />}
      {page === "Data" && <Data />}
      {page === "Register" && <Register />}
      {page === "Login" && (
        <Login setLoggedInUser={setLoggedInUser} />
      )}
      {page === "Users" &&
        loggedInUser?.role === "ADMIN" && (
          <Users />
        )}

      <Footer />
    </div>
  );
}

export default App;