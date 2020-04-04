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
        }

    }

    private removeProduct(req: Request, res: Response): void {
        let itemIndex = this.products.indexOf(this._getProduct(req.params.id));
        if (itemIndex >= 0) {
            this.products.splice(itemIndex, 1);
        }
    }

    private addProduct(req: Request, res: Response): void {
        let product = req.body as TShopItem;
        product.id = this.products.length.toString();
        product.shopName = req.params.shopName;
        this.products.push(product);
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
        res.json(this.products);
    }

    public getData(data: IData): IData {
        data.products = this.products;
        return data;
    }

    private _getProduct(id: string): TShopItem {
        return this.products.find(product => id === product.id);
    }
}