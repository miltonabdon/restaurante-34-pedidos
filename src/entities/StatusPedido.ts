import { Pedido } from "./Pedido";

interface StatusPedido {
    id: number;
    pedido: any;
    enumerador: string;
    createdAt: Date;
    updatedAt: Date;
}

export default StatusPedido;