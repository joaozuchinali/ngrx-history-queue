import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUsuario, UserState } from '../../ngrx/usuario.selector';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-tabela',
  imports: [MatCardModule],
  templateUrl: './tabela.html',
  styleUrl: './tabela.scss'
})
export class Tabela {
    usuarioHistorico: any = [];

    constructor(
        private store: Store<UserState>
    ) { 
        this.store.select(selectUsuario).subscribe((value) => {
            console.log('Tabela - usuarioHistorico', value);
            this.usuarioHistorico = [...value];
        });
    }
}
