import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ICliente } from '../types/cliente.type';
import { IAtualizarCliente, ICriarCliente, IFiltros } from '../types/request.type';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = 'http://localhost:4000/clientes';
  constructor(public http: HttpClient) {}
  
  buscarClientes(filtro?: IFiltros) : Observable<{ data: ICliente[]; total: number }> {
    let params = new HttpParams();
    if (filtro) {
      if (filtro.page != null) params = params.set('page', String(filtro.page));
      // some servers expect pageSize param name
      if (filtro.limit != null) params = params.set('pageSize', String(filtro.limit));
      if (filtro.search != null) params = params.set('query', String(filtro.search));
    }

    return this.http
      .get<ICliente[]>(this.apiUrl, { params, observe: 'response' })
      .pipe(
        map((resp) => {
          const totalHeader = resp.headers.get('X-Total-Count');
          const total = totalHeader ? Number(totalHeader) : (resp.body ? resp.body.length : 0);
          return { data: resp.body || [], total };
        })
      );
  }

  buscarClientePorId(id: string) : Observable<ICliente> {
    return this.http.get<ICliente>(`${this.apiUrl}/${id}`);
  }

  criarCliente(dadosCliente: ICriarCliente) : Observable<ICliente> {
    return this.http.post<ICliente>(this.apiUrl, dadosCliente);
  }

  atualizarCliente(id: string, dadosCliente: IAtualizarCliente) {
    return this.http.put(`${this.apiUrl}/${id}`, dadosCliente);
  }

  atualizarLogotipoCliente(id: string, arquivoLogotipo: File) {
    const formData = new FormData();
    formData.append('logotipo', arquivoLogotipo);

    return this.http.post(`${this.apiUrl}/${id}/upload`, formData);
  }

  deletarCliente(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
