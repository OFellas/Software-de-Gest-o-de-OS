import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { OS } from "../types/OS";

const STORAGE_KEY = "os_list";

function loadOS(): OS[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveOS(list: OS[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function normalizar(v?: string) {
  return (v || "").trim();
}

export default function DetalheOS() {
  const { numero } = useParams<{ numero: string }>();
  const navigate = useNavigate();
  const [os, setOS] = useState<OS | null>(null);

  useEffect(() => {
    const lista = loadOS();
    const encontrada = lista.find(
      o => normalizar(o.numero) === normalizar(numero)
    );

    if (!encontrada) {
      alert("OS não encontrada");
      navigate("/");
      return;
    }

    setOS(encontrada);
  }, [numero, navigate]);

  function concluirOS() {
    if (!os) return;

    const lista = loadOS().map(o =>
      o.numero === os.numero
        ? {
            ...o,
            status: "CONCLUIDA",
            dataConclusao: new Date().toISOString(),
          }
        : o
    );

    saveOS(lista);
    navigate("/");
  }

  function apagarOS() {
    if (!os) return;
    if (!confirm("Deseja realmente apagar esta OS?")) return;

    const lista = loadOS().filter(o => o.numero !== os.numero);
    saveOS(lista);
    navigate("/");
  }

  if (!os) return null;

  return (
    <div className="p-6 max-w-xl space-y-4">
      <h1 className="text-xl font-bold">Detalhes da OS</h1>

      <div className="space-y-1 text-sm">
        <p><b>OS:</b> {os.numero}</p>
        <p><b>Cliente:</b> {os.cliente}</p>
        <p><b>Telefone:</b> {os.telefone}</p>
        <p><b>Equipamento:</b> {os.equipamento}</p>
        <p><b>Problema:</b> {os.problema}</p>
        <p><b>Solução:</b> {os.solucao}</p>
        <p><b>Técnico:</b> {os.tecnico}</p>
        <p><b>Status:</b> {os.status}</p>
        <p>
          <b>Aberta em:</b>{" "}
          {new Date(os.dataAbertura).toLocaleString()}
        </p>

        {os.dataConclusao && (
          <p>
            <b>Concluída em:</b>{" "}
            {new Date(os.dataConclusao).toLocaleString()}
          </p>
        )}
      </div>

      {/* 🔧 BLOCO DE GARANTIA */}
      {os.garantiaStatus !== "NAO" && (
        <div className="border rounded p-3 bg-purple-50">
          <p className="font-semibold text-purple-700">
            Garantia
          </p>
          <p className="text-sm">
            <b>Status:</b> {os.garantiaStatus}
          </p>
          <p className="text-sm">
            <b>Empresa / RMA:</b> {os.empresaRMA}
          </p>
          <p className="text-sm">
            <b>NF-e:</b> {os.nfNumero}
          </p>
        </div>
      )}

      {/* 🔘 AÇÕES */}
      <div className="flex flex-wrap gap-2 pt-2">
        {os.status !== "CONCLUIDA" && (
          <button
            onClick={concluirOS}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Concluir OS
          </button>
        )}

        {os.garantiaStatus === "NAO" && (
          <button
            onClick={() => navigate(`/garantia/${os.numero}`)}
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Enviar p/ Garantia
          </button>
        )}

        <button
          onClick={apagarOS}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Apagar OS
        </button>

        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
