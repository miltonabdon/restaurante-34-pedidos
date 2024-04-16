"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var PedidoRepository_1 = require("@/external/repositories/PedidoRepository");
var PedidoController_1 = require("@/controllers/PedidoController");
var pedido_1 = require("./pedido");
var ProdutosDoPedidoRepository_1 = require("@/external/repositories/ProdutosDoPedidoRepository");
var BASE_URL = "/api";
var routes = /** @class */ (function () {
    function routes(app, prisma) {
        this.app = app;
        this.prisma = prisma;
        this.setupRoutes();
    }
    routes.prototype.setupRoutes = function () {
        var pedidoRepository = new PedidoRepository_1.default(this.prisma);
        var produtosDoPedidoRepository = new ProdutosDoPedidoRepository_1.default(this.prisma);
        var pedidoController = new PedidoController_1.default(pedidoRepository, produtosDoPedidoRepository);
        var pedidoRoutes = new pedido_1.default(this.app, pedidoController, BASE_URL);
        pedidoRoutes.buildRoutes();
    };
    return routes;
}());
exports.routes = routes;
