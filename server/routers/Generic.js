"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractRouterHandler_1 = require("./AbstractRouterHandler");
class Generic extends AbstractRouterHandler_1.AbstractRouterHandler {
    constructor(data) {
        super();
        this.data = data;
        this.router.route('/*')
            .post(this.setData.bind(this))
            .get(this.getPathData.bind(this));
    }
    getPathData(req, res) {
        res.json(this.traceObject(req.path.substr(1).split('/'), this.data));
    }
    traceObject(path, object, data) {
        let part = path.shift();
        if (part) {
            object[part] = object[part] || {};
            if (!path.length) {
                if (data) {
                    if (typeof data === 'object' && !Array.isArray(data)) {
                        for (let key in data) {
                            if (data.hasOwnProperty(key)) {
                                object[part][key] = data[key] || undefined;
                            }
                        }
                    }
                    else {
                        object[part] = data;
                    }
                }
                return object[part];
            }
            return this.traceObject(path, object[part], data);
        }
    }
    setData(req, res) {
        this.traceObject(req.path.substr(1).split('/'), this.data, req.body);
        res.json(this.data);
    }
    getData() {
        return this.data;
    }
}
exports.Generic = Generic;
//# sourceMappingURL=Generic.js.map