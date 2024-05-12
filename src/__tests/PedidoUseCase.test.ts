import PedidoUseCase from "@/usecases/pedido/PedidoUseCase"
import mockPedidoGateway from "./mocks/MockPedidoGateway";
import mockProdutoDoPedidoGateway from "./mocks/MockProdutoDoPedidoGateway";
import { Pedido } from "@/entities/Pedido";

describe("Pedido Use Case - Busca pedido por ID", () => {
    let pedidoUseCase: PedidoUseCase;

    beforeAll(async () => {
        pedidoUseCase = new PedidoUseCase(mockProdutoDoPedidoGateway, mockPedidoGateway);
    })

    afterAll(async () => {
        jest.clearAllMocks();
    })

    it("deve retornar um pedido por id, caso encontre", async () => {
        const pedido: any = await pedidoUseCase.executeGetPedidoById(1);

        expect(pedido).toBeDefined();
    })
})