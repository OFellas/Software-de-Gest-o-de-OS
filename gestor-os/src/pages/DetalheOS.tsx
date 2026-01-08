import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { OS } from "../types/OS";

export default function DetalheOS() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [os, setOs] = useState<OS | null>(null);
  const [editando, setEditando] = useState(false);
  const [modoGarantia, setModoGarantia] = useState<"envio" | "retorno" | null>(null);

  const [nfe, setNfe] = useState("");
  const [dataEnvio, setDataEnvio] = useState("");
  const [dataRetorno, setDataRetorno] = useState("");

  useEffect(() => {
    const lista: OS[] = JSON.parse(localStorage.getItem("os_list") || "[]");
    const encontrada = lista.find(o => o.id === Number(id));
    if (encontrada) {
      setOs(encontrada);
      setNfe(encontrada.garantia?.nfe || "");
    }
  }, [id]);

  if (!os) return <p className="p-6">OS não encontrada.</p>;

  function salvarLista(atualizada: OS[]) {
    localStorage.setItem("os_list", JSON.stringify(atualizada));
  }

  function salvarAlteracoes() {
    const lista: OS[] = JSON.parse(localStorage.getItem("os_list") || "[]");
    salvarLista(lista.map(o => (o.id === os.id ? os : o)));
    setEditando(false);
  }

  function enviarGarantia() {
    if (!nfe || !dataEnvio) {
      alert("Informe NF-e e data de envio.");
      return;
    }

    setOs({
      ...os,
      status: "Em garantia",
      garantia: {
        nfe,
        dataEnvio,
      },
    });

    setModoGarantia(null);
  }

  function retornoGarantia() {
    if (!dataRetorno || !os.garantia) {
      alert("Informe a data de retorno.");
      return;
    }

    setOs({
      ...os,
      status: "Aguardando retirada",
      garantia: {
        ...os.garantia,
        dataRetorno,
      },
    });

    setModoGarantia(null);
  }

  function apagarOS() {
    if (!confirm("Deseja realmente apagar esta OS?")) return;
    const lista: OS[] = JSON.parse(localStorage.getItem("os_list") || "[]");
    salvarLista(lista.filter(o => o.id !== os.id));
    navigate("/");
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-xl font-bold">OS #{os.numero}</h1>

      <p className="text-sm text-gray-600">Status: {os.status}</p>

      {/* FORMULÁRIOS DE GARANTIA */}
      {modoGarantia === "envio" && (
        <Box titulo="Enviar para garantia">
          <input className="input" placeholder="NF-e" value={nfe} onChange={e => setNfe(e.target.value)} />
          <input type="datetime-local" className="input" value={dataEnvio} onChange={e => setDataEnvio(e.target.value)} />
          <Botao onClick={enviarGarantia}>Confirmar envio</Botao>
        </Box>
      )}

      {modoGarantia === "retorno" && (
        <Box titulo="Retorno da garantia">
          <input type="datetime-local" className="input" value={dataRetorno} onChange={e => setDataRetorno(e.target.value)} />
          <Botao onClick={retornoGarantia}>Confirmar retorno</Botao>
        </Box>
      )}

      <div className="flex flex-wrap gap-2 pt-4">
        {!editando && (
          <button onClick={() => setEditando(true)} className="border px-4 py-2 rounded">
            Editar
          </button>
        )}

        {editando && (
          <button onClick={salvarAlteracoes} className="bg-blue-600 text-white px-4 py-2 rounded">
            Salvar mudanças
          </button>
        )}

        {os.status === "Em andamento" && (
          <button onClick={() => setModoGarantia("envio")} className="bg-yellow-500 text-white px-4 py-2 rounded">
            Enviar para garantia
          </button>
        )}

        {os.status === "Em garantia" && (
          <button onClick={() => setModoGarantia("retorno")} className="bg-purple-600 text-white px-4 py-2 rounded">
            Registrar retorno
          </button>
        )}

        <button onClick={apagarOS} className="bg-red-600 text-white px-4 py-2 rounded">
          Apagar
        </button>

        <button onClick={() => navigate("/")} className="border px-4 py-2 rounded">
          Voltar
        </button>
      </div>
    </div>
  );
}

function Box({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="border p-4 rounded space-y-2 bg-gray-50">
      <h2 className="font-semibold">{titulo}</h2>
      {children}
    </div>
  );
}

function Botao({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick} className="bg-blue-600 text-white px-4 py-2 rounded">
      {children}
    </button>
  );
}
