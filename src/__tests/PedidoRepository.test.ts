import { IPedidoRepository } from "@/interfaces/repositories/IPedidoRepository";
import mockPedidoRepository from "./mocks/MockPedidoRepository";


describe("PedidoRepository", () => {
    let pedidoRepository: IPedidoRepository = mockPedidoRepository;

    it("get pedido", async () => {
        const pedidoBuscado: any = await pedidoRepository.getPedidoById(1);

        expect(pedidoBuscado).toBeDefined();
    })
})