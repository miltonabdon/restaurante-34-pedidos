import { IPedidoRepository } from "@/interfaces";
import { Pedido } from "@/entities/Pedido";
import PedidoRepository from "@/external/repositories/PedidoRepository"
import { PrismaClient } from '@prisma/client';
import { NovoPedidoDTO } from "@/dtos/NovoPedidoDTO";
import { PedidoGateway } from "@/gateways/pedido";
import { IPedidoGateway } from "@/interfaces";

const prismaClient = new PrismaClient();


const mockPedidoRepository: IPedidoRepository = new PedidoRepository(prismaClient);

jest.spyOn(mockPedidoRepository, "create").mockImplementation
    (async (novoPedido: NovoPedidoDTO) => {
        return await 
    }