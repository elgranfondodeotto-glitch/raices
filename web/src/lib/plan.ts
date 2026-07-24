export type PlanInput = {
  pais: string;
  edad: number;
  ingresosMensuales: number;
  ahorros: number;
  capitalDisponible: number;
  meta: string;
  tiempoAnios: number;
  tipoPropiedad: string;
};

export type PlanResultado = {
  cuotaInicialEstimada: number;
  capacidadCompra: number;
  ahorroMensualSugerido: number;
  mesesParaMeta: number;
};

/**
 * Estimación referencial (no es una oferta de crédito). Regla usada:
 * cuota inicial 30% del valor (40% en lotes/fincas, financiación más restringida),
 * y el ahorro mensual sugerido es el 20% del ingreso declarado.
 */
export function calcularPlan(input: PlanInput): PlanResultado {
  const ahorroMensualSugerido = Math.round(input.ingresosMensuales * 0.2);
  const horizonteMeses = Math.max(input.tiempoAnios, 1) * 12;
  const colchonAhorros = input.ahorros * 0.5;
  const capitalProyectado =
    input.capitalDisponible + colchonAhorros + ahorroMensualSugerido * horizonteMeses;

  const pctCuotaInicial = ["Lote", "Finca"].includes(input.tipoPropiedad) ? 0.4 : 0.3;
  const capacidadCompra = Math.round(capitalProyectado / pctCuotaInicial);
  const cuotaInicialEstimada = Math.round(capacidadCompra * pctCuotaInicial);

  const faltante = cuotaInicialEstimada - input.capitalDisponible - colchonAhorros;
  const mesesParaMeta =
    ahorroMensualSugerido > 0 ? Math.max(0, Math.ceil(faltante / ahorroMensualSugerido)) : horizonteMeses;

  return { cuotaInicialEstimada, capacidadCompra, ahorroMensualSugerido, mesesParaMeta };
}
