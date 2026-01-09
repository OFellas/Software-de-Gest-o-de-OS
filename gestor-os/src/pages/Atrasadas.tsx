import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { OS } from "../types/OS";

const STORAGE_KEY = "os_list";
const LIMITE_DIAS = 30;

function loadOS(): OS[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function diasEntre(inicio: string) {
  const start = new Date(inicio);
  const hoje = new Date();
  const diff = hoje.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export default function Atrasadas() {
  const navigate = useNavigate();
  const [atrasadas, setAtrasadas] = useState<OS[]>([]);

  useEffect(() => {
    const todas = loadOS();

    const filtradas = todas.filter(os => {
      if (os.status === "CONCLUIDA") return false;
      return diasEntre(os.dataAbertura) > LIMITE_DIAS;
    });

    setAtrasadas(filtradas);
  }, []);

  return (
    <div className="p-6 max-w-3xl space-y-4">
      <h1 className="text-xl font-bold text-red-600">OS Atrasadas</h1>

      {atrasadas.length === 0 && (
        <p className="text-gray-500">Nenhuma OS atrasada 🎉</p>
      )}

      <div className="space-y-3">
        {atrasadas.map(os => {
          const dias = diasEntre(os.dataAbertura) - LIMITE_DIAS;

          return (
            <div
              key={os.numero}
              className="border border-red-400 bg-red-50 p-4 rounded"
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-bold">
                    OS {os.numero} – {os.cliente}
                  </p>
                  <p className="text-sm">
                    Equipamento: {os.equipamento}
                  </p>
                  <p className="text-sm">
                    Técnico: {os.tecnico}
                  </p>
                </div>

                <div className="text-right text-red-700 font-bold">
                  {dias} dia(s) atrasada
                </div>
              </div>

              <div className="text-sm mt-2">
                <p>Status: {os.status}</p>
                {os.garantiaStatus && (
                  <p>Garantia: {os.garantiaStatus}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <button
        className="bg-gray-300 px-4 py-2 rounded"
        onClick={() => navigate("/")}
      >
        Voltar
      </button>
    </div>
  );
}
