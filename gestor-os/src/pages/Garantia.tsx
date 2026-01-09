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

export default function Garantia() {
  const navigate = useNavigate();
  const [lista, setLista] = useState<OS[]>([]);

  useEffect(() => {
    atualizar();
  }, []);

  function atualizar() {
    const todas = loadOS();
    setLista(
      todas.filter(os => os.garantiaStatus === "EM_GARANTIA")
    );
  }

  function marcarRetorno(os: OS) {
    const atualizadas = loadOS().map(o =>
      o.numero === os.numero
        ? { ...o, garantiaStatus: "AGUARDANDO_RETIRADA" }
        : o
    );

    saveOS(atualizadas);
    atualizar();
    navigate("/aguardando-retirada");
  }

  return (
    <div className="p-6 max-w-3xl space-y-4">
      <h1 className="text-xl font-bold">Em Garantia</h1>

      {lista.length === 0 && (
        <p className="text-gray-500">
          Nenhuma OS em garantia
        </p>
      )}

      {lista.map(os => (
        <div
          key={os.numero}
          className="border p-4 rounded space-y-2"
        >
          <p className="font-semibold">
            OS {os.numero} — {os.cliente}
          </p>

          <div className="text-sm">
            <p><b>Empresa / RMA:</b> {os.empresaRMA}</p>
            <p><b>NF-e:</b> {os.nfNumero}</p>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              className="bg-orange-600 text-white px-3 py-1 rounded"
              onClick={() => marcarRetorno(os)}
            >
              Marcar Retorno
            </button>

            <button
              className="bg-gray-300 px-3 py-1 rounded"
              onClick={() => navigate(-1)}
            >
              Voltar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
