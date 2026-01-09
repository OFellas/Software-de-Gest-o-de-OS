import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import NovaOS from "./pages/NovaOS";
import DetalheOS from "./pages/DetalheOS";
import PertoVencer from "./pages/PertoVencer";
import Atrasadas from "./pages/Atrasadas";
import EnviarGarantia from "./pages/EnviarGarantia";
import Garantia from "./pages/Garantia";
import AguardandoRetirada from "./pages/AguardandoRetirada";
import OSConcluidas from "./pages/OSConcluidas";
import OSAndamento from "./pages/OSAndamento";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/nova-os" element={<NovaOS />} />
        <Route path="/os/:numero" element={<DetalheOS />} />
        <Route path="/perto-de-vencer" element={<PertoVencer />} />
        <Route path="/atrasadas" element={<Atrasadas />} />
        <Route path="/garantia" element={<Garantia />} />
        <Route path="/garantia/:numero" element={<EnviarGarantia />} />
        <Route path="/aguardando-retirada" element={<AguardandoRetirada />} />
        <Route path="/concluidas" element={<OSConcluidas />} />
        <Route path="/em-andamento" element={<OSAndamento />} />
      </Routes>
    </BrowserRouter>
  );
}
