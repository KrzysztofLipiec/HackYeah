import { Router } from 'express';

import { IData } from '../interfaces/IData';

export abstract class AbstractRouterHandler {
    protected router: Router;
    constructor() {
        this.router = Router();
    }
    public static getGuid(): string {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
            c
        ) {
            const r = (Math.random() * 16) | 0,
                v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
    public getRouter(): Router {
        return this.router;
    };

    public abstract getData(data: IData): IData;
}