"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractRouterHandler_1 = require("./AbstractRouterHandler");
class Authentication extends AbstractRouterHandler_1.AbstractRouterHandler {
    constructor(users = []) {
        super();
        this.users = users;
        if (!this.users.length) {
            this.users.push({
                username: 'januszShop'
            });
        }
        this.router.route('/auth')
            .post(this.returnUser.bind(this));
    }
    returnUser(req, res, next) {
        res.json(this.users[0]);
    }
    getData(data) {
        data.users = this.users;
        return data;
    }
}
exports.Authentication = Authentication;
//# sourceMappingURL=Authentication.js.map