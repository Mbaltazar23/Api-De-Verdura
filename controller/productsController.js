const Product = require("../models/product");
const storage = require("../utils/cloud_storage");

module.exports = {
  async findByCategory(req, res) {
    const id_category = req.params.id_category;

    Product.findByCategory(id_category, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error al listar los productos",
          error: err,
        });
      }
      return res.status(201).json(data);
    });
  },

  async create(req, res) {
    const product = JSON.parse(req.body.product); // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE

    const files = req.files;

    if (files.length > 0) {
      const path = `image_${Date.now()}`;
      const url = await storage(files[0], path);
      if (url != undefined && url != null) {
        product.image = url;
      }
    }

    Product.create(product, (err, id) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error con el registro del producto",
          error: err,
        });
      }

      return res.status(201).json({
        success: true,
        message: "El produto se creo correctamente",
        data: `${id}`, //El ID del nuevo usuario
      });
    });
  },

  update(req, res) {
    const product = req.body;

    Product.update(product, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error con la actualizacion del producto",
          error: err,
        });
      }

      return res.status(201).json({
        success: true,
        message: "El producto se actualizo correctamente",
        data: `${data}`, //El ID del nuevo usuario
      });
    });
  },

  async updateWithImage(req, res) {
    const product = JSON.parse(req.body.product); // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE
    const files = req.files;

    if (files.length > 0) {
      const path = `image_${Date.now()}`;
      const url = await storage(files[0], path);
      if (url != undefined && url != null) {
        product.image = url;
      }
    }

    Product.update(product, (err, id) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error con la actualizacion del producto",
          error: err,
        });
      }

      return res.status(201).json({
        success: true,
        message: "El producto se actualizo correctamente",
        data: `${id}`, //El ID del nuevo usuario
      });
    });
  },

  delete(req, res) {
    const id = req.params.id;
    Product.delete(id, (err, id) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error al momento de eliminar el producto",
          error: err,
        });
      }

      return res.status(201).json({
        success: true,
        message: "El producto se elimino correctamente",
        data: `${id}`, //El ID del nuevo usuario
      });
    });
  },
};
