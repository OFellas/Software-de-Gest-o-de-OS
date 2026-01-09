import { useEffect, useState } from "react";
import type { OS } from "../types/OS";

const STORAGE_KEY = "os_list";

function loadOS(): OS[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveOS(list: OS[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

type View =
  | "DASHBOARD"
  | "NOVA"
  | "EDITAR"
  | "LISTA_ANDAMENTO"
  | "LISTA_CONCLUIDAS"
  | "PERTO"
  | "ATRASADA"
  | "GARANTIA";

export default function Home() {
  const [osList, setOsList] = useState<OS[]>([]);
  const [view, setView] = useState<View>("DASHBOARD");
  const [selectedOS, setSelectedOS] = useState<OS | null>(null);

  useEffect(() => {
    setOsList(loadOS());
  }, []);

  function persist(list: OS[]) {
    setOsList(list);
    saveOS(list);
  }

  function diasDesde(data: string) {
    const diff =
      (Date.now() - new Date(data).getTime()) / (1000 * 60 * 60 * 24);
    return Math.floor(diff);
  }

  const emAndamento = osList.filter(o => o.status === "EM_ANDAMENTO");
  const concluidas = osList.filter(o => o.status === "CONCLUIDA");

  const pertoDeVencer = osList.filter(o => {
    const d = diasDesde(o.dataAbertura);
    return d >= 27 && d < 30;
  });

  const atrasadas = osList.filter(o => diasDesde(o.dataAbertura) >= 30);

  const emGarantia = osList.filter(
    o =>
      o.garantiaStatus === "EM_GARANTIA" ||
      o.garantiaStatus === "AGUARDANDO_RETORNO" ||
      o.garantiaStatus === "AGUARDANDO_RETIRADA"
  );

  /* ================= DASHBOARD ================= */

  if (view === "DASHBOARD") {
    return (
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <div className="grid grid-cols-3 gap-4">
          <Box title="Em andamento" onClick={() => setView("LISTA_ANDAMENTO")}>
            {emAndamento.length}
          </Box>

          <Box title="Concluídas" onClick={() => setView("LISTA_CONCLUIDAS")}>
            {concluidas.length}
          </Box>

          <Box title="Em garantia" onClick={() => setView("GARANTIA")}>
            {emGarantia.length}
          </Box>

          <Box title="Perto de vencer" color="orange" onClick={() => setView("PERTO")}>
            {pertoDeVencer.length}
          </Box>

          <Box title="Atrasadas" color="red" onClick={() => setView("ATRASADA")}>
            {atrasadas.length}
          </Box>

          <Box title="Nova OS" onClick={() => setView("NOVA")}>
            +
          </Box>
        </div>
      </div>
    );
  }

  /* ================= NOVA OS ================= */

  if (view === "NOVA") {
    const [form, setForm] = useState<OS>({
      numero: "",
      cliente: "",
      telefone: "",
      equipamento: "",
      problema: "",
      solucao: "",
      tecnico: "",
      status: "EM_ANDAMENTO",
      garantiaStatus: "NAO",
      dataAbertura: new Date().toISOString(),
    });

    function salvar() {
      persist([...osList, form]);
      setView("DASHBOARD");
    }

    return (
      <FormOS
        titulo="Nova OS"
        os={form}
        onChange={setForm}
        onSave={salvar}
        onCancel={() => setView("DASHBOARD")}
      />
    );
  }

  /* ================= EDITAR OS ================= */

  if (view === "EDITAR" && selectedOS) {
    const [form, setForm] = useState<OS>(selectedOS);

    function salvar() {
      persist(osList.map(o => (o.numero === form.numero ? form : o)));
      setView("DASHBOARD");
    }

    return (
      <FormOS
        titulo={`Editar OS ${form.numero}`}
        os={form}
        onChange={setForm}
        onSave={salvar}
        onCancel={() => setView("DASHBOARD")}
      />
    );
  }

  /* ================= LISTAGENS ================= */

  function Lista({ lista, titulo }: { lista: OS[]; titulo: string }) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">{titulo}</h1>

        <ul className="space-y-2">
          {lista.map(o => (
            <li
              key={o.numero}
              className="border p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setSelectedOS(o);
                setView("EDITAR");
              }}
            >
              OS {o.numero} – {o.cliente}
            </li>
          ))}
        </ul>

        <button className="mt-4" onClick={() => setView("DASHBOARD")}>
          Voltar
        </button>
      </div>
    );
  }

  if (view === "LISTA_ANDAMENTO")
    return <Lista lista={emAndamento} titulo="OS em andamento" />;

  if (view === "LISTA_CONCLUIDAS")
    return <Lista lista={concluidas} titulo="OS concluídas" />;

  if (view === "PERTO")
    return <Lista lista={pertoDeVencer} titulo="OS perto de vencer" />;

  if (view === "ATRASADA")
    return <Lista lista={atrasadas} titulo="OS atrasadas" />;

  if (view === "GARANTIA")
    return <Lista lista={emGarantia} titulo="OS em garantia" />;

  return null;
}

/* ================= COMPONENTES ================= */

function Box({ title, children, onClick, color }: any) {
  return (
    <div
      onClick={onClick}
      className={`border p-4 cursor-pointer ${
        color === "orange"
          ? "bg-orange-100"
          : color === "red"
          ? "bg-red-100"
          : "bg-white"
      }`}
    >
      <h2 className="font-bold">{title}</h2>
      <div className="text-2xl">{children}</div>
    </div>
  );
}

function FormOS({ titulo, os, onChange, onSave, onCancel }: any) {
  function set(field: string, value: string) {
    onChange({ ...os, [field]: value });
  }

  return (
    <div className="p-6 max-w-xl space-y-2">
      <h1 className="text-xl font-bold">{titulo}</h1>

      {[
        ["numero", "Número da OS"],
        ["cliente", "Cliente"],
        ["telefone", "Telefone"],
        ["equipamento", "Equipamento"],
        ["problema", "Problema"],
        ["solucao", "Solução"],
        ["tecnico", "Técnico"],
      ].map(([f, l]) => (
        <input
          key={f}
          placeholder={l}
          className="border p-2 w-full"
          value={os[f] || ""}
          onChange={e => set(f, e.target.value)}
        />
      ))}

      <label className="block">
        Data de abertura
        <input
          type="datetime-local"
          className="border p-2 w-full"
          value={os.dataAbertura.slice(0, 16)}
          onChange={e => set("dataAbertura", new Date(e.target.value).toISOString())}
        />
      </label>

      <div className="flex gap-2 pt-2">
        <button onClick={onSave}>Salvar</button>
        <button onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
}
