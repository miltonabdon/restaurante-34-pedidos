
import { Pedido } from "@/entities/Pedido";
import StatusPedido from "@/entities/StatusPedido";
import { Produto } from "@/entities/Produto";
import { ProdutosDoPedido } from "@/entities/ProdutosDoPedido";
import mockProdutosDoPedidoRepository from "./mocks/MockProdutoDoPedidoRepository";
import { IProdutosDoPedidoRepository } from "@/interfaces";

describe("Produto do pedido", () => {
    let produtosDoPedidoRepository: IProdutosDoPedidoRepository = mockProdutosDoPedidoRepository;

    it("create", async () => {

        const produto1 =
            {
                id: 1,
                produtoId: 1,
                produto: { id: 1, nome: "Produto 1", preco: 10 } as unknown as Produto,
                pedidoId: 1,
                pedido: {} as Pedido,
                quantidade: 2,
                valor: 20,
            } as ProdutosDoPedido

        const produto2 = 
            {
                id: 2,
                produtoId: 2,
                produto: { id: 2, nome: "Produto 2", preco: 15 } as unknown as Produto,
                pedidoId: 1,
                pedido: {} as Pedido,
                quantidade: 1,
                valor: 15,
            } as ProdutosDoPedido
        

        const produtoDoPedido: any = await produtosDoPedidoRepository.create([produto1, produto2]);

        expect(produtoDoPedido).toBeDefined();
    })

    it("delete", async () => {

        const produto1 =
            {
                id: 1,
                produtoId: 1,
                produto: { id: 1, nome: "Produto 1", preco: 10 } as unknown as Produto,
                pedidoId: 1,
                pedido: {} as Pedido,
                quantidade: 2,
                valor: 20,
            } as ProdutosDoPedido

        const produto2 = 
            {
                id: 2,
                produtoId: 2,
                produto: { id: 2, nome: "Produto 2", preco: 15 } as unknown as Produto,
                pedidoId: 1,
                pedido: {} as Pedido,
                quantidade: 1,
                valor: 15,
            } as ProdutosDoPedido
        

        const produtoDoPedido: any = await produtosDoPedidoRepository.delete([produto1, produto2]);

        expect(produtoDoPedido).toBeDefined();
    })

    it("get", async () => {
        const produtoDoPedido: any = await produtosDoPedidoRepository.get(2);

        expect(produtoDoPedido).toBeDefined();
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