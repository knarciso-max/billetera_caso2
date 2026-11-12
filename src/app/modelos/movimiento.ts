export type TipoMovimiento = 'RECARGA' | 'GASTO';

export interface Movimiento {
  tipo: TipoMovimiento;
  monto: number;
}