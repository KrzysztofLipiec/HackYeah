import bodyParser from 'body-parser';
import express from 'express';
import fs from 'fs';
import { IncomingMessage } from 'http';

import { IData } from './interfaces/IData';
import { AbstractRouterHandler } from './routers/AbstractRouterHandler';
import { Authentication } from './routers/Authentication';
import { Generic } from './routers/Generic';
import { MapRouter } from './routers/MapRouter';
import { Orders } from './routers/Order';

class App {
    private app = express();
    private data: IData;
    private routerHandlers: Array<AbstractRouterHandler>;
    constructor(private port: number, private dataFilePath: string, private appPort: number) {
        try {
            this.data = JSON.parse(fs.readFileSync(this.dataFilePath, { encoding: 'utf8' }));
        } catch (error) {
            this.data = {
                orders: [],
                products: [],
                shops: [],
                users: []

            };
        }
        this.app.use(bodyParser());
        this.routerHandlers = [
            new Authentication(this.data.users),
            new MapRouter(),
            new Orders(this.data.orders),
            new Generic(this.data)
        ];

        this.setHeaders();
        this.setFileSaver();
        this.setRouters();
        this.listen();
    }

    private setRouters(): void {
        this.routerHandlers.forEach((routerHandler) => {
            this.app.use(routerHandler.getRouter());
        })
    }

    private setHeaders(): void {
        this.app.use((req: IncomingMessage, res, next: () => void) => {
            const allowedOrigins = [
                `http://localhost:${this.appPort}`,
                `http://127.0.0.1:${this.appPort}`,
                `https://hyfront.dev.zbic.in:${this.appPort}`
            ],
                origin = req.headers.origin as string;

            if (allowedOrigins.indexOf(origin) > -1) {
                res.setHeader('Access-Control-Allow-Origin', origin);
                res.setHeader('Access-Control-Allow-Headers', '*');
            }
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Method', 'GET');
            next();
        });
    }

    private setFileSaver(): void {
        this.app.post('*', (req, res, next) => {
            this.routerHandlers.forEach((routerHandler: AbstractRouterHandler) => {
                routerHandler.getData(this.data);
            });
            fs.writeFileSync(this.dataFilePath, JSON.stringify(this.data, null, 2));
            next();
        });
        this.app.get('/', (req, res, next) => {
            res.json(this.data);
        })
    }

    private listen(): void {
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