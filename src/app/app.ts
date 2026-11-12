import { Component } from '@angular/core';
import { BilleteraComponent } from './componentes/billetera/billetera.component';

@Component({
  selector: 'app-root',
  imports: [BilleteraComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}