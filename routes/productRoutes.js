const productsController = require("../controller/productsController");
const passport = require("passport");

module.exports = (app, upload) => {
    
	app.post("/api/products/create", passport.authenticate("jwt", {session: false}), upload.array("image", 1), productsController.create);
    
    app.put("/api/products/update", passport.authenticate("jwt", {session: false}), productsController.update);
    
	app.put("/api/products/updateWithImages", passport.authenticate("jwt", {session: false}), upload.array("image", 1), productsController.updateWithImage);
    
	app.get("/api/products/findByName/:name", passport.authenticate("jwt", {session: false}), productsController.findByName);
    
	app.get("/api/products/findByCategory/:id_category", passport.authenticate("jwt", {session: false}), productsController.findByCategory);

    app.get("/api/products/findProductFilterNotName/:id_category/:id_product", passport.authenticate("jwt", {session: false}), productsController.findAllProductsFilterNotName);

    app.delete("/api/products/delete/:id", passport.authenticate("jwt", {session: false}), productsController.delete);
};
