import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ClienteService } from './cliente.service';

describe('Cliente', () => {
  let service: ClienteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ClienteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve buscar clientes', () => {
    const mockData = [{ id: '1', nome: 'Cliente 1' } as any];

    service.buscarClientes().subscribe((response) => {
      expect(response).toBeTruthy();
      expect(response.data).toEqual(mockData);
    });

    const req = httpMock.expectOne((r) => r.method === 'GET' && r.url.includes('/clientes'));
    req.flush(mockData, { headers: { 'X-Total-Count': String(mockData.length) } });
  });

  it('deve buscar cliente por ID', () => {
    const clienteId = '1';
    const mockCliente = { id: clienteId, nome: 'Cliente 1' } as any;

    service.buscarClientePorId(clienteId).subscribe((response) => {
      expect(response).toEqual(mockCliente);
    });

    const req = httpMock.expectOne(`${(service as any).apiUrl}/${clienteId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCliente);
  });

  it('deve criar um novo cliente', () => {
    const novoCliente = {
      nome: 'Cliente Teste',
      email: 'teste@teste.com',
      telefone: '123456789',
      cidade: 'Cidade Teste'
    } as any;

    const created = { id: '10', ...novoCliente } as any;

    service.criarCliente(novoCliente).subscribe((response) => {
      expect(response).toEqual(created);
    });

    const req = httpMock.expectOne((r) => r.method === 'POST' && r.url.includes('/clientes'));
    req.flush(created);
  });

  it('deve atualizar um cliente existente', () => {
    const clienteId = '1';
    const dadosAtualizados = {
      nome: 'Cliente Atualizado',
    } as any;

    service.atualizarCliente(clienteId, dadosAtualizados).subscribe((response) => {
      expect(response).toEqual(dadosAtualizados);
    });

    const req = httpMock.expectOne(`${(service as any).apiUrl}/${clienteId}`);
    expect(req.request.method).toBe('PUT');
    req.flush(dadosAtualizados);
  });

  it('deve atualizar o logotipo do cliente', () => {
    const clienteId = '1';
    const arquivoLogotipo = new File([''], 'logotipo.png', { type: 'image/png' });
    const mockResp = { ok: true } as any;

    service.atualizarLogotipoCliente(clienteId, arquivoLogotipo).subscribe((response) => {
      expect(response).toEqual(mockResp);
    });

    const req = httpMock.expectOne(`${(service as any).apiUrl}/${clienteId}/upload`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResp);
  });

  it('deve deletar um cliente', () => {
    const clienteId = '1';

    service.deletarCliente(clienteId).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${(service as any).apiUrl}/${clienteId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  afterEach(() => {
    httpMock.verify();
  });
});
