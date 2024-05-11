import { Pedido } from "@/entities/Pedido";
import PedidoRepository from "@/external/repositories/PedidoRepository";
import { IPedidoRepository } from "@/interfaces/repositories/IPedidoRepository";
import { prisma } from './jest.setup';

const mockPedidoRepository: IPedidoRepository = new PedidoRepository(prisma);

jest.spyOn(mockPedidoRepository, "create")
    .mockImplementation(async (pedido: Pedido) => {
        return await prisma.pedido.create({
            data: {
                statusPedidoId: pedido.statusPedidoId,
                clienteId: pedido.clienteId,
            },
        });
    });

describe("PedidoRepository", () => {
    let pedidoRepository: IPedidoRepository;

    it("criar pedido", async () => {
        const statusPedido: any = {
            id: 1,
            enumerador: "Pronto",
        }
        const x: any = {};

        const novoPedido: any = {
            id: 1,
            clienteId: 1,
            pagamentoId: 1,
            statusPedidoId: 1,
            statusPedido: statusPedido,
            ProdutosDoPedido: x,

        };

        const pedidoCriado: any = await pedidoRepository.create(novoPedido);

        expect(pedidoCriado).toBeDefined();
    })
})