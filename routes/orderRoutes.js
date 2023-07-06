const OrderController = require("../controller/orderController");
const passport = require("passport");

module.exports = (app) => {
    app.get("/api/orders/findByStatus/:status", passport.authenticate("jwt", {session: false}), OrderController.findByStatus);

    app.get("/api/orders/findByClientAndStatus/:id_client/:status", passport.authenticate("jwt", {session: false}), OrderController.findByClientAndStatus);

    app.post("/api/orders/create", passport.authenticate("jwt", {session: false}), OrderController.create);

    app.put("/api/orders/updateToDispatched", passport.authenticate("jwt", {session: false}), OrderController.updateToDispatched);

    app.put("/api/orders/updateToDelivered", passport.authenticate("jwt", {session: false}), OrderController.updateToDelivered);
};
