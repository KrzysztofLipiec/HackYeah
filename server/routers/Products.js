"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractRouterHandler_1 = require("./AbstractRouterHandler");
class Products extends AbstractRouterHandler_1.AbstractRouterHandler {
    constructor(products = []) {
        super();
        this.products = products;
        this.router.route('/products').get(this.getAllProducts.bind(this));
        this.router.route('/products/:shopName').get(this.getProducts.bind(this));
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
}
exports.Products = Products;
//# sourceMappingURL=Products.js.map