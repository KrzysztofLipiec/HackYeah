import { Request, Response } from 'express-serve-static-core';

import { IData } from '../interfaces/IData';
import { TSettings } from '../interfaces/TSettings';
import { AbstractRouterHandler } from './AbstractRouterHandler';

export class Authentication extends AbstractRouterHandler {
    constructor(private shops: { [key: string]: TSettings } = {}) {
        super();
        this.router.route('/auth')
            .post(this.returnUser.bind(this));
    }

    private returnUser(req: Request, res: Response, next: () => void): void {
        res.json(this.shops[req.body.name]);
    }

    public getData(data: IData): IData {
        data.shops = this.shops;
        return data;
    }
}