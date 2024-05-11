import StatusPedido from "./StatusPedido";
import { ProdutosDoPedido } from "./ProdutosDoPedido";
import { BaseEntity } from "./BaseEntity";

interface Pedido extends BaseEntity {
  id: number;
  clienteId: number;
  pagamentoId: number;
  statusPedidoId: number;
  statusPedido: any;
  ProdutosDoPedido: any;
}

export { Pedido };