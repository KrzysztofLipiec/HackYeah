import { Request, Response } from 'express-serve-static-core';

import { IData } from '../interfaces/IData';
import { OrderStatus } from '../interfaces/OrderStatus';
import { TShopItem } from '../interfaces/TShopItem';
import { TShopOrder } from '../interfaces/TShopOrder';
import { AbstractRouterHandler } from './AbstractRouterHandler';

export class Orders extends AbstractRouterHandler {

    constructor(private orders: Array<TShopOrder> = []) {
        super();
        this.router.route('/orders')
            .get(this.getAllOrders.bind(this))
            .post(this.addOrder.bind(this));
        this.router.route('/orders/shop/:shopName')
            .get(this.getOrders.bind(this));
        this.router.route('/orders/shop/:shopName/:orderId')
            .get(this.getOrderByShop.bind(this))
        this.router.route('/orders/user/:userName')
            .get(this.getUserOrders.bind(this));
        this.router.route('/orders/:id')
            .get(this.getOrderById.bind(this));
        this.router.route('/orders/:id/:status')
            .post(this.setOrderReady.bind(this));
    }

    private addOrder(req: Request, res: Response): void {
        let order = req.body;
        order.id = AbstractRouterHandler.getGuid();
        order.status = OrderStatus.waiting;
        this.orders.push(order);
        res.json(order);
    }

    private setOrderReady(req: Request, res: Response): void {
        const order = this._getOrderById(req.params.id);
        order.status = req.params.status as OrderStatus;
        if (req.params.status === OrderStatus.incomplete) {
            let missingItemIndex = order.items.findIndex((item) => item.id === req.body.id);
            order.items.splice(missingItemIndex, 1);
        }
        res.json({ success: true });
    }

    private _getOrderById(id: string): TShopOrder {
        return this.orders.find(order => order.id === id);
    }

    private getOrderById(req: Request, res: Response): void {
        res.json(this._getOrderById(req.params.id));
    }

    private getUserOrders(req: Request, res: Response): void {
        res.json(this.orders.filter((order: TShopOrder) => {
            return req.params.userName === order.name;
        }))
    }

    private getOrderByShop(req: Request, res: Response): void {
        const shop = req.params.shopName,
            orderId = req.params.orderId,
            order = this._getOrderById(orderId),
            result: TShopOrder = {
                ...order, items: order.items.filter((item: TShopItem) => item.shopName === shop)
            };
        res.json(result);

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