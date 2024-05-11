import { IPedidoRepository } from '@/interfaces/repositories/IPedidoRepository';
import { prisma } from '../jest.setup';
import PedidoRepository from '@/external/repositories/PedidoRepository';
import { Pedido } from '@/entities/Pedido';

const mockPedidoRepository: IPedidoRepository = new PedidoRepository(prisma);

jest.spyOn(mockPedidoRepository, "create")
    .mockImplementation(async (pedido: Pedido) => {
        return await prisma.pedido.create({
            data: {
                statusPedidoId: pedido.statusPedidoId,
                clienteId: pedido.clienteId,
            },
        }) as Pedido;
    });

jest.spyOn(mockPedidoRepository, "getPedidoById")
    .mockImplementation(async (id: number) => {
        return await prisma.pedido.findUnique({
            where: {
                id: id,
            },
        }) as Pedido;
    });

export default mockPedidoRepository;