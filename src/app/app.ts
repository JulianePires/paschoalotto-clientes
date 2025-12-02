import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreModule } from './core/core-module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CoreModule],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Paschoalotto - Gerenciamento de Clientes');
}
