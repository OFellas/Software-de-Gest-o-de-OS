import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { OS } from "../types/OS";

export default function OSForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    numero: "",
    cliente: "",
    telefone: "",
    equipamento: "",
    problema: "",
    solucao: "",
    tecnico: "",
  });

  function salvar() {
    const lista: OS[] = JSON.parse(localStorage.getItem("os_list") || "[]");

    const novaOS: OS = {
      id: Date.now(),
      ...form,
      dataAbertura: new Date().toISOString(),
      status: "EM_ANDAMENTO",
    };

    localStorage.setItem("os_list", JSON.stringify([...lista, novaOS]));
    navigate("/");
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-4 rounded shadow space-y-2">
      <h2 className="font-bold">Nova OS</h2>

      {Object.keys(form).map(campo => (
        <input
          key={campo}
          placeholder={campo}
          className="border p-2 w-full"
          value={(form as any)[campo]}
          onChange={e => setForm({ ...form, [campo]: e.target.value })}
        />
      ))}

      <div className="flex gap-2">
        <button
          onClick={salvar}
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          Salvar OS
        </button>

        <button
          onClick={() => navigate("/")}
          className="border px-4 py-1 rounded"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
