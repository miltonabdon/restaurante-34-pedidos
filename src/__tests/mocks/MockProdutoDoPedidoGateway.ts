import { ProdutoDoPedidoGateway } from "@/gateways/produtosDoPedido";
import { IProdutoDoPedidoGateway } from "@/interfaces";
import mockPedidoRepository from "./MockPedidoRepository";
import mockProdutosDoPedidoRepository from "./MockProdutoDoPedidoRepository";

const mockProdutoDoPedidoGateway: IProdutoDoPedidoGateway = new ProdutoDoPedidoGateway(mockProdutosDoPedidoRepository);

jest.spyOn(mockProdutoDoPedidoGateway, "getProdutosDoPedido")
    .mockImplementation(async (idPedido: number) => {
        return mockProdutosDoPedidoRepository.get(idPedido);
    });

export default mockProdutoDoPedidoGateway;