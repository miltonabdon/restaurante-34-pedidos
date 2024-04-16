import { Application } from "express";
import { PrismaClient } from "@prisma/client";
import PedidoRepository from "@/external/repositories/PedidoRepository";
import PedidoController from "@/controllers/PedidoController";
import PedidoRoutes from "./pedido";
import ProdutosDoPedidoRepository from "@/external/repositories/ProdutosDoPedidoRepository";

const BASE_URL = "/api";

export class routes {
    private app: Application;
    private prisma: PrismaClient;

    constructor(app: Application, prisma: PrismaClient) {
        this.app = app;
        this.prisma = prisma;
        this.setupRoutes();
    }
    private setupRoutes() {

        const pedidoRepository = new PedidoRepository(this.prisma);
        const produtosDoPedidoRepository = new ProdutosDoPedidoRepository(
            this.prisma
        );
        const pedidoController = new PedidoController(
            pedidoRepository,
            produtosDoPedidoRepository
        );
        const pedidoRoutes = new PedidoRoutes(
            this.app,
            pedidoController,
            BASE_URL
        );
        pedidoRoutes.buildRoutes();

    }
}
