import { Request, Response } from 'express-serve-static-core';

import { IData } from '../interfaces/IData';
import { TShopItem } from '../interfaces/TShopItem';
import { TShopOrder } from '../interfaces/TShopOrder';
import { AbstractRouterHandler } from './AbstractRouterHandler';

export class Orders extends AbstractRouterHandler {

    constructor(private orders: Array<TShopOrder> = []) {
        super();
        this.router.route('/orders').get(this.getAllOrders.bind(this));
        this.router.route('/orders/shop/:shopName').get(this.getOrders.bind(this));
        this.router.route('/orders/user/:userName').get(this.getUserOrders.bind(this));
    }

    private getUserOrders(req: Request, res: Response): void {
        res.json(this.orders.filter((order: TShopOrder) => {
            return req.params.userName === order.name;
        }))
    }

    private getOrders(req: Request, res: Response): void {
        let orders: Array<TShopOrder> = [];

        this.orders.forEach((existingOrder: TShopOrder) => {
            let itemsFromShop: Array<TShopItem> = existingOrder.items.filter((orderItem: TShopItem) => {
                return orderItem.shopName === req.params.shopName;
            });
            if (itemsFromShop.length) {
                orders.push({
                    ...existingOrder,
                    items: itemsFromShop,
                })
            }
        })
        res.json(orders);
    }

    private getAllOrders(req: Request, res: Response): void {
        res.json(this.orders);
    }

    public getData(data: IData): IData {
        data.orders = this.orders;
        return data;
    }
}