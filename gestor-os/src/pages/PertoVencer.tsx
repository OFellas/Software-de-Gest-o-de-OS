import { useNavigate } from "react-router-dom";
import type { OS } from "../types/OS";
import { statusPrazo, diasParaPrazo } from "../utils/osStatus";

export default function PertoVencer() {
  const navigate = useNavigate();
  const lista: OS[] = JSON.parse(localStorage.getItem("os_list") || "[]");

  const perto = lista.filter(o => statusPrazo(o) === "perto");

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">OS perto de vencer</h1>

      {perto.map(o => (
        <div key={o.id} className="border p-3 rounded bg-orange-50">
          <p><strong>OS {o.numero}</strong></p>
          <p>Status: {o.status}</p>
          <p>Vence em {diasParaPrazo(o)} dia(s)</p>
        </div>
      ))}

      <button onClick={() => navigate("/")} className="border px-4 py-2 rounded">
        Voltar
      </button>
    </div>
  );
}
