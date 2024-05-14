import { PedidoGateway } from "@/gateways/pedido";
import { IPedidoGateway } from "@/interfaces";
import mockPedidoRepository from "./MockPedidoRepository";

const mockPedidoGateway: IPedidoGateway = new PedidoGateway(mockPedidoRepository);

jest.spyOn(mockPedidoGateway, "getPedidoById")
    .mockImplementation(async (idPedido: number) => {
        return mockPedidoRepository.getPedidoById(idPedido);
    });

jest.spyOn(mockPedidoGateway, "createPedido")
    .mockImplementation(async (pedido: Pedido) => {
        return mockPedidoRepository.create(pedido);
    });

jest.spyOn(mockPedidoGateway, "getPedidos")
    .mockImplementation(async (pedido: Pedido[]) => {
        return mockPedidoRepository.getPedidos(pedido);
    });

jest.spyOn(mockPedidoGateway, "getPedidosByStatus")
    .mockImplementation(async (pedido: Pedido[]) => {
        return mockPedidoRepository.getPedidosByStatus(pedido);
    });

jest.spyOn(mockPedidoGateway, "getPedidoByStatusFakeCheckout")
    .mockImplementation(async (pedido: Pedido[]) => {
        return mockPedidoRepository.getPedidoByStatusFakeCheckout(pedido);
    });


jest.spyOn(mockPedidoGateway, "updatePedido")
    .mockImplementation(async (idPedido: number, statusPedido: string) => {
        return mockPedidoRepository.updatePedido(1, "Em Preparo");
    });


export default mockPedidoGateway;