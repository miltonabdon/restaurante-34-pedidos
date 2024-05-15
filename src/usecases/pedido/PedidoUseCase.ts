import { IPedidoGateway, IPedidoUseCase, IProdutoDoPedidoGateway } from "@/interfaces";

import { Pedido } from "@/entities/Pedido";
import { ProdutosDoPedido } from "@/entities/ProdutosDoPedido";
import { EnumStatusPedido } from "@/enums/EnumStatusPedido";
import { IPagamentoGateway } from "@/interfaces/gateway/IPagamentoGateway";
import { NovoPagamentoDTO } from "@/dtos/NovoPagamentoDTO";
import { TipoPagamento } from "@/enums/TipoPagamento";

class PedidoUseCase implements IPedidoUseCase {
    private produtosDoPedidoGateway: IProdutoDoPedidoGateway;
    private pedidoGateway: IPedidoGateway;
    private pagamentoGateway: IPagamentoGateway;

    constructor(
        produtosDoPedidoGateway: IProdutoDoPedidoGateway,
        pedidoGateway: IPedidoGateway,
        pagamentoGateway: IPagamentoGateway
    ) {
        this.produtosDoPedidoGateway = produtosDoPedidoGateway;
        this.pedidoGateway = pedidoGateway;
        this.pagamentoGateway = pagamentoGateway;
    }

    async executeCreation(pedidoData: Pedido): Promise<Pedido> {
        pedidoData.statusPedidoId = EnumStatusPedido.RECEBIDO.id;
        const pedidoCriado: Pedido = await this.pedidoGateway.createPedido(pedidoData);
        return pedidoCriado;
    }

    async executeGetPedidoById(idPedido: number): Promise<Pedido> {
        return this.pedidoGateway.getPedidoById(idPedido);
    }

    async executeGetPedidos(): Promise<Pedido[]> {
        const pedidos = await this.pedidoGateway.getPedidos();
        const pedidosOrdenados: Pedido[] = this.orderPedidos(pedidos);
        return pedidosOrdenados;
    }

    async executeGetPedidosByStatus(idStatusPedido: number): Promise<Pedido[]> {
        return this.pedidoGateway.getPedidosByStatus(idStatusPedido);
    }

    async executeGetPedidoFakeCheckout(status: string): Promise<Pedido[]> {
        return this.pedidoGateway.getPedidoByStatusFakeCheckout(status);
    }

    async executeAddProdutosAoPedido(produtosDoPedido: ProdutosDoPedido[]): Promise<any> {
        return this.produtosDoPedidoGateway.createProdutosDoPedido(produtosDoPedido);
    }

    executeRemoveProdutoDoPedido(idPedido: number, idProdutos: number) {
        throw new Error("Method executeRemoveProdutoAoPedido not implemented.");
    }

    executeDelete(id: number) {
        throw new Error("Method executeDelete not implemented.");
    }

    async executeUpdatePedidoFinalizado(idPedido: number) {
        try {
            const valor = await this.calculaValorDoPedido(idPedido);

            const novoPagamentoDTO: NovoPagamentoDTO = {
                idPedido: idPedido,
                valor: valor,
                tipoPagamento: TipoPagamento.PIX
            }
            let pagamentoId;

            await this.pagamentoGateway.createPagamento(novoPagamentoDTO).then(async res => {
                pagamentoId = res.data.idPagamento;
            }).catch(error => {
                console.error("Error ao criar novo pagamento:", error);
                throw new Error(error);
            });

            const pedidoParaAtualizar: any = {
                id: idPedido,
                pagamentoId: pagamentoId,
                statusPedido: EnumStatusPedido.FINALIZADO
            }
            const pedido = await this.pedidoGateway.updatePedidoCompleto(pedidoParaAtualizar);

            return pedido;
        } catch (error) {
            throw error;
        }
    }

    async executeUpdatePedidoPreparacao(idPedido: number) {
        try {
            const response = await this.pedidoGateway.updatePedido(
                idPedido,
                "Em preparação"
            );

            return response;
        } catch (error) {
            throw error;
        }
    }

    async executeUpdatePedidoPronto(idPedido: number) {
        try {
            const response = await this.pedidoGateway.updatePedido(
                idPedido,
                "Pronto"
            );

            return response;
        } catch (error) {
            throw error;
        }
    }

    async executeGetProdutoDoPedido(idPedido: number) {
        try {
            const produtosDoPedido = await this.produtosDoPedidoGateway.getProdutosDoPedido(idPedido);
            return produtosDoPedido;
        } catch (error) {
            console.error(error);
            throw new Error(`Erro ao buscar Produtos do Pedido ${idPedido}`);
        }
    }

    private orderPedidos(pedidos: Pedido[]): Pedido[] {
        const pedidosEmPreparacao = pedidos.filter((pedido) => pedido.statusPedido.id == EnumStatusPedido.EM_PREPARACAO.id);
        const pedidosPronto = pedidos.filter((pedido) => pedido.statusPedido.id == EnumStatusPedido.PRONTO.id);
        const pedidosRecebido = pedidos.filter((pedido) => pedido.statusPedido.id == EnumStatusPedido.RECEBIDO.id);

        return [...pedidosPronto, ...pedidosEmPreparacao, ...pedidosRecebido];
    }

    private async calculaValorDoPedido(pedidoId: number): Promise<number> {
        let total: number = 0;
        const produtosDoPedido: ProdutosDoPedido[] = await this.produtosDoPedidoGateway.getProdutosDoPedido(pedidoId);

        if (produtosDoPedido.length === 0) {
            return total;
        } else if (produtosDoPedido.length === 1) {
            return produtosDoPedido[0].quantidade * produtosDoPedido[0].valor;
        } else {
            produtosDoPedido.forEach((produto: any) => {
                total += produto.quantidade * produto.valor;
            });
            return total;
        }
    }

}

export default PedidoUseCase;
