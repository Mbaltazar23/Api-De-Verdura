const Favorite = require("../models/favorite")

module.exports = {
    findFavoritesProductsByUser(req, res) {
        const id_user = req.params.id_user;
        Favorite.findByFavoritesProductsForUser(id_user, (err, data) => {
            if (err) {
                return res.status(501).json({success: false, message: "Hubo un error al listar los productos favoritos", error: err});
            }
            return res.status(201).json(data);
        });
    },

    getCategoriesForFavoritesProducts(req, res) {
        const id_user = req.params.id_user
        Favorite.getCategorysByFavorites(id_user, (err, data) => {
            if (err) {
                return res.status(501).json({success: false, message: "Hubo un error al listar las categorias de los productos favoritos", error: err});
            }
            return res.status(201).json(data);
        });
    },

    async create(req, res) {
        const favorite = req.body;

        Favorite.checkIfFavoriteExists(favorite.id_user, favorite.id_product, (exists) => {
            if (exists) {
                return res.status(501).json({success: false, message: "El producto favorito ya existe"});
            } else {
                Favorite.create(favorite, (err, id) => {
                    if (err) {
                        return res.status(501).json({success: false, message: "Hubo un error con el registro del producto favorito", error: err});
                    }

                    return res.status(201).json({
                        success: true, message: "El producto favorito se registró correctamente", data: `${id}`, // El ID del producto favorito
                    });
                });
            }
        });
    },

    delete(req, res) {
        const id = req.params.id;
        Favorite.delete(id, (err, id) => {
          if (err) {
            return res.status(501).json({
              success: false,
              message: "Hubo un error al momento de eliminar el producto favorito",
              error: err,
            });
          }
    
          return res.status(201).json({
            success: true,
            message: "El producto favorito se elimino correctamente",
            data: `${id}`, //El ID del producto favorito
          });
        });
      },
}
