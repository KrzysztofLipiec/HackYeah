import { Request, Response } from 'express-serve-static-core';

import { IData } from '../interfaces/IData';
import { TShopItem } from '../interfaces/TShopItem';
import { AbstractRouterHandler } from './AbstractRouterHandler';

export class Products extends AbstractRouterHandler {

    constructor(private products: Array<TShopItem> = []) {
        super();
        this.router.route('/products')
            .get(this.getAllProducts.bind(this));
        this.router.route('/products/:shopName')
            .get(this.getProducts.bind(this))
            .post(this.addProduct.bind(this));
        this.router.route('/products/:shopName/:productId')
            .get(this.getProduct.bind(this))
            .put(this.editProduct.bind(this))
            .delete(this.removeProduct.bind(this));
    }

    private editProduct(req: Request, res: Response): void {
        let item = this._getProduct(req.params.productId);
        if (item) {
            let index = this.products.indexOf(item);
            this.products[index] = req.body;
            res.json(this.products[index]);
        } else {
            res.status(404).send('not found');
        }
    }

    private removeProduct(req: Request, res: Response): void {
        const product = this._getProduct(req.params.productId),
            itemIndex = this.products.indexOf(product);
        if (itemIndex >= 0) {
            this.products.splice(itemIndex, 1);
        }
        res.json(product);
    }

    private addProduct(req: Request, res: Response): void {
        let product = req.body as TShopItem;
        product.id = AbstractRouterHandler.getGuid();
        product.shopName = req.params.shopName;
        this.products.push(product);
        res.json(product);
    }

    private getProduct(req: Request, res: Response): void {
        res.json(this._getProduct(req.params.productId));
    }

    private getProducts(req: Request, res: Response): void {
        res.json(this.products.filter((product: TShopItem) => {
            return product.shopName === req.params.shopName;
        }))
    }

    private getAllProducts(req: Request, res: Response): void {
        const shops = (req.query.shops || '').split(','),
            search = req.query.search,
            offset = parseInt(req.query.offset, 10) || 0,
            limit = parseInt(req.query.limit, 10);

        let result = this.products.filter((product, index: number) => {
            return !shops[0] || (
                shops.indexOf(product.shopName) >= 0 &&
                product.name.includes(search)
            );
        });
        if (limit) {
            result.splice(0, offset);
            result.splice(limit);
        }
        res.json(result);
    }

    public getData(data: IData): IData {
        data.products = this.products;
        return data;
    }

    private _getProduct(id: string): TShopItem {
        return this.products.find(product => id === product.id);
    }
}