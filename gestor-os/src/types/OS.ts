export type GarantiaStatus =
  | "NAO"
  | "EM_GARANTIA"
  | "AGUARDANDO_RETIRADA";

export type OSStatus = "EM_ANDAMENTO" | "CONCLUIDA";

export interface OS {
  numero: string;
  cliente: string;
  telefone: string;
  equipamento: string;
  problema: string;
  solucao: string;
  tecnico: string;

  status: OSStatus;
  garantiaStatus: GarantiaStatus;

  dataAbertura: string;
  dataConclusao?: string;

  // 🔹 GARANTIA
  nfNumero?: string;
  empresaRMA?: string;
}
