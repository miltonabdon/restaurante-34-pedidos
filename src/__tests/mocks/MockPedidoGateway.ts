import { PedidoGateway } from "@/gateways/pedido";
import { IPedidoGateway } from "@/interfaces";
import mockPedidoRepository from "./MockPedidoRepository";

const mockPedidoGateway: IPedidoGateway = new PedidoGateway(mockPedidoRepository);

jest.spyOn(mockPedidoGateway, "getPedidoById")
    .mockImplementation(async (idPedido: number) => {
        return mockPedidoRepository.getPedidoById(idPedido);
    });

export default mockPedidoGateway;