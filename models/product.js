const db = require("../config/config");

const Product = {};

Product.findByCategory = (id_category, result) => {
    const sql = `
  SELECT 
  P.id,
  P.name, 
  P.description,
  P.price,
  P.image,
  P.id_category 
  FROM products as P WHERE P.id_category = ?`;

    db.query(sql, [id_category], (err, data) => {
        if (err) {
            console.log("Error : ", err);
            result(err, null);
        } else {
            console.log("Products : ", data);
            result(null, data);
        }
    });
};

Product.create = (product, result) => {
    const sql = `
  INSERT INTO
      products(
          name,
          description,
          price,
          image,
          id_category,
          created_at,
          updated_at   
      )
  VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

    db.query(sql, [
        product.name,
        product.description,
        product.price,
        product.image,
        product.id_category,
        new Date(),
        new Date(),
    ], (err, res) => {
        if (err) {
            console.log("Error:", err);
            result(err, null);
        } else {
            console.log("Id de la nuevo producto:", res.insertId);
            result(null, res.insertId);
        }
    });
};

Product.update = (product, result) => {
    const sql = `
  UPDATE
      products
  SET
      name = ?,
      description = ?,
      price = ?,
      image = ?,
      id_category = ?,
      updated_at = ?
  WHERE
      id = ?
  `;

    db.query(sql, [
        product.name,
        product.description,
        product.price,
        product.image,
        product.id_category,
        new Date(),
        product.id,
    ], (err, res) => {
        if (err) {
            console.log("Error:", err);
            result(err, null);
        } else {
            console.log("Id del producto actualizado:", product.id);
            result(null, product.id);
        }
    });
};

Product.delete = (id, result) => {
    const sql = `
  DELETE FROM products WHERE id = ?`;

    db.query(sql, id, (err, res) => {
        if (err) {
            console.log("Error : ", err);
            result(err, null);
        } else {
            console.log("Id del nuevo producto eliminado : ", id);
            result(null, id);
        }
    });
};

module.exports = Product;
