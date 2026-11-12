import { Component, signal } from '@angular/core';
import { Movimiento } from '../../modelos/movimiento';
import { NuevoMovimientoComponent } from '../nuevo-movimiento/nuevo-movimiento.component';

@Component({
  selector: 'app-billetera',
  imports: [NuevoMovimientoComponent],
  templateUrl: './billetera.component.html',
  styleUrl: './billetera.component.css',
})
export class BilleteraComponent {
  //El padre es dueño del estado
  protected saldo = signal(250);
  protected movimientos = signal<Movimiento[]>([]);

  protected alRegistrar(m: Movimiento): void {
    if (m.monto <= 0) return;
    if (m.tipo === 'GASTO' && m.monto > this.saldo()) return;

    const delta = m.tipo === 'RECARGA' ? m.monto : -m.monto;
    this.saldo.update((s) => Math.round((s + delta) * 100) / 100);
    this.movimientos.update((lista) => [m, ...lista]); // el más reciente primero
  }
}