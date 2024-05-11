import { prismaMock } from '../__tests/prismaMock'
import PedidoRepository from "../external/repositories/PedidoRepository"

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => prismaMock),
  };
});

it('Deve criar pedido', async () => {

  let datetime = new Date()

  const data = {
      id: 1,
      statusPedidoId: 1,
      pagamentoId: 1,
      clienteId: 1,
      createdAt: datetime,
      updatedAt: datetime,
      statusPedido: 1,
      ProdutosDoPedido: 1
  }

  prismaMock.pedido.create.mockResolvedValue(data)

  const pedidoRepository = new PedidoRepository(prismaMock)

  await expect(pedidoRepository.create(data)).resolves.toEqual({
    id: 1,
    statusPedidoId: 1,
    pagamentoId: 1,
    clienteId: 1,
    createdAt: datetime,
    updatedAt: datetime,
    statusPedido: 1,
    ProdutosDoPedido: 1
  })
})