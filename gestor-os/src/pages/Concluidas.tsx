import type { OS } from "../types/OS";
import { useNavigate } from "react-router-dom";

export default function Concluidas() {
  const navigate = useNavigate();
  const lista: OS[] = JSON.parse(localStorage.getItem("os_list") || "[]");

  const concluidas = lista.filter(os => os.status === "Concluída");

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-3">
      <button
        onClick={() => navigate("/")}
        className="text-blue-600 underline"
      >
        ← Voltar
      </button>

      <h1 className="text-xl font-bold">OS Concluídas</h1>

      {concluidas.map(os => (
        <div
          key={os.id}
          className="border p-3 rounded cursor-pointer"
          onClick={() => navigate(`/os/${os.id}`)}
        >
          {os.numero} – {new Date(os.conclusao!).toLocaleString()}
        </div>
      ))}
    </div>
  );
}
