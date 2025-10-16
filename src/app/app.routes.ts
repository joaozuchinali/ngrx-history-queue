import { Routes } from '@angular/router';
import { Formulario } from './modules/formulario/formulario';
import { Tabela } from './modules/tabela/tabela';

export const routes: Routes = [
    {
        path: 'formulario',
        component: Formulario
    },
    {
        path: 'tabela',
        component: Tabela
    },
    {
        path: '', redirectTo: 'formulario', pathMatch: 'full'
    },
    {
        path: '**', redirectTo: 'formulario', pathMatch: 'full'
    }
];
