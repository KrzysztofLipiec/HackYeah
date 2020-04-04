"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractRouterHandler_1 = require("./AbstractRouterHandler");
class MapRouter extends AbstractRouterHandler_1.AbstractRouterHandler {
    constructor() {
        super();
        this.router.route('/map/:lat/:lng/:count').get(this.getNearestRestaurants.bind(this));
    }
    getData() {
        return null;
    }
    getNearestRestaurants(req, res) {
        const lat = parseFloat(req.params['lat']);
        const lng = parseFloat(req.params['lng']);
        const count = parseInt(req.params['count']);
        let delta;
        let result = [];
        for (let i = 0; i < count; i++) {
            delta = Math.random() * (0.02);
            result.push({ location: { lat: lat - delta, lng: lng - delta } });
        }
        res.json(result);
    }
}
exports.MapRouter = MapRouter;
//# sourceMappingURL=MapRouter.js.map