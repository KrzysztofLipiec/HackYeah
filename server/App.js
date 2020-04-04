"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const Authentication_1 = require("./routers/Authentication");
const Generic_1 = require("./routers/Generic");
const Order_1 = require("./routers/Order");
const Products_1 = require("./routers/Products");
class App {
    constructor(port, dataFilePath, appPort) {
        this.port = port;
        this.dataFilePath = dataFilePath;
        this.appPort = appPort;
        this.app = express_1.default();
        try {
            this.data = JSON.parse(fs_1.default.readFileSync(this.dataFilePath, { encoding: 'utf8' }));
        }
        catch (error) {
            this.data = {
                orders: [],
                products: [],
                shops: {},
            };
        }
        this.app.use(body_parser_1.default());
        this.routerHandlers = [
            new Authentication_1.Authentication(this.data.shops),
            // new MapRouter(),
            new Order_1.Orders(this.data.orders),
            new Products_1.Products(this.data.products),
            new Generic_1.Generic(this.data)
        ];
        this.setHeaders();
        this.setFileSaver();
        this.setRouters();
        this.listen();
    }
    setRouters() {
        this.routerHandlers.forEach((routerHandler) => {
            this.app.use(routerHandler.getRouter());
        });
    }
    setHeaders() {
        this.app.use((req, res, next) => {
            const allowedOrigins = [
                `http://localhost:${this.appPort}`,
                `http://127.0.0.1:${this.appPort}`,
                `https://hyfront.dev.zbic.in`
            ], origin = req.headers.origin;
            if (allowedOrigins.indexOf(origin) > -1) {
                res.setHeader('Access-Control-Allow-Origin', origin);
                res.setHeader('Access-Control-Allow-Headers', '*');
            }
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
            next();
        });
    }
    save() {
        this.routerHandlers.forEach((routerHandler) => {
            routerHandler.getData(this.data);
        });
        fs_1.default.writeFileSync(this.dataFilePath, JSON.stringify(this.data, null, 2));
    }
    setFileSaver() {
        this.app.post('*', (req, res, next) => {
            this.save();
            next();
        });
        this.app.delete('*', (req, res, next) => {
            this.save();
            next();
        });
        this.app.put('*', (req, res, next) => {
            this.save();
            next();
        });
        this.app.get('/', (req, res, next) => {
            res.json(this.data);
        });
    }
    listen() {
        const ansi = {
            boldStart: '\x1b[1m',
            boldEnd: '\x1b[22m',
            yellow: '\x1b[33m',
            white: '\x1b[37m',
        };
        console.log(`${ansi.yellow}[Designer app]${ansi.white}\n${ansi.boldStart}[App]${ansi.boldEnd} is listening on http://localhost:${this.port}/`);
        this.app.listen(this.port);
    }
}
new App(9123, 'server/data.json', 8080);
//# sourceMappingURL=App.js.map