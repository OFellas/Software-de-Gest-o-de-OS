import type { OS } from "../types/OS";

export function diasDesde(data: string) {
  return Math.floor(
    (Date.now() - new Date(data).getTime()) /
      (1000 * 60 * 60 * 24)
  );
}

export function isAtrasada(os: OS) {
  if (os.status === "CONCLUIDA") return false;
  return diasDesde(os.dataAbertura) > 30;
}

export function isPertoDeVencer(os: OS) {
  if (os.status === "CONCLUIDA") return false;

  const dias = diasDesde(os.dataAbertura);
  return dias >= 25 && dias <= 30;
}
