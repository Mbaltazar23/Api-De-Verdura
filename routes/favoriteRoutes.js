const favoritesController = require("../controller/favoritesController")
const passport = require("passport");

module.exports = (app) => {
    app.get("/api/favorite/findProductsFavoritesByUser/:id_user", passport.authenticate("jwt", {session: false}), favoritesController.findFavoritesProductsByUser);

    app.get("/api/favorite/getCategoriesForProducts/:id_user", passport.authenticate("jwt", {session: false}), favoritesController.getCategoriesForFavoritesProducts)
    
    app.post("/api/favorite/create", passport.authenticate("jwt", {session: false}), favoritesController.create);

    app.delete("/api/favorite/delete/:id", passport.authenticate("jwt", {session: false}), favoritesController.delete);
}
