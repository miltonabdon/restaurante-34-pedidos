"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var http_1 = require("http");
var body_parser_1 = require("body-parser");
var cors_1 = require("cors");
var swagger_ui_express_1 = require("swagger-ui-express");
var swaggerDocument = require("./swagger.json");
var api_1 = require("./api");
var database_1 = require("./external/database");
try {
    var app = (0, express_1.default)();
    app.use(body_parser_1.default.json({ limit: "50mb" }));
    app.use(body_parser_1.default.urlencoded({ limit: "50mb", extended: true }));
    app.use(express_1.default.json());
    app.use("/swagger", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
    app.use((0, cors_1.default)());
    new api_1.routes(app, database_1.prisma);
    var server = http_1.default.createServer(app);
    server.listen(process.env.PORT || 3001, function () {
        console.log("RUNNING ON PORT ".concat(process.env.PORT || 3001));
    });
}
catch (err) {
    console.log(err);
}
