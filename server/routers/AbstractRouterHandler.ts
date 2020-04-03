import { Router } from 'express';

import { IData } from '../interfaces/IData';

export abstract class AbstractRouterHandler {
    protected router: Router;
    constructor() {
        this.router = Router();
    }
    public getRouter(): Router {
        return this.router;
    };

    public abstract getData(data: IData): IData;
}