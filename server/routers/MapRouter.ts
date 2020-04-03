import { Request } from 'express';
import { Response } from 'express-serve-static-core';

import { IData } from '../interfaces/IData';
import { IMapPoint } from '../interfaces/IMapPoint';
import { AbstractRouterHandler } from './AbstractRouterHandler';

export class MapRouter extends AbstractRouterHandler {

    constructor() {
        super();
        this.router.route('/map/:lat/:lng/:count').get(this.getNearestRestaurants.bind(this));
    }
    public getData(): IData {
        return null;
    }

    private getNearestRestaurants(req: Request, res: Response): void {
        const lat = parseFloat(req.params['lat']);
        const lng = parseFloat(req.params['lng']);
        const count = parseInt(req.params['count']);

        let delta: number;
        let result: Array<IMapPoint> = [];

        for (let i = 0; i < count; i++) {
            delta = Math.random() * (0.02);
            result.push({ location: { lat: lat - delta, lng: lng - delta } })
        }
        res.json(result);
    }
}