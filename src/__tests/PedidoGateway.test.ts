import { PedidoGateway } from "@/gateways/pedido";
import { IPedidoGateway } from "@/interfaces";
import mockPedidoRepository from "./mocks/MockPedidoRepository";


describe("PedidoGateway", () => {
    let pedidoGateway: IPedidoGateway;

    beforeAll(async () => {
        pedidoGateway = new PedidoGateway(mockPedidoRepository);        
    });


    it("get pedido", async () => {
        const pedidoBuscado: any = await pedidoGateway.getPedidoById(1);

        expect(pedidoBuscado).toBeDefined();
    });
})