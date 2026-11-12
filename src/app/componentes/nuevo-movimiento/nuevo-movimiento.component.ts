import { Component, computed, input, output, signal } from '@angular/core';
import { Movimiento, TipoMovimiento } from '../../modelos/movimiento';

@Component({
  selector: 'app-nuevo-movimiento',
  imports: [],
  templateUrl: './nuevo-movimiento.component.html',
  styleUrl: './nuevo-movimiento.component.css',
})

export class NuevoMovimientoComponent {
  //Padre -> Hijo: el saldo llega por input()
  saldo = input.required<number>();
  //Hijo -> Padre: avisa un movimiento válido por output()
  movimientoSolicitado = output<Movimiento>();

  protected tipo = signal<TipoMovimiento>('RECARGA');
  protected texto = signal('');

  //Valor numérico del texto (null si está vacío)
  private monto = computed(() => {
    const t = this.texto().trim();
    return t === '' ? null : Number(t);
  });

  //Mensaje de error (null si no hay error)
  protected error = computed<string | null>(() => {
    const m = this.monto();
    if (m === null) return null; // aún no escribe nada
    if (Number.isNaN(m)) return 'Ingrese un monto numérico.';
    if (m <= 0) return 'El monto debe ser mayor que cero.';
    if (this.tipo() === 'GASTO' && m > this.saldo()) {
      return 'Saldo insuficiente para realizar el gasto.';
    }
    return null;
  });

  //formulario es válido si hay monto y no hay error
  protected formularioValido = computed(() => this.monto() !== null && this.error() === null);

  protected alCambiarTipo(evento: Event): void {
    this.tipo.set((evento.target as HTMLSelectElement).value as TipoMovimiento);
  }

  protected alEscribir(evento: Event): void {
    this.texto.set((evento.target as HTMLInputElement).value);
  }

  protected alSolicitar(): void {
    if (!this.formularioValido()) return;
    this.movimientoSolicitado.emit({ tipo: this.tipo(), monto: this.monto()! });
    this.texto.set(''); // limpia el campo
  }
}