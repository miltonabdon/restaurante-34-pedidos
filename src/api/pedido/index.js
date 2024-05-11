"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// var AuthMiddleware_1 = require("../auth/AuthMiddleware");
var PedidoRoutes = /** @class */ (function () {
    function PedidoRoutes(express, produtoController, BASE_URL) {
        this.express = express;
        this.pedidoController = produtoController;
        this.BASE_URL = BASE_URL;
        // this.cognitoVerifier = new AuthMiddleware_1.CognitoVerifier();
    }
    PedidoRoutes.prototype.buildRoutes = function () {
        this.express
            .post("".concat(this.BASE_URL, "/pedido"), 
            // this.cognitoVerifier.verifyCognitoJWT.bind(this.cognitoVerifier), 
            this.pedidoController.createPedido.bind(this.pedidoController))
            .get("".concat(this.BASE_URL, "/pedido/:idPedido"), 
            // this.cognitoVerifier.verifyCognitoJWT.bind(this.cognitoVerifier), 
            this.pedidoController.getPedidoById.bind(this.pedidoController))
            .get("".concat(this.BASE_URL, "/pedidos"), 
            // this.cognitoVerifier.verifyCognitoJWT.bind(this.cognitoVerifier), 
            this.pedidoController.getPedidos.bind(this.pedidoController))
            .get("".concat(this.BASE_URL, "/pedido/status/:idStatusPedido"), 
            // this.cognitoVerifier.verifyCognitoJWT.bind(this.cognitoVerifier), 
            this.pedidoController.getPedidosByStatus.bind(this.pedidoController))
            .get("".concat(this.BASE_URL, "/pedido/status/fakeCheckout/:status"), 
            // this.cognitoVerifier.verifyCognitoJWT.bind(this.cognitoVerifier), 
            this.pedidoController.getPedidoFakeCheckout.bind(this.pedidoController))
            .post("".concat(this.BASE_URL, "/pedido/:idPedido/produto"),
            //  this.cognitoVerifier.verifyCognitoJWT.bind(this.cognitoVerifier), 
             this.pedidoController.addProdutosAoPedido.bind(this.pedidoController))
            .delete("".concat(this.BASE_URL, "/pedido/:idPedido/produto"), this.pedidoController.removeProdutoDoPedido.bind(this.pedidoController))
            .patch("".concat(this.BASE_URL, "/pedido/:idPedido/alterar-status"), this.pedidoController.updatePedido.bind(this.pedidoController));
    };
    return PedidoRoutes;
}());
exports.default = PedidoRoutes;
