import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { OS } from "../types/OS";
import Dashboard from "../components/Dashboard";

export default function Home() {
  const [osList, setOsList] = useState<OS[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("os_list");
    if (data) setOsList(JSON.parse(data));
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex gap-2">
        <button
          onClick={() => navigate("/nova-os")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Nova OS
        </button>

        <button
          onClick={() => navigate("/concluidas")}
          className="border px-4 py-2 rounded"
        >
          Ver OS concluídas
        </button>
      </div>

      <Dashboard osList={osList} />
    </div>
  );
}
