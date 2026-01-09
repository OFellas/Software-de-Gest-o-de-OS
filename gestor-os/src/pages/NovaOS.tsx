import { useState } from "react";
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

export default function NovaOS() {
  const navigate = useNavigate();

  // Data local no formato aceito pelo input
  const hojeLocal = new Date().toISOString().slice(0, 16);

  const [form, setForm] = useState({
    numero: "",
    cliente: "",
    telefone: "",
    equipamento: "",
    problema: "",
    solucao: "",
    tecnico: "",
    status: "EM_ANDAMENTO" as OS["status"],
    garantiaStatus: undefined as OS["garantiaStatus"],
    dataAberturaLocal: hojeLocal,
  });

  function setField(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function salvar() {
    const novaOS: OS = {
      numero: form.numero,
      cliente: form.cliente,
      telefone: form.telefone,
      equipamento: form.equipamento,
      problema: form.problema,
      solucao: form.solucao,
      tecnico: form.tecnico,
      status: "EM_ANDAMENTO",
      garantiaStatus: undefined,
      dataAbertura: new Date(form.dataAberturaLocal).toISOString(),
    };

    const list = loadOS();
    saveOS([...list, novaOS]);
    navigate("/");
  }

  return (
    <div className="p-6 max-w-xl space-y-3">
      <h1 className="text-xl font-bold">Nova OS</h1>

      {[
        ["numero", "Número OS"],
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
          value={(form as any)[f]}
          onChange={e => setField(f, e.target.value)}
        />
      ))}

      <label className="block">
        Data de abertura
        <input
          type="datetime-local"
          className="border p-2 w-full"
          value={form.dataAberturaLocal}
          onChange={e => setField("dataAberturaLocal", e.target.value)}
        />
      </label>

      <div className="flex gap-2 pt-2">
        <button
          onClick={salvar}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Salvar
        </button>

        <button
          onClick={() => navigate("/")}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
