"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OrderStatus_1 = require("../interfaces/OrderStatus");
const AbstractRouterHandler_1 = require("./AbstractRouterHandler");
class Orders extends AbstractRouterHandler_1.AbstractRouterHandler {
    constructor(orders = []) {
        super();
        this.orders = orders;
        this.router.route('/orders')
            .get(this.getAllOrders.bind(this))
            .post(this.addOrder.bind(this));
        this.router.route('/orders/shop/:shopName')
            .get(this.getOrders.bind(this));
        this.router.route('/orders/shop/:shopName/:orderId')
            .get(this.getOrderByShop.bind(this));
        this.router.route('/orders/user/:userName')
            .get(this.getUserOrders.bind(this));
        this.router.route('/orders/:id')
            .get(this.getOrderById.bind(this));
        this.router.route('/orders/:id/:status')
            .post(this.setOrderReady.bind(this));
    }
    addOrder(req, res) {
        let order = req.body;
        order.id = AbstractRouterHandler_1.AbstractRouterHandler.getGuid();
        order.status = OrderStatus_1.OrderStatus.waiting;
        this.orders.push(order);
        res.json(order);
    }
    setOrderReady(req, res) {
        const order = this._getOrderById(req.params.id);
        order.status = req.params.status;
        if (req.params.status === OrderStatus_1.OrderStatus.incomplete) {
            let missingItemIndex = order.items.findIndex((item) => item.id === req.body.id);
            order.items.splice(missingItemIndex, 1);
        }
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
    getOrderByShop(req, res) {
        const shop = req.params.shopName, orderId = req.params.orderId, order = this._getOrderById(orderId), result = Object.assign(Object.assign({}, order), { items: order.items.filter((item) => item.shopName === shop) });
        res.json(result);
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