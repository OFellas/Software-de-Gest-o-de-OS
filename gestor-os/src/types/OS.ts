export type StatusOS =
  | "Em andamento"
  | "Em garantia"
  | "Aguardando retirada"
  | "Concluída";

export interface OS {
  id: number;
  numero: string;

  cliente: string;
  telefone: string;
  equipamento: string;
  problema: string;
  solucao: string;
  tecnico: string;

  status: StatusOS;

  criadaEm: string;   // quando entrou no sistema
  abertaEm: string;   // quando começou de verdade
  prazo?: string;     // prazo combinado
  conclusao?: string;

  garantia?: {
    dataEnvio: string;
    dataRetorno?: string;
    nfe?: string;
    fotos?: string[];
  };
}
