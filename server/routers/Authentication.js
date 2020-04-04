"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractRouterHandler_1 = require("./AbstractRouterHandler");
class Authentication extends AbstractRouterHandler_1.AbstractRouterHandler {
    constructor(shops = {}) {
        super();
        this.shops = shops;
        this.router.route('/auth')
            .post(this.returnUser.bind(this));
    }
    returnUser(req, res, next) {
        res.json(this.shops[req.body.name]);
    }
    getData(data) {
        data.shops = this.shops;
        return data;
    }
}
exports.Authentication = Authentication;
//# sourceMappingURL=Authentication.js.map