import { Request, Response } from 'express-serve-static-core';

import { IData } from '../interfaces/IData';
import { TShopItem } from '../interfaces/TShopItem';
import { AbstractRouterHandler } from './AbstractRouterHandler';

export class Products extends AbstractRouterHandler {

    constructor(private products: Array<TShopItem> = []) {
        super();
        this.router.route('/products').get(this.getAllProducts.bind(this));
        this.router.route('/products/:shopName').get(this.getProducts.bind(this));
    }

    private getProducts(req: Request, res: Response): void {
        res.json(this.products.filter((product: TShopItem) => {
            return product.shopName === req.params.shopName;
        }))
    }

    private getAllProducts(req: Request, res: Response): void {
        res.json(this.products);
    }

    public getData(data: IData): IData {
        data.products = this.products;
        return data;
    }
}