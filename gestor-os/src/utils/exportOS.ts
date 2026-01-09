import type { OS } from "../types/OS";

export function exportarOS(osList: OS[]) {
  if (osList.length === 0) {
    alert("Nenhuma OS para exportar");
    return;
  }

  const headers = [
    "Número OS",
    "Cliente",
    "Telefone",
    "Equipamento",
    "Problema",
    "Solução",
    "Técnico",
    "Status",
    "Status Garantia",
    "Data de Abertura",
    "Data de Conclusão",
  ];

  const rows = osList.map(os => [
    os.numero,
    os.cliente,
    os.telefone,
    os.equipamento,
    os.problema,
    os.solucao,
    os.tecnico,
    os.status,
    os.garantiaStatus ?? "NAO",
    formatarData(os.dataAbertura),
    os.dataConclusao ? formatarData(os.dataConclusao) : "",
  ]);

  const csvContent = [
    headers.join(";"),
    ...rows.map(r => r.map(c => `"${c ?? ""}"`).join(";")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `OS_${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();

  URL.revokeObjectURL(url);
}

function formatarData(data: string) {
  const d = new Date(data);
  return d.toLocaleDateString("pt-BR") + " " + d.toLocaleTimeString("pt-BR");
}
