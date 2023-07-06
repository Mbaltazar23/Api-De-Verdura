const db = require("../config/config");

const Favorite = {}

Favorite.findByFavoritesProductsForUser = (id_user, result) => {
    const sql = `
    SELECT
        F.id,
        P.name,
        P.description,
        P.price,
        P.image,
        P.id_category
    FROM
        products AS P
    INNER JOIN
        favorites AS F ON P.id = F.id_product
    WHERE F.id_user = ?`;

    db.query(sql, [id_user], (err, data) => {
        if (err) {
            console.log("Error : ", err);
            result(err, null);
        } else {
            console.log("Products for User: ", data);
            result(null, data);
        }
    });
};

Favorite.create = (favorite, result) => {
    const sql = `
    INSERT INTO
        favorites(
            id_user,
            id_product,
            created_at,
            updated_at   
        )
    VALUES(?, ?, ?, ?)
    `;

    db.query(sql, [
        favorite.id_user, favorite.id_product, new Date(), new Date(),
    ], (err, res) => {
        if (err) {
            console.log("Error:", err);
            result(err, null);
        } else {
            console.log("Id del producto favorito:", res.insertId);
            result(null, res.insertId);
        }
    });
};

Favorite.checkIfFavoriteExists = (id_user, id_product, result) => {
    const checkIfExistsQuery = `
      SELECT id 
      FROM favorites 
      WHERE id_user = ? AND id_product = ?
      LIMIT 1`;

    db.query(checkIfExistsQuery, [
        id_user, id_product
    ], (err, rows) => {
        if (err) {
            console.log("Error:", err);
            result(err, null);
        } else {
            if (rows.length > 0) { // Ya existe un favorito con el mismo ID de producto
                result(true);
            } else {
                result(false);
            }
        }
    });
};


Favorite.getCategorysByFavorites = (id_user, result) => {
    const sql = `
     SELECT
      C.id,
      C.name,
      C.description,
      C.image
    FROM
      categories AS C
    INNER JOIN (
      SELECT DISTINCT P.id_category
      FROM products AS P
      INNER JOIN favorites AS F ON P.id = F.id_product
      WHERE F.id_user = ?
    ) AS T ON C.id = T.id_category
    ORDER BY
      C.name`;

    db.query(sql, [id_user], (err, data) => {
        if (err) {
            console.log("Error:", err);
            result(err, null);
        } else {
            console.log("Categories for Products Favorites:", data);
            result(null, data);
        }
    });
};

Favorite.delete = (id, result) => {
    const sql = `
  DELETE FROM favorites WHERE id = ?`;

    db.query(sql, id, (err, res) => {
        if (err) {
            console.log("Error : ", err);
            result(err, null);
        } else {
            console.log("Id del nuevo producto favorito eliminado : ", id);
            result(null, id);
        }
    });
};

module.exports = Favorite
