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

export default function AguardandoRetirada() {
  const navigate = useNavigate();
  const [lista, setLista] = useState<OS[]>([]);
  const [selecionada, setSelecionada] = useState<OS | null>(null);

  useEffect(() => {
    atualizarLista();
  }, []);

  function atualizarLista() {
    const todas = loadOS();
    setLista(
      todas.filter(
        os => os.garantiaStatus === "AGUARDANDO_RETIRADA"
      )
    );
  }

  function atualizarOS(osAtualizada: OS) {
    const todas = loadOS();
    const atualizadas = todas.map(os =>
      os.numero === osAtualizada.numero ? osAtualizada : os
    );

    saveOS(atualizadas);
    atualizarLista();
    setSelecionada(null);
  }

  /* ===== LISTA ===== */
  if (!selecionada) {
    return (
      <div className="p-6 max-w-xl space-y-4">
        <h1 className="text-xl font-bold">
          Aguardando Retirada
        </h1>

        {lista.length === 0 && (
          <p className="text-gray-500">
            Nenhuma OS aguardando retirada
          </p>
        )}

        <select
          className="border p-2 w-full"
          size={8}
          onChange={e => {
            const os = lista.find(
              o => o.numero === e.target.value
            );
            if (os) setSelecionada(os);
          }}
        >
          <option value="">Selecione uma OS</option>
          {lista.map(os => (
            <option key={os.numero} value={os.numero}>
              OS {os.numero} — {os.cliente}
            </option>
          ))}
        </select>

        <button
          className="bg-gray-300 px-4 py-2 rounded"
          onClick={() => navigate("/")}
        >
          Voltar
        </button>
      </div>
    );
  }

  /* ===== DETALHE ===== */
  return (
    <div className="p-6 max-w-2xl space-y-4">
      <h1 className="text-xl font-bold">
        OS {selecionada.numero}
      </h1>

      <div className="border p-3 space-y-1 text-sm">
        <p><b>Cliente:</b> {selecionada.cliente}</p>
        <p><b>Telefone:</b> {selecionada.telefone}</p>
        <p><b>Equipamento:</b> {selecionada.equipamento}</p>
        <p><b>Técnico:</b> {selecionada.tecnico}</p>
        <p><b>Status da OS:</b> {selecionada.status}</p>
        <p><b>Status da Garantia:</b> {selecionada.garantiaStatus}</p>
        <p><b>Empresa / RMA:</b> {selecionada.empresaRMA}</p>
        <p><b>NF-e:</b> {selecionada.nfNumero}</p>
      </div>

      <div className="flex gap-2 flex-wrap pt-4">
        {/* CONCLUIR OS */}
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() =>
            atualizarOS({
              ...selecionada,
              status: "CONCLUIDA",
              garantiaStatus: "NAO",
              dataConclusao: new Date().toISOString(),
            })
          }
        >
          Concluir OS
        </button>

        {/* VOLTAR PARA GARANTIA */}
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded"
          onClick={() =>
            atualizarOS({
              ...selecionada,
              garantiaStatus: "EM_GARANTIA",
            })
          }
        >
          Voltar para Garantia
        </button>

        <button
          className="bg-gray-300 px-4 py-2 rounded"
          onClick={() => setSelecionada(null)}
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
