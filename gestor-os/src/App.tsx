import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NovaOS from "./pages/NovaOS";
import DetalheOS from "./pages/DetalheOS";
import Concluidas from "./pages/Concluidas";
import PertoVencer from "./pages/PertoVencer";
import Atrasadas from "./pages/Atrasadas";
import Garantia from "./pages/Garantia";
import Aguardando from "./pages/Aguardando";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nova-os" element={<NovaOS />} />
        <Route path="/os/:id" element={<DetalheOS />} />
        <Route path="/concluidas" element={<Concluidas />} />
        <Route path="/perto-vencer" element={<PertoVencer />} />
        <Route path="/atrasadas" element={<Atrasadas />} />
        <Route path="/garantia" element={<Garantia />} />
        <Route path="/aguardando" element={<Aguardando />} />
      </Routes>
    </BrowserRouter>
  );
}
