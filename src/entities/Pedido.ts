import StatusPedido from "./StatusPedido";
import { ProdutosDoPedido } from "./ProdutosDoPedido";
import { BaseEntity } from "./BaseEntity";

interface Pedido extends BaseEntity {
  id: number;
  clienteId: number;
  pagamentoId: number;
  statusPedidoId: number;
  statusPedido: StatusPedido;
  ProdutosDoPedido: ProdutosDoPedido[];
}

export { Pedido };