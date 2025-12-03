import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICliente } from '../types/cliente.type';
import { IAtualizarCliente, ICriarCliente, IFiltros } from '../types/request.type';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = 'http://localhost:4000/clientes';
  constructor(public http: HttpClient) {}
  
  buscarClientes(filtro?: IFiltros) : Observable<ICliente[]> {
    return this.http.get<ICliente[]>(this.apiUrl, { params: filtro as HttpParams });
  }

  buscarClientePorId(id: number) : Observable<ICliente> {
    return this.http.get<ICliente>(`${this.apiUrl}/${id}`);
  }

  criarCliente(dadosCliente: ICriarCliente) : Observable<ICliente> {
    return this.http.post<ICliente>(this.apiUrl, dadosCliente);
  }

  atualizarCliente(id: number, dadosCliente: IAtualizarCliente) {
    return this.http.put(`${this.apiUrl}/${id}`, dadosCliente);
  }

  atualizarLogotipoCliente(id: number, arquivoLogotipo: File) {
    const formData = new FormData();
    formData.append('logotipo', arquivoLogotipo);

    return this.http.patch(`${this.apiUrl}/${id}/upload`, formData);
  }

  deletarCliente(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
