import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Store from "./pages/Store";
import NavBar from "./components/NavBar";
import { ShoppingCartProvider } from "./context/ShoppingCartConext";

function App() {
  return (
    <ShoppingCartProvider>
      <NavBar />

      <Container>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/About" element={<About />}></Route>
          <Route path="/Store" element={<Store />}></Route>
        </Routes>
      </Container>
    </ShoppingCartProvider>
  );
}

export default App;
