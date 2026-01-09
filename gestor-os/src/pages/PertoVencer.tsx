import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { OS } from "../types/OS";

const STORAGE_KEY = "os_list";

function loadOS(): OS[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function diasDesde(data: string) {
  return Math.floor(
    (Date.now() - new Date(data).getTime()) /
      (1000 * 60 * 60 * 24)
  );
}

export default function PertoVencer() {
  const navigate = useNavigate();
  const [lista, setLista] = useState<OS[]>([]);

  useEffect(() => {
    const todas = loadOS();

    const filtradas = todas.filter(os => {
      if (os.status === "CONCLUIDA") return false;

      const dias = diasDesde(os.dataAbertura);
      return dias >= 25 && dias <= 30;
    });

    setLista(filtradas);
  }, []);

  return (
    <div className="p-6 max-w-3xl space-y-4">
      <h1 className="text-xl font-bold text-orange-600">
        OS Perto de Vencer
      </h1>

      {lista.length === 0 && (
        <p className="text-gray-500">
          Nenhuma OS perto de vencer 👍
        </p>
      )}

      <div className="space-y-3">
        {lista.map(os => {
          const dias = diasDesde(os.dataAbertura);

          return (
            <div
              key={os.numero}
              className="border border-orange-400 bg-orange-50 p-4 rounded"
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

                <div className="text-orange-700 font-bold">
                  {30 - dias} dia(s) para vencer
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
