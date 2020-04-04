"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class AbstractRouterHandler {
    constructor() {
        this.router = express_1.Router();
    }
    static getGuid() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0, v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
    getRouter() {
        return this.router;
    }
    ;
}
exports.AbstractRouterHandler = AbstractRouterHandler;
//# sourceMappingURL=AbstractRouterHandler.js.map