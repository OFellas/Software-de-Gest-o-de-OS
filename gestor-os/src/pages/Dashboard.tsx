import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { OS } from "../types/OS";
import { exportarOS } from "../utils/exportOS";

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

export default function Dashboard() {
  const navigate = useNavigate();
  const [lista, setLista] = useState<OS[]>([]);

  useEffect(() => {
    const raw = loadOS();
    const normalizadas = raw.map(os => ({
      ...os,
      garantiaStatus: os.garantiaStatus ?? "NAO",
    }));
    setLista(normalizadas);
  }, []);

  const emAndamento = useMemo(
    () => lista.filter(os => os.status !== "CONCLUIDA"),
    [lista]
  );

  const concluidas = useMemo(
    () => lista.filter(os => os.status === "CONCLUIDA"),
    [lista]
  );

  const pertoDeVencer = useMemo(
    () =>
      lista.filter(os => {
        if (os.status === "CONCLUIDA") return false;
        const dias = diasDesde(os.dataAbertura);
        return dias >= 25 && dias < 30;
      }),
    [lista]
  );

  const atrasadas = useMemo(
    () =>
      lista.filter(os => {
        if (os.status === "CONCLUIDA") return false;
        const dias = diasDesde(os.dataAbertura);
        return dias >= 30;
      }),
    [lista]
  );

  const emGarantia = useMemo(
    () =>
      lista.filter(
        os =>
          os.garantiaStatus === "GARANTIA" ||
          os.garantiaStatus === "EM_GARANTIA"
      ),
    [lista]
  );

  const aguardandoRetirada = useMemo(
    () => lista.filter(os => os.garantiaStatus === "AGUARDANDO_RETIRADA"),
    [lista]
  );

  function Card({ titulo, qtd, cor, rota }: any) {
    return (
      <div
        onClick={() => navigate(rota)}
        className={`cursor-pointer rounded-lg p-4 text-white ${cor}`}
      >
        <p className="text-sm">{titulo}</p>
        <p className="text-3xl font-bold">{qtd}</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card titulo="Em andamento" qtd={emAndamento.length} cor="bg-blue-600" rota="/em-andamento" />
        <Card titulo="Perto de vencer" qtd={pertoDeVencer.length} cor="bg-yellow-500" rota="/perto-de-vencer" />
        <Card titulo="Atrasadas" qtd={atrasadas.length} cor="bg-red-600" rota="/atrasadas" />
        <Card titulo="Em garantia" qtd={emGarantia.length} cor="bg-purple-600" rota="/garantia" />
        <Card titulo="Aguardando retirada" qtd={aguardandoRetirada.length} cor="bg-orange-600" rota="/aguardando-retirada" />
        <Card titulo="Concluídas" qtd={concluidas.length} cor="bg-green-600" rota="/concluidas" />
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => navigate("/nova-os")}
          className="bg-black text-white px-6 py-3 rounded"
        >
          Nova OS
        </button>

        <button
          onClick={() => exportarOS(lista)}
          className="bg-green-700 text-white px-6 py-3 rounded"
        >
          Exportar OS
        </button>
      </div>
    </div>
  );
}
