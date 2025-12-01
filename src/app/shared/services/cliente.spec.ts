import { TestBed } from '@angular/core/testing';

describe('Cliente', () => {
  let service: Cliente;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cliente);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve buscar clientes', () => {
    service.buscarClientes().subscribe((response) => {
      expect(response).toBeDefined();
    });
  });

  it('deve buscar cliente por ID', () => {
    const clienteId = 1;
    service.buscarClientePorId(clienteId).subscribe((response) => {
      expect(response).toBeDefined();
    });
  });

  it('deve criar um novo cliente', () => {
    const novoCliente = {
      nome: 'Cliente Teste',
      email: 'teste@teste.com',
      telefone: '123456789',
    };
    service.criarCliente(novoCliente).subscribe((response) => {
      expect(response).toBeDefined();
    });
  });

  it('deve atualizar um cliente existente', () => {
    const clienteId = 1;
    const dadosAtualizados = {
      nome: 'Cliente Atualizado',
    };
    service.atualizarCliente(clienteId, dadosAtualizados).subscribe((response) => {
      expect(response).toBeDefined();
    });
  });

  it('deve atualizar o logotipo do cliente', () => {
    const clienteId = 1;
    const arquivoLogotipo = new File([''], 'logotipo.png', { type: 'image/png' });
    service.atualizarLogotipoCliente(clienteId, arquivoLogotipo).subscribe((response) => {
      expect(response).toBeDefined();
    });
  });

  it('deve deletar um cliente', () => {
    const clienteId = 1;
    service.deletarCliente(clienteId).subscribe((response) => {
      expect(response).toBeDefined();
    });
  });
});
