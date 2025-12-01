export interface IFiltros {
    page?: number;
    limit?: number;
    search?: string;
}

export interface ICriarCliente {
  nome: string;
  email: string;
  telefone: string;
  cidade: string;
  logotipo?: string;
}

export interface IAtualizarCliente {
  nome?: string;
  email?: string;
  telefone?: string;
  cidade?: string;
  logotipo?: string;
}
