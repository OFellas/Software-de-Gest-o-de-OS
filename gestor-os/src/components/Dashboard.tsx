import { useNavigate } from "react-router-dom";
import type { OS } from "../types/OS";
import { statusPrazo, diasParaPrazo } from "../utils/osStatus";

export default function Dashboard({ osList }: { osList: OS[] }) {
  const navigate = useNavigate();

  const naoConcluidas = osList.filter(o => o.status !== "Concluída");
  const garantia = osList.filter(o => o.status === "Em garantia");
  const aguardando = osList.filter(o => o.status === "Aguardando retirada");

  const perto = osList.filter(o => statusPrazo(o) === "perto");
  const atrasadas = osList.filter(o => statusPrazo(o) === "atrasada");

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Container titulo="OS em andamento">
        {naoConcluidas.map(o => (
          <button
            key={o.id}
            onClick={() => navigate(`/os/${o.id}`)}
            className="block w-full text-left border px-2 py-1 rounded"
          >
            OS {o.numero} — {o.status}
          </button>
        ))}
      </Container>

      <Container titulo="Perto de vencer" cor="bg-orange-100">
        <button onClick={() => navigate("/perto-vencer")} className="text-left">
          ⚠️ {perto.length} OS
        </button>
      </Container>

      <Container titulo="Atrasadas" cor="bg-red-100">
        <button onClick={() => navigate("/atrasadas")} className="text-left">
          ❗ {atrasadas.length} OS
        </button>
      </Container>

      <Container titulo="Em garantia">
        <button onClick={() => navigate("/garantia")}>
          {garantia.length} OS
        </button>
      </Container>

      <Container titulo="Aguardando retirada">
        <button onClick={() => navigate("/aguardando")}>
          {aguardando.length} OS
        </button>
      </Container>
    </div>
  );
}

function Container({
  titulo,
  children,
  cor = "bg-gray-50",
}: {
  titulo: string;
  children: React.ReactNode;
  cor?: string;
}) {
  return (
    <div className={`${cor} border rounded p-3 space-y-2`}>
      <h2 className="font-semibold">{titulo}</h2>
      {children}
    </div>
  );
}
