import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-input-busca',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatLabel],
  templateUrl: './input-busca.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputBusca {
  change = input('');

  onChangeBusca(event: Event) {
    const target = event.target as HTMLInputElement;
    this.change.apply(target.value);
  }
}
