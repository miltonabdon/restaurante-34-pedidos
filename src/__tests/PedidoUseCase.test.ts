import PedidoUseCase from "@/usecases/pedido/PedidoUseCase"
import mockPedidoGateway from "./mocks/MockPedidoGateway";
import mockProdutoDoPedidoGateway from "./mocks/MockProdutoDoPedidoGateway";
import { Pedido } from "@/entities/Pedido";
import { ProdutosDoPedido } from "@/entities/ProdutosDoPedido";
import StatusPedido from "@/entities/StatusPedido";
import { Produto } from "@/entities/Produto";

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

    it("executa criacao", async () => {

        const pedidos = criarPedidoFake();

        const pedido: any = await pedidoUseCase.executeCreation(pedidos);

        expect(pedido).toBeDefined();
    })

    it("executa get pedidos", async () => {

        const pedido: any = await pedidoUseCase.executeGetPedidos();

        expect(pedido).toBeDefined();
    })

    it("executa get pedidos by status", async () => {

        const pedido: any = await pedidoUseCase.executeGetPedidosByStatus(1);

        expect(pedido).toBeDefined();
    })

    it("executa get pedidos by fake checkout", async () => {

        const pedido: any = await pedidoUseCase.executeGetPedidoFakeCheckout("Pronto");

        expect(pedido).toBeDefined();
    })

    it("executa add Produtos ao pedido", async () => {

        const produtos =   {
            id: 1,
            produtoId: 1,
            produto: { id: 1, nome: "Produto 1", preco: 10 } as unknown as Produto,
            pedidoId: 1,
            pedido: {} as Pedido,
            quantidade: 2,
            valor: 20,
        } as ProdutosDoPedido

        const pedido: any = await pedidoUseCase.executeAddProdutosAoPedido([produtos]);

        expect(pedido).toBeDefined();
    })

    it("executa remove produto do pedido", async () => {
        try {
            // Simula a execução do método para remover um produto do pedido
            const idPedido = 1; // ID do pedido fictício
            const idProduto = 1; // ID do produto fictício
            const response = await pedidoUseCase.executeRemoveProdutoDoPedido(idPedido, idProduto);
    
        
            // Verifica se a resposta foi definida
            expect(response).toBeDefined();
        } catch (error) {
            
            throw new Error("Erro ao remover produto do pedido");
        }
    });

    it("executa delete", async () => {

        const pedido: any = await pedidoUseCase.executeDelete(1);

        expect(pedido).toBeDefined();
    })


    
    it("executa update pedido finalizado", async () => {
        try {
            // Simula a execução do método para atualizar o status de um pedido para "Finalizado"
            const idPedido = 1; // ID do pedido fictício
            const response = await pedidoUseCase.executeUpdatePedidoFinalizado(idPedido);
    
            // Verifica se o método foi chamado com o ID correto e status "Finalizado"
            expect(mockPedidoGateway.updatePedido).toHaveBeenCalledWith(idPedido, "Finalizado");
    
            // Verifica se a resposta foi definida
            expect(response).toBeDefined();
        } catch (error) {
            // Em caso de erro, lança uma exceção com uma mensagem personalizada
            throw new Error(`Erro ao atualizar pedido para finalizado`);
        }
    });
    
    // Testes para os demais métodos seguem o mesmo padrão
    




})



function criarPedidoFake(): Pedido {
    // Dados fictícios do pedido
    const pedido: Pedido = {
        id: 1,
        clienteId: 1,
        pagamentoId: 1,
        statusPedidoId: 1,
        statusPedido: { id: 1, enumerador: "Em Preparação" } as StatusPedido,
        ProdutosDoPedido: [
            {
                id: 1,
                produtoId: 1,
                produto: { id: 1, nome: "Produto 1", preco: 10 } as unknown as Produto,
                pedidoId: 1,
                pedido: {} as Pedido,
                quantidade: 2,
                valor: 20,
            } as ProdutosDoPedido,
            {
                id: 2,
                produtoId: 2,
                produto: { id: 2, nome: "Produto 2", preco: 15 } as unknown as Produto,
                pedidoId: 1,
                pedido: {} as Pedido,
                quantidade: 1,
                valor: 15,
            } as ProdutosDoPedido,
        ],
        createdAt: new Date,
        updatedAt: new Date
    };

    return pedido;
}