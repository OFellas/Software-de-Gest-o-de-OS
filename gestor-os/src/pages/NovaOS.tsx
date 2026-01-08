import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { OS } from "../types/OS";

export default function NovaOS() {
  const navigate = useNavigate();

  const [numero, setNumero] = useState("");
  const [cliente, setCliente] = useState("");
  const [telefone, setTelefone] = useState("");
  const [equipamento, setEquipamento] = useState("");
  const [problema, setProblema] = useState("");
  const [solucao, setSolucao] = useState("");
  const [tecnico, setTecnico] = useState("");

  const [abertaEm, setAbertaEm] = useState("");
  const [prazo, setPrazo] = useState("");

  function salvar() {
    if (!numero || !cliente || !equipamento) {
      alert("Preencha pelo menos número, cliente e equipamento.");
      return;
    }

    const novaOS: OS = {
      id: Date.now(),
      numero,
      cliente,
      telefone,
      equipamento,
      problema,
      solucao,
      tecnico,
      status: "Em andamento",
      criadaEm: new Date().toISOString(),
      abertaEm: abertaEm || new Date().toISOString(),
      prazo: prazo || undefined,
    };

    const lista: OS[] = JSON.parse(
      localStorage.getItem("os_list") || "[]"
    );

    localStorage.setItem(
      "os_list",
      JSON.stringify([...lista, novaOS])
    );

    navigate("/");
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-xl font-bold">Nova OS</h1>

      <input className="input" placeholder="Número da OS" value={numero} onChange={e => setNumero(e.target.value)} />
      <input className="input" placeholder="Cliente" value={cliente} onChange={e => setCliente(e.target.value)} />
      <input className="input" placeholder="Telefone" value={telefone} onChange={e => setTelefone(e.target.value)} />
      <input className="input" placeholder="Equipamento" value={equipamento} onChange={e => setEquipamento(e.target.value)} />

      <textarea className="input" placeholder="Descrição do problema" value={problema} onChange={e => setProblema(e.target.value)} />
      <textarea className="input" placeholder="Solução" value={solucao} onChange={e => setSolucao(e.target.value)} />

      <input className="input" placeholder="Técnico responsável" value={tecnico} onChange={e => setTecnico(e.target.value)} />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm">Data de início</label>
          <input type="datetime-local" className="input" value={abertaEm} onChange={e => setAbertaEm(e.target.value)} />
        </div>

        <div>
          <label className="text-sm">Prazo</label>
          <input type="datetime-local" className="input" value={prazo} onChange={e => setPrazo(e.target.value)} />
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={salvar} className="bg-blue-600 text-white px-4 py-2 rounded">
          Salvar OS
        </button>
        <button onClick={() => navigate("/")} className="border px-4 py-2 rounded">
          Cancelar
        </button>
      </div>
    </div>
  );
}
