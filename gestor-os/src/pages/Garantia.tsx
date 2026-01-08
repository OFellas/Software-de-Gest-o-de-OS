import { useNavigate } from "react-router-dom";
import type { OS } from "../types/OS";

export default function Garantia() {
  const navigate = useNavigate();
  const lista: OS[] = JSON.parse(localStorage.getItem("os_list") || "[]");

  const garantia = lista.filter(o => o.status === "Em garantia");

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">OS em garantia</h1>

      {garantia.map(o => (
        <div key={o.id} className="border p-4 rounded bg-yellow-50 space-y-1">
          <p><strong>OS {o.numero}</strong></p>
          <p>Cliente: {o.cliente}</p>
          <p>NF-e: {o.garantia?.nfe}</p>
          <button
            onClick={() => navigate(`/os/${o.id}`)}
            className="border px-3 py-1 rounded"
          >
            Abrir OS
          </button>
        </div>
      ))}

      <button onClick={() => navigate("/")} className="border px-4 py-2 rounded">
        Voltar
      </button>
    </div>
  );
}
