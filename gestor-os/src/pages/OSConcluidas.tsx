import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { OS } from "../types/OS";

const STORAGE_KEY = "os_list";

function loadOS(): OS[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export default function OSConcluidas() {
  const navigate = useNavigate();
  const [osList, setOsList] = useState<OS[]>([]);

  useEffect(() => {
    setOsList(loadOS());
  }, []);

  const concluidas = osList.filter(o => o.status === "CONCLUIDA");

  return (
    <div className="p-6 max-w-4xl space-y-4">
      <h1 className="text-xl font-bold">OS Concluídas</h1>

      {concluidas.length === 0 && (
        <p className="text-gray-500">Nenhuma OS concluída.</p>
      )}

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left">OS</th>
            <th className="border p-2 text-left">Cliente</th>
            <th className="border p-2">Abertura</th>
            <th className="border p-2">Conclusão</th>
          </tr>
        </thead>

        <tbody>
          {concluidas.map(o => (
            <tr
              key={o.numero}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => navigate(`/os/${o.numero}`)}
            >
              <td className="border p-2">OS {o.numero}</td>
              <td className="border p-2">{o.cliente}</td>
              <td className="border p-2 text-center">
                {new Date(o.dataAbertura).toLocaleString()}
              </td>
              <td className="border p-2 text-center">
                {o.dataConclusao
                  ? new Date(o.dataConclusao).toLocaleString()
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="bg-gray-300 px-4 py-2 rounded"
        onClick={() => navigate("/")}
      >
        Voltar
      </button>
    </div>
  );
}
