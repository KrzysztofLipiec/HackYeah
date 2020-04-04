"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractRouterHandler_1 = require("./AbstractRouterHandler");
class Products extends AbstractRouterHandler_1.AbstractRouterHandler {
    constructor(products = []) {
        super();
        this.products = products;
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
    editProduct(req, res) {
        let item = this._getProduct(req.params.productId);
        if (item) {
            let index = this.products.indexOf(item);
            this.products[index] = req.body;
        }
    }
    removeProduct(req, res) {
        let itemIndex = this.products.indexOf(this._getProduct(req.params.id));
        if (itemIndex >= 0) {
            this.products.splice(itemIndex, 1);
        }
    }
    addProduct(req, res) {
        let product = req.body;
        product.id = this.products.length.toString();
        product.shopName = req.params.shopName;
        this.products.push(product);
    }
    getProduct(req, res) {
        res.json(this._getProduct(req.params.productId));
    }
    getProducts(req, res) {
        res.json(this.products.filter((product) => {
            return product.shopName === req.params.shopName;
        }));
    }
    getAllProducts(req, res) {
        res.json(this.products);
    }
    getData(data) {
        data.products = this.products;
        return data;
    }
    _getProduct(id) {
        return this.products.find(product => id === product.id);
    }
}
exports.Products = Products;
//# sourceMappingURL=Products.js.map