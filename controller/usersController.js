const User = require("../models/user");
const Rol = require("../models/rol");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const storage = require("../utils/cloud_storage");

module.exports = {

  async login(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    User.findByEmail(email, async (err, myUser) => {
      console.log("Error", err);
      console.log("User", myUser);
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error con el registro del usuario",
          error: err,
        });
      }

      if (!myUser) {
        return res.status(401).json({
          //EL CLIENTE NO TIENE AUTORIZACION
          success: false,
          message: "El email no fue encontrado",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, myUser.password);

      if (isPasswordValid) {
        const token = jwt.sign(
          { id: myUser.id, email: myUser.email },
          keys.secretOrKey,
          {}
        );

        const data = {
          id: myUser.id,
          name: myUser.name,
          lastname: myUser.lastname,
          email: myUser.email,
          phone: myUser.phone,
          image: myUser.image,
          session_token: `JWT ${token}`,
          roles: JSON.parse(myUser.roles),
        };

        return res.status(201).json({
          success: true,
          message: "El usuario fue autenticado",
          data: data, //El ID del nuevo usuario
        });
      } else {
        return res.status(401).json({
          //EL CLIENTE NO TIENE AUTORIZACION
          success: false,
          message: "El email o password no es correcto !!",
        });
      }
    });
  },

  async register(req, res) {
    const user = req.body;
    User.create(user, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error con el registro del usuario",
          error: err,
        });
      }

      user.id = `${data}`;

      const token = jwt.sign(
        { id: user.id, email: user.email },
        keys.secretOrKey,
        {}
      );
      user.session_token = `JWT ${token}`;

      Rol.create(
        user.id,
        5, //
        (err,
        (data) => {
          if (err) {
            return res.status(501).json({
              success: false,
              message: "Hubo un error con el registro del rol del usuario",
              error: err,
            });
          }
          return res.status(201).json({
            success: true,
            message: "El registro se realizo correctamente",
            data: user, //El ID del nuevo usuario
          });
        })
      );
    });
  },

  async registerWithImage(req, res) {
    const user = JSON.parse(req.body.user);

    const files = req.files;

    if (files.length > 0) {
      const path = `image_${Date.now()}`;
      const url = await storage(files[0], path);
      if (url != undefined && url != null) {
        user.image = url;
      }
    }

    User.create(user, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error con el registro del usuario",
          error: err,
        });
      }

      user.id = `${data}`;

      const token = jwt.sign(
        { id: user.id, email: user.email },
        keys.secretOrKey,
        {}
      );
      user.session_token = `JWT ${token}`;

      Rol.create(
        user.id,
        3, //
        (err,
        (data) => {
          if (err) {
            return res.status(501).json({
              success: false,
              message: "Hubo un error con el registro del rol del usuario",
              error: err,
            });
          }
          return res.status(201).json({
            success: true,
            message: "El registro se realizo correctamente",
            data: user, //El ID del nuevo usuario
          });
        })
      );
    });
  },

  async updateWithImage(req, res) {
    const user = JSON.parse(req.body.user);

    const files = req.files;

    if (files.length > 0) {
      const path = `image_${Date.now()}`;
      const url = await storage(files[0], path);
      if (url != undefined && url != null) {
        user.image = url;
      }
    }

    User.update(user, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error con el registro del usuario",
          error: err,
        });
      }

      return res.status(201).json({
        success: true,
        message: "El usuario se actualizo correctamente",
        data: user, //El ID del nuevo usuario
      });
    });
  },

  async updateWithoutImage(req, res) {
    const user = req.body;

    User.updateWithoutImage(user, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error con el registro del usuario",
          error: err,
        });
      }

      return res.status(201).json({
        success: true,
        message: "El usuario se actualizo correctamente",
        data: user, //El ID del nuevo usuario
      });
    });
  },
};
