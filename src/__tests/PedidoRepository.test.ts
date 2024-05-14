import { IPedidoRepository } from "@/interfaces/repositories/IPedidoRepository";
import mockPedidoRepository from "./mocks/MockPedidoRepository";
import { Pedido } from "@/entities/Pedido";
import StatusPedido from "@/entities/StatusPedido";
import { Produto } from "@/entities/Produto";
import { ProdutosDoPedido } from "@/entities/ProdutosDoPedido";
import { EnumStatusPedido } from "@/enums/EnumStatusPedido";

describe("PedidoRepository - getPedidoById", () => {
    let pedidoRepository: IPedidoRepository = mockPedidoRepository;

    it("get pedido", async () => {
        const pedidoBuscado: any = await pedidoRepository.getPedidoById(1);

        expect(pedidoBuscado).toBeDefined();
    })
})

describe("PedidoRepository - getPedidos", () => {
    let pedidoRepository: IPedidoRepository = mockPedidoRepository;
    it("lista pedidos", async () => {
        const pedidos: any = await pedidoRepository.getPedidos();

        expect(pedidos).toBeDefined();
    })


})

describe("PedidoRepository - getPedidos", () => {
    let pedidoRepository: IPedidoRepository = mockPedidoRepository;
    it("lista por status", async () => {
        const pedidos: any = await pedidoRepository.getPedidosByStatus(1);

        expect(pedidos).toBeDefined();
    })

})

describe("PedidoRepository - getPedidosFakeCheckout", () => {
    let pedidoRepository: IPedidoRepository = mockPedidoRepository;
    it("lista por status checkout", async () => {
        const pedidos: any = await pedidoRepository.getPedidoByStatusFakeCheckout("Em");

        expect(pedidos).toBeDefined();
    })

})

describe("PedidoRepository - updatePedido", () => {
    let pedidoRepository: IPedidoRepository = mockPedidoRepository;
    it("atualiza pedido", async () => {
       
            const pedidos: any = await pedidoRepository.updatePedido(2, "Em preparo");

            // O teste falha se o resultado for indefinido
            expect(pedidos).toThrow()
       
    });
});


describe("PedidoRepository - create", () => {
    let pedidoRepository: IPedidoRepository = mockPedidoRepository;

    const pedido = criarPedidoFake()

    it("create", async () => {
        const pedidoBuscado: any = await pedidoRepository.create(pedido);

        expect(pedidoBuscado).toBeDefined();
    })
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