"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractRouterHandler_1 = require("./AbstractRouterHandler");
class Orders extends AbstractRouterHandler_1.AbstractRouterHandler {
    constructor(orders = []) {
        super();
        this.orders = orders;
        this.router.route('/orders').get(this.getAllOrders.bind(this));
        this.router.route('/orders/shop/:shopName').get(this.getOrders.bind(this));
        this.router.route('/orders/user/:userName').get(this.getUserOrders.bind(this));
        this.router.route('/orders/:id').get(this.getOrderById.bind(this));
        this.router.route('/orders/:id/:status').post(this.setOrderReady.bind(this));
    }
    setOrderReady(req, res) {
        this._getOrderById(req.params.id).status = req.params.status;
        res.json({ success: true });
    }
    _getOrderById(id) {
        return this.orders.find(order => order.id === id);
    }
    getOrderById(req, res) {
        res.json(this._getOrderById(req.params.id));
    }
    getUserOrders(req, res) {
        res.json(this.orders.filter((order) => {
            return req.params.userName === order.name;
        }));
    }
    getOrders(req, res) {
        let orders = [];
        this.orders.forEach((existingOrder) => {
            let itemsFromShop = existingOrder.items.filter((orderItem) => {
                return orderItem.shopName === req.params.shopName;
            });
            if (itemsFromShop.length) {
                orders.push(Object.assign(Object.assign({}, existingOrder), { items: itemsFromShop }));
            }
        });
        res.json(orders);
    }
    getAllOrders(req, res) {
        res.json(this.orders);
    }
    getData(data) {
        data.orders = this.orders;
        return data;
    }
}
exports.Orders = Orders;
//# sourceMappingURL=Order.js.map