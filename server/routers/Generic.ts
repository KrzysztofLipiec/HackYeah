import { Request } from 'express';
import { Response } from 'express-serve-static-core';

import { IData } from '../interfaces/IData';
import { AbstractRouterHandler } from './AbstractRouterHandler';


export class Generic extends AbstractRouterHandler {
    constructor(private data: IData) {
        super();
        this.router.route('/*')
            .post(this.setData.bind(this))
            .get(this.getPathData.bind(this));
    }

    private getPathData(req: Request, res: Response): void {
        res.json(this.traceObject(req.path.substr(1).split('/'), this.data as unknown as { [key: string]: unknown }));
    }

    private traceObject(path: Array<string>, object: { [key: string]: unknown }, data?: { [key: string]: unknown }): unknown {
        let part = path.shift();
        if (part) {
            object[part] = object[part] || {};
            if (!path.length) {
                if (data) {
                    for (let key in data) {
                        if (data.hasOwnProperty(key)) {
                            (object[part] as { [key: string]: unknown })[key] = data[key] || undefined;
                        }
                    }
                }
                return object[part];
            }
            return this.traceObject(path, object[part] as { [key: string]: unknown }, data);
        }
    }

    private setData(req: Request, res: Response): void {
        this.traceObject(req.path.substr(1).split('/'), this.data as unknown as { [key: string]: unknown }, req.body);
        res.json(this.data);
    }

    getData(): IData {
        return this.data;
    }
}