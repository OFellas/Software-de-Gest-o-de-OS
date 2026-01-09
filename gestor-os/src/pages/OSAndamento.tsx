import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { OS } from "../types/OS";

const STORAGE_KEY = "os_list";

function loadOS(): OS[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveOS(list: OS[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export default function OSAndamento() {
  const navigate = useNavigate();
  const [lista, setLista] = useState<OS[]>([]);

  useEffect(() => {
    const todas = loadOS();

    // 👉 REGRA CORRETA:
    // Só NÃO aparece aqui quem estiver CONCLUÍDA
    const emAndamento = todas.filter(
      os => os.status !== "CONCLUIDA"
    );

    setLista(emAndamento);
  }, []);

  function concluirOS(numero: string) {
    const atualizada = loadOS().map(os =>
      os.numero === numero
        ? { ...os, status: "CONCLUIDA" }
        : os
    );

    saveOS(atualizada);
    setLista(atualizada.filter(os => os.status !== "CONCLUIDA"));
  }

  function apagarOS(numero: string) {
    if (!confirm("Deseja apagar esta OS?")) return;

    const atualizada = loadOS().filter(os => os.numero !== numero);
    saveOS(atualizada);
    setLista(atualizada.filter(os => os.status !== "CONCLUIDA"));
  }

  return (
    <div className="p-6 max-w-4xl space-y-4">
      <h1 className="text-xl font-bold">OS em Andamento</h1>

      {lista.length === 0 && (
        <p className="text-gray-500">
          Nenhuma OS em andamento
        </p>
      )}

      <div className="space-y-3">
        {lista.map(os => (
          <div
            key={os.numero}
            className="border p-4 rounded bg-white shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold">
                  OS {os.numero} — {os.cliente}
                </p>
                <p className="text-sm">Equipamento: {os.equipamento}</p>
                <p className="text-sm">Técnico: {os.tecnico}</p>

                {os.garantiaStatus === "EM_GARANTIA" && (
                  <p className="text-sm text-purple-600 font-semibold">
                    🔧 Em garantia ({os.empresaRMA})
                  </p>
                )}

                {os.garantiaStatus === "AGUARDANDO_RETORNO" && (
                  <p className="text-sm text-orange-600 font-semibold">
                    📦 Aguardando retirada
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => navigate(`/os/${os.numero}`)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Abrir
                </button>

                <button
                  onClick={() => navigate(`/garantia/${os.numero}`)}
                  className="bg-purple-600 text-white px-3 py-1 rounded"
                >
                  Enviar p/ Garantia
                </button>

                <button
                  onClick={() => concluirOS(os.numero)}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Concluir OS
                </button>

                <button
                  onClick={() => apagarOS(os.numero)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Apagar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/")}
        className="bg-gray-300 px-4 py-2 rounded"
      >
        Voltar
      </button>
    </div>
  );
}
