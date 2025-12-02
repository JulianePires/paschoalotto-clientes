import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/listar-clientes/listar-clientes').then(m => m.ListarClientes),
        title: 'Listar Clientes'
    },
    {
        path: 'criar',
        loadComponent: () => import('./components/criar-cliente/criar-cliente').then(m => m.CriarCliente),
        title: 'Criar Cliente'
    },
    {
        path: 'editar/:id',
        loadComponent: () => import('./components/editar-cliente/editar-cliente').then(m => m.EditarCliente),
        title: 'Editar Cliente'
    }
]