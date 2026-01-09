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

export default function EnviarGarantia() {
  const { numero } = useParams<{ numero: string }>();
  const navigate = useNavigate();

  const [os, setOS] = useState<OS | null>(null);
  const [empresaRMA, setEmpresaRMA] = useState("");
  const [nfNumero, setNfNumero] = useState("");

  useEffect(() => {
    const lista = loadOS();
    const encontrada = lista.find(o => o.numero === numero);

    if (!encontrada) {
      alert("OS não encontrada");
      navigate("/");
      return;
    }

    setOS(encontrada);
  }, [numero, navigate]);

  function enviarParaGarantia() {
    if (!empresaRMA.trim()) {
      alert("Informe a empresa / RMA");
      return;
    }

    if (!nfNumero.trim()) {
      alert("Informe o número da NF-e");
      return;
    }

    const listaAtualizada = loadOS().map(o =>
      o.numero === numero
        ? {
            ...o,
            garantiaStatus: "EM_GARANTIA",
            empresaRMA,
            nfNumero,
          }
        : o
    );

    saveOS(listaAtualizada);
    navigate("/garantia");
  }

  if (!os) return null;

  return (
    <div className="p-6 max-w-md space-y-4 bg-white rounded shadow">
      <h1 className="text-xl font-bold">Enviar para Garantia</h1>

      <p className="text-sm text-gray-600">
        OS {os.numero} — {os.cliente}
      </p>

      <input
        className="border p-2 w-full"
        placeholder="Empresa / RMA (ex: Solid Importação)"
        value={empresaRMA}
        onChange={e => setEmpresaRMA(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        placeholder="Número da NF-e"
        value={nfNumero}
        onChange={e => setNfNumero(e.target.value)}
      />

      <div className="flex gap-2 pt-4">
        <button
          onClick={enviarParaGarantia}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Enviar para Garantia
        </button>

        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
